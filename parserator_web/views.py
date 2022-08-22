from logging import exception
import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError
from django.http import JsonResponse
from collections import OrderedDict    

class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # TODO: Flesh out this method to parse an address string using the
        # parse() method and return the parsed components to the frontend.
        if request.method == 'GET':
            input_string = request.GET.get('input_string')
            print("string length: ")
            print(len(input_string))
            try:
                address_components, address_type = self.parse(address=input_string)
                if not input_string:
                    raise ValueError("empty_input")
            except usaddress.RepeatedLabelError:
                return JsonResponse({"error": "Error handling input string"})
            except ValueError:
                return JsonResponse({"error": "Input cannot be empty"})
            return JsonResponse({"address_components":address_components, "address_type":address_type})

    def parse(self, address):
        # TODO: Implement this method to return the parsed components of a
        # given address using usaddress: https://github.com/datamade/usaddress
        return usaddress.tag(address)
