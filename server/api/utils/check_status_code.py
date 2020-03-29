def is_ok(status_code):
    """
    Determine whether status code indicates ok status

    :param status_code: Response code
    :type status_code: int
    """
    if 200 <= status_code < 300:
        return True
    return False


def is_client_error(status_code):
    """
    Determine whether status code indicates client error

    :param status_code: Response code
    :type status_code: int
    """
    if 400 <= status_code < 500:
        return True
    return False


def is_server_error(status_code):
    """
    Determine whether status code indicates server error

    :param status_code: Response code
    :type status_code: int
    """
    if 500 <= status_code < 600:
        return True
    return False
