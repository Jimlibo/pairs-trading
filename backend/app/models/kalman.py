import numpy as np
import pandas as pd


class KalmanFilterHedge:
    def __init__(self, delta: float = 1e-5, R: float = 1e-3):
        """
        Kalman Filter for estimating hedge ratios in pairs trading.
        Args:
            delta (float): Process noise covariance.
            R (float): Measurement noise covariance.
        """
        self.delta = delta
        self.R = R

    def fit(self, x: pd.Series, y: pd.Series) -> tuple[pd.Series, pd.Series, pd.Series]:
        n = len(x)
        F = np.vstack([np.ones(n), x.values]).T  # observation matrix
        m = np.zeros(2)
        C = np.eye(2) * 1e-5

        # initialize alpha (intercept), beta and spread arrays
        intercept = np.zeros(n)
        beta = np.zeros(n)
        spread = np.zeros(n)

        for t in range(n):
            # prediction covariance
            C = C + self.delta * np.eye(2)
            # observe
            ft = F[t]
            y_pred = ft @ m
            e = y.values[t] - y_pred
            S = ft @ C @ ft.T + self.R
            K = (C @ ft) / S
            m = m + K * e
            C = C - np.outer(K, ft) @ C
            intercept[t] = m[0]
            beta[t] = m[1]
            spread[t] = e
        
        # return alpha, beta and spread as pandas Series
        return pd.Series(intercept, index=x.index), pd.Series(beta, index=x.index), pd.Series(spread, index=x.index)