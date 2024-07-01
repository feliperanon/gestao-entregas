# C:\Projeto\gestao-entregas\ml_model\train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
import pickle
import requests

# Obter dados do backend
response = requests.get('http://localhost:5000/entregas/dados-treinamento')
data = response.json()

# Criar um DataFrame
df = pd.DataFrame(data)

# Selecionar features e target
features = ['volume', 'tempoEstimado']
target = 'tempoDecorrido'

X = df[features]
y = df[target]

# Dividir os dados em treinamento e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Treinar o modelo
model = LinearRegression()
model.fit(X_train, y_train)

# Avaliar o modelo
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)

print(f'MAE: {mae}')
print(f'MSE: {mse}')

# Salvar o modelo
with open('modelo_entrega.pkl', 'wb') as file:
    pickle.dump(model, file)
