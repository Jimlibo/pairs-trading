from app.models.backtester import backtest_pair


def test_backtest_api_smoke():
    """
    Smoke test for backtest_pair function.  
    Checks that the function runs and returns expected keys.
    """
    res = backtest_pair("PEP","KO","2019-01-01","2019-12-31",2.0,0.5,20,0.0005)
    assert "sharpe" in res
    assert "cum_returns" in res