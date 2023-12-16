from DjangoWeb.ModelLoader import Colgen1



model_dir="models/colgen1/v1/"
model=Colgen1(model_dir)

out=model.predict(['Red','green','blue','yellow'])
print(out)