from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ModelLoader import Colgen1

model_dir="models/colgen1/v2/"
model=Colgen1(model_dir)

# Create your views here.
@csrf_exempt
def generate(request):
    if request.method=='GET':
        return HttpResponse("GET method not allowed")
    elif request.method=='POST':
        received_data = json.loads(request.body.decode("utf-8"))
        print(received_data)
        
        out=model.colorToHex(model.predict(received_data['color_names']))
        print(out)

        data={
            "color_names":received_data["color_names"],
            "colors":out
        }
        return HttpResponse(json.dumps(data))
