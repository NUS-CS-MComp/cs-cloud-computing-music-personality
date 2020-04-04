import requests
from urllib.parse import urljoin

from utils import construct_user_agent


class BaseService:
    """
    Base third-party service wrapper class with basic request functionalities

    :return: Base service class object
    :rtype: BaseService
    """

    def __init__(self, service_name, base_url, use_session=False):
        """
        Initialize a base service wrapper class

        :param service_name: Alias for the service
        :type service_name: str
        :param base_url: API base URL
        :type base_url: str
        :param use_session: Flag to use session or not, defaults to False
        :type use_session: bool, optional
        """
        self._service_name = service_name
        self._base_url = base_url
        self._requestor = requests
        self._use_session = use_session
        self.open_session()

    def request(self, method, route, parse_json, **kwargs):
        """
        Request method wrapper using requests module

        :param method: HTTP method name
        :type method: str
        :param route: Route name to be combined with base URL
        :type route: str
        :param parse_json: Flag to parse response data as JSON format
        :type parse_json: bool
        :return: Base service result class object
        :rtype: BaseServiceResult
        """
        url = self.construct_url(route)
        response = self._requestor.request(method=method, url=url, **kwargs)
        response_data = None
        status_code = response.status_code
        if parse_json:
            response_data = response.json()
        else:
            response_data = response.text
        self.close_session()
        return BaseServiceResult(status_code, response_data)

    def open_session(self):
        """
        Open a new session for the request wrapper

        :return: Requests session class or requests module
        :rtype: Session/module
        """
        if self._use_session:
            self._requestor = requests.session()
            self._requestor.headers.update(construct_user_agent())
        return self._requestor

    def close_session(self):
        """
        Close an existing session

        :return: Requests session class
        :rtype: Session/module
        """
        if self._use_session:
            self._requestor.close()
            self._requestor = self.open_session()
        return self._requestor

    """
    Basic HTTP method implementations
    """

    def get(self, route, parse_json=True, **kwargs):
        return self.request("GET", route, parse_json, **kwargs)

    def post(self, route, parse_json=True, **kwargs):
        return self.request("POST", route, parse_json, **kwargs)

    def put(self, route, parse_json=True, **kwargs):
        return self.request("PUT", route, parse_json, **kwargs)

    def delete(self, route, parse_json=True, **kwargs):
        return self.request("DELETE", route, parse_json, **kwargs)

    def construct_url(self, route, *args):
        """
        Helper function to iteratively parse route information and construct new URL string

        :param route: Route to be joined
        :type route: str
        :return: New URL string
        :rtype: str
        """
        base_url = self._base_url + ("/" if self._base_url[-1] != "/" else "")
        result = urljoin(base_url, route)
        if len(args) > 0:
            for index, arg in enumerate(args):
                if type(arg) == str:
                    result = urljoin(
                        result,
                        arg
                        + ("" if args[-1] == "/" or index == len(args) - 1 else "/"),
                    )
        return result

    def get_user_profile(self):
        raise NotImplementedError(
            f"get_user_profile method not implemented in service class {self.service_name}."
        )

    @property
    def base_url(self):
        return self._base_url

    @property
    def requestor(self):
        return self._requestor

    @property
    def service_name(self):
        return self._service_name


class BaseServiceResult:
    """
    Response result wrapper returned by BaseService class

    :return: Base service result class
    :rtype: BaseServiceResult
    """

    def __init__(self, status_code, data):
        """
        Initialize a base service response result

        :param status_code: HTTP status code to be displayed
        :type status_code: int
        :param data: Data to be embedded into the result
        :type data: any
        """
        self._status_Code = status_code
        self._data = data

    @property
    def data(self):
        if type(self._data) == dict:
            return self._data.copy()
        return self._data

    @data.setter
    def data(self, data):
        self._data = data

    @property
    def status_code(self):
        return self._status_Code

    @status_code.setter
    def status_code(self, status_code):
        self._status_Code = status_code

    def __repr__(self):
        return str((self.data, self.status_code))
