import yfinance as yf
import pandas as pd


def download_price_series(ticker_list: list[str], start: str = "2015-01-01", end: str | None = None) -> pd.DataFrame:
    """
    Download adjusted close price series for a list of tickers from Yahoo Finance.

    Args:
        ticker_list (list[str]): List of ticker symbols.
        start (str): Start date in 'YYYY-MM-DD' format.
        end (str | None): End date in 'YYYY-MM-DD' format. If None, defaults to current date.   
    Returns:
        pd.DataFrame: DataFrame containing adjusted close prices with dates as index and tickers as columns.
    """
    # download data
    df = yf.download(ticker_list, start=start, end=end, progress=False)['Adj Close']

    # convert them to DataFrame if a single ticker was provided
    if isinstance(df, pd.Series):
        df = df.to_frame()

    # clean data
    df = df.sort_index().ffill().dropna()

    return df