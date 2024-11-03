from flask import request, jsonify
from app import app
from app.simplex import simplex

@app.route('/api/solve', methods=['POST'])
def solve():
    data = request.json
    objective_function = data['objectiveFunction']
    constraints = data['constraints']
    funcao_Obj = objective_function
    restricoes = [constraint[:-1] for constraint in constraints]
    constantes = [constraint[-1] for constraint in constraints]

    solucao, valorOtimo, precoSombra = simplex(funcao_Obj, restricoes, constantes)

    return jsonify({
        'solucao': solucao.tolist(),
        'valorOtimo': valorOtimo,
        'precoSombra': precoSombra.tolist()
    })