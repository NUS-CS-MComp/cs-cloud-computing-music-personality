from functools import wraps

from flask_restful import reqparse


def parse_params(*arguments):
    """
    From: https://github.com/antkahn/flask-api-starter-kit/blob/master/src/util/parse_params.py
    Parse the parameters and forward them to the wrapped function as named parameters
    """

    def parse(func):
        """ Wrapper """

        @wraps(func)
        def resource_verb(*args, **kwargs):
            """ Decorated function """
            parser = reqparse.RequestParser()
            for argument in arguments:
                parser.add_argument(argument)
            kwargs.update(parser.parse_args())
            return func(*args, **kwargs)

        return resource_verb

    return parse
