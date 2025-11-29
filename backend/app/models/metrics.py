import numpy as np
import pandas as pd


def sharpe_ratio(returns: pd.Series, periods_per_year: int = 252) -> float:
    """
    Calculate the annualized Sharpe ratio of a return series.
    Args:
        returns (pd.Series): The return series.
        periods_per_year (int): Number of trading periods in a year.
    Returns:
        float: The annualized Sharpe ratio.
    """
    # clean returns from empty values and convert them to numpy array
    r = np.array(returns.dropna())

    # edge case: zero std
    if r.std() == 0:
        return 0.0
    
    # compute and return annualized sharpe ration
    return float((r.mean() * periods_per_year) / (r.std() * (periods_per_year ** 0.5)))


def annualized_vol(returns: pd.Series, periods_per_year: int = 252) -> float:
    """
    Calculate the annualized volatility of a return series.
    Args:
        returns (pd.Series): The return series.
        periods_per_year (int): Number of trading periods in a year.
    Returns:
        float: The annualized volatility.
    """
    # clean returns from empty values and convert them to numpy array
    r = np.array(returns.dropna())

    # compute and return annualized volatility
    return float(r.std() * (periods_per_year ** 0.5))


def max_drawdown(cum_returns: pd.Series) -> float:
    """
    Calculate the maximum drawdown from a cumulative returns series.
    Args:
        cum_returns (pd.Series): The cumulative returns series.
    Returns:
        float: The maximum drawdown.
    """
    # compute drawdowns
    cr = np.array(cum_returns)
    peak = np.maximum.accumulate(cr)
    dd = (cr - peak) / peak

    # return maximum drawdown (minimum value)
    return float(dd.min())


def win_rate(returns: pd.Series) -> float:
    """
    Calculate the win rate from a return series, where the win rate is defined as the proportion of positive returns 
    over the total number of returns.
    Args:
        returns (pd.Series): The return series.
    Returns:
        float: The win rate.
    """
    # clean returns from empty values and convert them to numpy array
    r = np.array(returns.dropna())

    # compute and return win rate
    return float((r > 0).sum() / max(len(r), 1))