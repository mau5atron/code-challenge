from json import JSONEncoder
import pytest
from collections import OrderedDict
import usaddress
from django.http import JsonResponse

@pytest.fixture(scope="session")
def http_listen_address():
    return ("localhost", 8000)

def test_api_parse_succeeds(client):
    # TODO: Finish this test. Send a request to the API and confirm that the
    # data comes back in the appropriate format.
    address_string = '123 main st chicago il'
    address_components, address_type = usaddress.tag(address_string)
    expected_server_response = JsonResponse({"address_components":address_components, "address_type":address_type})
    endpoint = "/api/parse"
    pytest.fail()


def test_api_parse_raises_error(client):
    # TODO: Finish this test. The address_string below will raise a
    # RepeatedLabelError, so ParseAddress.parse() will not be able to parse it.
    address_string = '123 main st chicago il 123 main st'
    pytest.fail()
