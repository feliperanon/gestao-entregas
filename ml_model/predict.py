# C:\Projeto\gestao-entregas\ml_model\predict.py
import sys
import pickle
import pandas as pd

# Carregar o modelo treinado
with open('modelo_entrega.pkl', 'rb') as file:
    model = pickle.load(file)

# Ler os argumentos de linha de comando
volume = float(sys.argv[1])
tempo_estimado = float(sys.argv[2])

# Fazer a predição
prediction = model.predict([[volume, tempo_estimado]])

# Printar a predição
print(prediction[0])
