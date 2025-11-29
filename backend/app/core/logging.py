import logging


def configure_logging():
    """
    Configures basic logging settings.
    """
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
