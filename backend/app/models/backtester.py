import pandas as pd
import numpy as np
from app.models.kalman import KalmanFilterHedge
from app.models.metrics import sharpe_ratio, annualized_vol, max_drawdown, win_rate
from app.utils.data_loading_utils import download_price_series


def compute_zscore(spread: pd.Series, window: int = 60) -> pd.Series:
    """
    Compute the z-score of the spread using a rolling window.
    Args:
        spread (pd.Series): The spread series.
        window (int): The rolling window size.
    Returns:
        pd.Series: The z-score series.
    """
    rm = spread.rolling(window).mean()
    rs = spread.rolling(window).std()
    z = (spread - rm) / rs

    return z


def generate_positions(z: pd.Series, entry: float = 2.0, exit: float = 0.5) -> pd.Series:
    """
    Generate trading positions based on z-score thresholds.
    Args:
        z (pd.Series): The z-score series.
        entry (float): The z-score threshold to enter a position.
        exit (float): The z-score threshold to exit a position.
    Returns:
        pd.Series: The position series (1 for long, -1 for short, 0 for flat).
    """
    # initialize positions
    pos = pd.Series(0, index=z.index)

    # generate signals based on z-score series
    current = 0
    for t in z.index:
        if current == 0:
            if z.loc[t] > entry:
                current = -1
            elif z.loc[t] < -entry:
                current = 1
        else:
            if abs(z.loc[t]) < exit:
                current = 0
        pos.loc[t] = current
    
    # forward fill positions, fill initial NaNs with 0 and return results
    return pos.ffill().fillna(0)


def backtest_pair(
        y_ticker: str, x_ticker: str, start: str, end: str, entry_z: float, exit_z: float, lookback: int, 
        tc: float, method="kalman"
) -> dict:
    """
    Backtest a pairs trading strategy between two tickers.
    Args:
        y_ticker (str): The ticker symbol for the dependent asset.
        x_ticker (str): The ticker symbol for the independent asset.
        start (str): Start date for backtest in 'YYYY-MM-DD' format.
        end (str): End date for backtest in 'YYYY-MM-DD' format.
        entry_z (float): Z-score threshold to enter a position.
        exit_z (float): Z-score threshold to exit a position.
        lookback (int): Lookback period for z-score calculation.
        tc (float): Transaction cost per trade as a fraction.
        method (str): Method for hedge ratio estimation ('kalman' or 'ols').
    Returns:
        dict: A dictionary containing backtest metrics and results.
    """
    # load price data for the given tickers
    prices = download_price_series([y_ticker, x_ticker], start=start, end=end)
    y = prices[y_ticker]
    x = prices[x_ticker]

    # estimate hedge ratio and spread based on the selected method
    if method == "kalman":
        kf = KalmanFilterHedge()
        _, beta, spread = kf.fit(x, y)
    else:
        # OLS
        beta_val = np.polyfit(x.values, y.values, 1)[0]
        beta = pd.Series(beta_val, index=x.index)
        spread = y - beta * x

    z = compute_zscore(spread, window=lookback)
    pos = generate_positions(z, entry=entry_z, exit=exit_z)

    ret_y = y.pct_change().fillna(0)
    ret_x = x.pct_change().fillna(0)
    strategy_ret = pos.shift(1) * ret_y - pos.shift(1) * (beta * ret_x)
    trades = pos.diff().abs().fillna(0)
    costs = trades * 2 * tc
    strategy_ret = strategy_ret - costs
    cum_ret = (1 + strategy_ret).cumprod().fillna(1)

    # compute performance metrics and store them in a dictionary
    metrics = {
        "dates": cum_ret.index.astype(str).tolist(),
        "cum_returns": cum_ret.tolist(),
        "sharpe": float(sharpe_ratio(strategy_ret)),
        "ann_vol": float(annualized_vol(strategy_ret)),
        "max_drawdown": float(max_drawdown(cum_ret)),
        "win_rate": float(win_rate(strategy_ret))
    }

    return metrics