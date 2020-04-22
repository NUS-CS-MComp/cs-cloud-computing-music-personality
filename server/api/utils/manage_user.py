from functools import wraps

from flask import session

SIGNED_IN_AS_FLAG = "is_signed_in"


class UserManager:
    @staticmethod
    def parse_user_session(func):
        """
        Helper function decorator to parse user information from session data

        :param func: Function object to be wrapped
        :type func: func
        :return: Function wrapper
        :rtype: func
        """

        @wraps(func)
        def read_user_info(*args, **kwargs):
            """ Decorated function """

            user_id = session.get(SIGNED_IN_AS_FLAG)
            if user_id is None:
                return "No identifier provided.", 403
            kwargs.update({"user_id": user_id})
            return func(*args, **kwargs)

        return read_user_info
