from flask import request, jsonify
from app import app
from app.simplex import simplex, analyze_variation

@app.route('/api/solve', methods=['POST'])
def solve():
    data = request.json
    objective_function = data['objectiveFunction']
    constraints = data['constraints']
    
    funcao_Obj = [float(x) for x in objective_function]
    restricoes = []
    constantes = []
    operadores = []

    for constraint in constraints:
        operador = constraint[-2]
        if operador == '<=' or operador == '<':
            restricoes.append([float(x) for x in constraint[:-2]])
            constantes.append(float(constraint[-1]))
            operadores.append(operador)
        elif operador == '>=' or operador == '>':
            restricoes.append([-float(x) for x in constraint[:-2]])
            constantes.append(-float(constraint[-1]))
            operadores.append('<=' if operador == '>=' else '<')

    # Call the simplex function
    solucao, valorOtimo, precoSombra = simplex(funcao_Obj, restricoes, constantes, operadores)

    # Ensure `solucao` and `precoSombra` are lists/arrays and convert if necessary
    return jsonify({
        'solucao': solucao.tolist() if hasattr(solucao, 'tolist') else solucao,
        'valorOtimo': valorOtimo,
        'precoSombra': precoSombra if isinstance(precoSombra, list) else precoSombra.tolist()
    })

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    objective_function = data['objectiveFunction']
    constraints = data['constraints']
    operadores = data['operators']
    constantes = data['constantes']
    variations = data['variations']
    
    funcao_Obj = [float(x) for x in objective_function]
    restricoes = [[float(x) for x in constraint] for constraint in constraints]
    constantes = [float(x) for x in constantes]

    nova_solucao, novo_valor_otimo = analyze_variation(funcao_Obj, restricoes, constantes, operadores, variations)

    return jsonify({
        'novaSolucao': nova_solucao.tolist(),
        'novoValorOtimo': novo_valor_otimo
    })