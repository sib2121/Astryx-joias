
from flask import Flask, render_template

app = Flask(__name__)


# PÁGINA INICIAL
@app.route("/")
def inicio():
    return render_template("index.html")


# CADASTRO
@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")


# LOGIN
@app.route("/login")
def login():
    return render_template("login.html")


# PRODUTOS
@app.route("/produtos")
def produtos():
    return render_template("produtos.html")


# ESTOQUE
@app.route("/estoque")
def estoque():
    return render_template("estoque.html")


# CARRINHO
@app.route("/carrinho")
def carrinho():
    return render_template("carrinho.html")


# RESERVAS
@app.route("/reservas")
def reservas():
    return render_template("reservas.html")


# PEDIDOS
@app.route("/pedidos")
def pedidos():
    return render_template("pedidos.html")


# RASTREAMENTO
@app.route("/rastreamento")
def rastreamento():
    return render_template("rastreamento.html")


# INICIAR SERVIDOR
if __name__ == "__main__":
    app.run(debug=True)
