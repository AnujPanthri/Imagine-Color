from abc import ABC,abstractmethod

class ModelBaseClass(ABC):
    @abstractmethod
    def preprocess(self,names):
        pass

    @abstractmethod
    def predict(self,names):
        pass
    
    @staticmethod
    def colorToHex(colors):
        hex_list=[]
        for color in colors:
            hex_list.append("#{:02X}{:02X}{:02X}".format(color[0],color[1],color[2]))
        return hex_list