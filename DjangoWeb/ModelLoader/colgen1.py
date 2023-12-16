import tensorflow as tf
import numpy as np
import json
from .basemodel import ModelBaseClass

class Colgen1(ModelBaseClass):

    def __init__(self,model_dir):
        self.model=tf.keras.models.load_model(model_dir+"model.h5",compile=False)
        self.token_to_idx=json.load(open(model_dir+"token_to_idx.txt",'r'))
        self.TOKENS=list(self.token_to_idx.keys())

    
    def tokenize(self,name):
        """ tokenize single name """
        return [self.token_to_idx[char] for char in name]

    def one_hot_encode(self,tokens,num_classes):
        return tf.keras.utils.to_categorical(tokens,num_classes=num_classes)

    def add_padding(self,one_hot_vectors,num_classes,max_num_tokens):
        ''' one_hot_vectors:np.array shape:(tokens,len(all_tokens)) '''
        num_of_padding = max_num_tokens-len(one_hot_vectors)
        padding = []
        
        for _ in range(num_of_padding):
            padding.append(np.zeros([num_classes]))
        padding = np.array(padding)

        return np.r_[padding,one_hot_vectors] if len(padding)>0 else one_hot_vectors

    def preprocess(self,names:list[str]):
        """ names: [name,name,name,...] """
        
        max_num_tokens=0
        one_hots_list = []

        for name in names:
            name = name.lower() # convert to lowercase
            name = "".join([char if char.isalnum() else " " for char in name])  # remove special characters
            tokens = self.tokenize(name)
            one_hot_vectors = self.one_hot_encode(tokens,len(self.TOKENS))
            if len(tokens)>max_num_tokens:   max_num_tokens=len(tokens)
            one_hots_list.append(one_hot_vectors)
        
        for i in range(len(one_hots_list)):
            # we need to add padding so that all the examples have same number of tokens
            one_hots = one_hots_list[i]
            one_hots_list[i] = self.add_padding(one_hots,len(self.TOKENS),max_num_tokens)

        return np.array(one_hots_list)

    def predict(self,names: list):
        tokens = self.preprocess(names)
        colors = (self.model.predict(tokens,verbose=0)*255).astype("uint8")
        return colors
