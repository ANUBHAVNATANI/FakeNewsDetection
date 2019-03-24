import pandas as pd
import sklearn
import re
import nltk
import numpy as np
import string

class data_function:
    def z_normalize(self,data):
        scaler = sklearn.preprocessing.StandardScaler()
        scaler.fit(data)
        return scaler.transform(data)

    #Feature engg for the text values
    #a function to implement feature engg in the pandas data frame
    def feature_engg(self,data,func,norm=True):
        data_t = data.copy(deep = True)
        data_t = data_t.apply(func)
        if norm:
            data_t = pd.Series(z_normalize(data_t.values.reshape(-1,1)).reshape(-1,))
        data_t.featureName = func.__name__
        return data_t
    
    #for multiple features
    def features_engg(self,data,funclist,norm=True):
        data_ts = pd.DataFrame()
        for func in funclist:
            data_t = feature_engg(data,func,norm)
            data_ts[data_t.featureName] = data_t
        return data_ts

    #to cleantext data
    def asterix_freq(x):
        return x.count('!')/len(x)

    def uppercase_freq(x):
        return len(re.findall(r'[A-Z]',x)/len(x))

    def tokenize(x):
        re_tok = re.compile(f'([{string.punctuation}“”¨«»®´·º½¾¿¡§£₤‘’])')
        return re_tok.sub(r' \1 ', x).split()
    
    def Vectorize(typeV='Tfidf',strip_accents=None,tokenizer=None,analyzer='word',stop_words=None,ngram_range=(1, 1),max_df=1.0, min_df=1, max_features=None):
        if typeV='Tfidf':
            vectorizer = sklearn.feature_extraction.text.TfidfVectorizer(ngram_range=ngram_range, tokenizer=tokenizer,min_df=min_df, max_df=max_df,max_features=max_features,analyzer=analyzer,stop_words=stop_words,strip_accents=strip_accents)
        if typeV='Count':
            vectorizer = sklearn.feature_extraction.text.CountVectorizer(ngram_range=ngram_range, tokenizer=tokenizer,min_df=min_df, max_df=max_df,max_features=max_features,analyzer=analyzer,stop_words=stop_words,strip_accents=strip_accents)
        return vectorizer
    
    def 
