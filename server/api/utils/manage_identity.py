from functools import wraps

from flask import session
from utils.check_status_code import is_ok, is_client_error


class IdentityManager:
    cookie_key_formatter = "{}.oauth2.token"

    @staticmethod
    def format_cookie_key_from_service(service):
        """
        Helper function to format cookie name from provided service

        :param service: Service provider extended from base service class
        :type service: BaseService
        :return: Cookie key name
        :rtype: str
        """
        service_name = service.service_name
        return IdentityManager.cookie_key_formatter.format(service_name)

    @staticmethod
    def read_cookie(service, param_list):
        """
        Decorator to read cookie information given service provider information and parse it to kwargs to be consumed by function

        :param service: Service provider extended from base service class
        :type service: BaseService
        :return: Function wrapper
        :rtype: func
        """
        pass

        def read_cookie_wrapper(func):
            """ Wrapper """

            @wraps(func)
            def parse_cookie(*args, **kwargs):
                """ Decorated function """
                key = IdentityManager.format_cookie_key_from_service(service)
                session_cookies = session.get(key)

                if session_cookies is None:
                    return {"message": "Unauthorized request."}, 401

                if len(param_list) > 0:
                    session_cookie_keys = session_cookies.keys()
                    for param_name in param_list:
                        if param_name not in session_cookie_keys:
                            return (
                                {
                                    "message": {
                                        param_name: "Missing required parameter in the cookies"
                                    }
                                },
                                400,
                            )
                        kwargs.update({param_name: session_cookies[param_name]})

                return func(*args, **kwargs)

            return parse_cookie

        return read_cookie_wrapper

    @staticmethod
    def read_cookies(services, param_map, kwarg_name="cookies"):
        """
        Read cookies from multiple service providers based on their token information

        :param services: List of service provider extended from base service class
        :type services: list
        :param param_map: Dictionary containing service as the key and token information as the value
        :type param_map: dict
        :param kwarg_name: Parameter name to be passed to the wrapped function, defaults to 'cookies'
        :type kwarg_name: str, optional
        :return: Function wrapper
        :rtype: func
        """

        def read_cookie_wrapper(func):
            """ Wrapper """

            @wraps(func)
            def parse_cookie(*args, **kwargs):
                """ Decorated function """
                cookie_map = {}

                for service in services:
                    key = IdentityManager.format_cookie_key_from_service(service)
                    session_cookies = session.get(key)

                    service_name = service.service_name

                    if session_cookies is not None:
                        cookie_map[service_name] = {}

                        if service not in param_map.keys():
                            cookie_map[service_name].update(session_cookies)
                            continue
                        param_list = param_map[service]
                        for param_name in param_list:
                            if param_name not in session_cookies.keys():
                                raise KeyError(
                                    f"{param_name} not in session cookies ${key}."
                                )
                            cookie_map[service_name].update(
                                {param_name: session_cookies[param_name]}
                            )

                kwargs.update({kwarg_name: cookie_map})
                return func(*args, **kwargs)

            return parse_cookie

        return read_cookie_wrapper

    @staticmethod
    def set_cookie(service):
        """
        Decorator to set cookies on response header given service provider details

        :param service: Service provider extended from base service class
        :type service: BaseService
        :return: Function wrapper
        :rtype: func
        """

        def set_cookie_wrapper(func):
            """ Wrapper """

            @wraps(func)
            def set_response_header(*args, **kwargs):
                """ Decorated function """

                response_data, status_code = func(*args, **kwargs)
                key = IdentityManager.format_cookie_key_from_service(service)
                session[key] = response_data
                if is_ok(status_code):
                    return "Done", status_code
                elif is_client_error(status_code):
                    return response_data, status_code

            return set_response_header

        return set_cookie_wrapper
