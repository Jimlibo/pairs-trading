from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.utils.runner_utils import run_backtest_from_params


router = APIRouter()


class BacktestRequest(BaseModel):
    y_ticker: str
    x_ticker: str
    start_date: str = "2015-01-01"
    end_date: Optional[str] = None
    entry_z: float = 2.0
    exit_z: float = 0.5
    lookback: int = 60
    tc: float = 0.0005
    method: str = "kalman"  # or 'ols'


class BacktestResponse(BaseModel):
    dates: List[str]
    cum_returns: List[float]
    sharpe: float
    ann_vol: float
    max_drawdown: float
    win_rate: float


@router.post("/backtest", response_model=BacktestResponse)
def backtest(req: BacktestRequest):
    try:
        res = run_backtest_from_params(req.dict())
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
