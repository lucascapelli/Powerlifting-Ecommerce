from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "sua_chave_secreta"  # Troque por uma chave secreta real!
CORS(app)  # Permite requisições do navegador (resolve problema de CORS)
jwt = JWTManager(app)


# Lista simulada de produtos
produtos = [
    {
        "id": 1,
        "nome": "Cinto Powerlift",
        "preco": 120.00,
        "imagem": "http://localhost:5000/static/cinto.jpg"
    },
    {
        "id": 2,
        "nome": "Camisa Dry Fit",
        "preco": 80.00,
        "imagem": "http://localhost:5000/static/camisa.jpg"
    },
    {
        "id": 3,
        "nome": "Whey Protein 1kg",
        "preco": 150.00,
        "imagem": "http://localhost:5000/static/whey.jpg"
    }
]

@app.route("/produtos")
def listar_produtos():
    return jsonify(produtos)

if __name__ == "__main__":
    app.run(debug=True)

# Rota de Login
@app.route('/login', methods=['POST'])
def login():
    # Pegue os dados da requisição
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    # Validação de credenciais
    if username != "admin" or password != "senha123":  # Substitua com seu método de validação
        return jsonify({"msg": "Credenciais inválidas"}), 401
    
    # Criar um token JWT
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

# Exemplo de rota protegida
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="Este é um conteúdo protegido!")

