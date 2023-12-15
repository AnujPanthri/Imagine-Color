from ModelLoader import Colgen1



model_dir="models/colgen1/"
model=Colgen1(model_dir)

out=model.predict(['Red','green','blue','yellow'])
print(out)