import pandas as pd
import numpy as np
from backend.app.models.backtester import backtest_pair


def _make_prices(tickers, start, end):
    """Create deterministic synthetic price series for given tickers and date range.
    Uses a fixed random seed so tests are reproducible.
    """
    idx = pd.date_range(start=start, end=end, freq="B")
    rng = np.random.RandomState(42)
    data = {}
    for t in tickers:
        # small positive drift with daily volatility
        returns = rng.normal(loc=0.0002, scale=0.01, size=len(idx))
        price = 100 * (1 + pd.Series(returns, index=idx)).cumprod()
        data[t] = price
    return pd.DataFrame(data, index=idx)


def test_backtest_api_smoke(monkeypatch):
    """Smoke test for `backtest_pair` that mocks price download and asserts
    expected output keys and some numeric sanity checks.
    """

    def _fake_download_price_series(tickers, start, end):
        return _make_prices(tickers, start, end)

    # patch the data loader used by the backtester
    monkeypatch.setattr(
        "backend.app.utils.data_loading_utils.download_price_series",
        _fake_download_price_series,
    )

    res = backtest_pair("PEP", "KO", "2019-01-01", "2019-12-31", 2.0, 0.5, 20, 0.0005)

    # basic structure
    assert isinstance(res, dict)
    for key in ("sharpe", "cum_returns", "dates", "ann_vol", "max_drawdown", "win_rate"):
        assert key in res

    # lengths line up
    assert len(res["dates"]) == len(res["cum_returns"]) and len(res["dates"]) > 0

    # numeric sanity
    assert isinstance(res["sharpe"], float)
    assert isinstance(res["ann_vol"], float)
    assert isinstance(res["max_drawdown"], float)