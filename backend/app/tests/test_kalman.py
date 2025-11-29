import pandas as pd
import numpy as np
from backend.app.models.kalman import KalmanFilterHedge


def test_kalman_beta_sanity():
    # initialize data, so that y = 1 + 0.5*x + noise
    dates = pd.date_range("2020-01-01", periods=100)
    x = pd.Series(np.linspace(1, 2, 100), index=dates)
    y = 1 + 0.5 * x + np.random.normal(0, 0.01, 100)

    # run kalman filter
    kf = KalmanFilterHedge()
    _, beta, _ = kf.fit(x, y)

    # check that beta is around 0.5
    assert len(beta) == 100
    assert abs(beta.mean() - 0.5) < 0.2