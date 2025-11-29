from app.models.backtester import backtest_pair


def run_backtest_from_params(params: dict):
    return backtest_pair(
        y_ticker=params["y_ticker"],
        x_ticker=params["x_ticker"],
        start=params.get("start_date"),
        end=params.get("end_date"),
        entry_z=params.get("entry_z", 2.0),
        exit_z=params.get("exit_z", 0.5),
        lookback=int(params.get("lookback", 60)),
        tc=float(params.get("tc", 0.0005)),
        method=params.get("method", "kalman")
    )