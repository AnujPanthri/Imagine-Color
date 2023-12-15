from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    # return HttpResponse("heyyy")
    return render(request,"main/index.html",context={})