from fastapi import FastAPI
from app.api import v1
import logging
from app.core.logging import configure_logging

app = FastAPI(title="Pairs Trading Backtester")

configure_logging()
logger = logging.getLogger(__name__)

app.include_router(v1.router, prefix="/api/v1")
