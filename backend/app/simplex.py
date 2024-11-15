import numpy as np

def simplex(funcao_Obj, restricoes, constantes, operadores):
    num_vars = len(funcao_Obj)
    num_restricoes = len(restricoes)
    
    # Preparar o tableau inicial
    tableau = np.zeros((num_restricoes + 1, num_vars + num_restricoes + 1))

    # Inserir função objetivo (negativo para maximização)
    tableau[0, :num_vars] = -np.array(funcao_Obj)

    # Inserir restrições
    for i in range(num_restricoes):
        if operadores[i] == '<=' or operadores[i] == '<':
            tableau[i + 1, :num_vars] = restricoes[i]
            tableau[i + 1, -1] = constantes[i]
            tableau[i + 1, num_vars + i] = 1  # Variável de folga
        elif operadores[i] == '>=' or operadores[i] == '>':
            tableau[i + 1, :num_vars] = [-x for x in restricoes[i]]
            tableau[i + 1, -1] = -constantes[i]
            tableau[i + 1, num_vars + i] = 1  # Variável de folga

    # Algoritmo Simplex usando o Tableau
    while np.min(tableau[0, :-1]) < 0:
        # Encontrar a coluna pivô (menor valor negativo na linha da função objetivo)
        pivot_col = np.argmin(tableau[0, :-1])
        
        # Encontrar a linha pivô (razão mínima positiva)
        ratios = []
        for i in range(1, len(tableau)):
            if tableau[i, pivot_col] > 0:
                ratios.append(tableau[i, -1] / tableau[i, pivot_col])
            else:
                ratios.append(np.inf)
        
        pivot_row = np.argmin(ratios) + 1

        # Realizar a divisão da linha pivô pelo elemento pivô
        pivot_val = tableau[pivot_row, pivot_col]
        tableau[pivot_row, :] /= pivot_val

        # Ajustar as outras linhas (Eliminação de Gauss)
        for i in range(len(tableau)):
            if i != pivot_row:
                tableau[i, :] -= tableau[i, pivot_col] * tableau[pivot_row, :]

    # Extrair a solução ótima
    solucao = np.zeros(num_vars)
    for i in range(num_vars):
        coluna = tableau[1:, i]
        if np.count_nonzero(coluna) == 1 and np.sum(coluna) == 1:
            row = np.where(coluna == 1)[0][0]
            solucao[i] = tableau[row + 1, -1]

    valorOtimo = tableau[0, -1]

    # Calculando preços sombra (valores da linha Z dos coeficientes das variáveis de folga)
    precoSombra = tableau[0, num_vars:num_vars + num_restricoes]

    return solucao, valorOtimo, list(precoSombra)


# Função de análise de variações
def analyze_variation(funcao_Obj, restricoes, constantes, operadores, variations):
    num_vars = len(funcao_Obj)
    num_restricoes = len(restricoes)
    
    lhs_ineq = []
    rhs_ineq = []

    for i, restricao in enumerate(restricoes):
        if operadores[i] == '<=' or operadores[i] == '<':
            lhs_ineq.append(restricao)
            rhs_ineq.append(constantes[i] + variations.get(str(i), 0))
        elif operadores[i] == '>=' or operadores[i] == '>':
            lhs_ineq.append([-x for x in restricao])
            rhs_ineq.append(-constantes[i] - variations.get(str(i), 0))

    # Preparar o tableau inicial
    tableau = np.zeros((num_restricoes + 1, num_vars + num_restricoes + 1))
    tableau[0, :num_vars] = -np.array(funcao_Obj)

    # Inserir restrições atualizadas
    for i in range(num_restricoes):
        tableau[i + 1, :num_vars] = lhs_ineq[i]
        tableau[i + 1, -1] = rhs_ineq[i]
        tableau[i + 1, num_vars + i] = 1

    while np.min(tableau[0, :-1]) < 0:
        pivot_col = np.argmin(tableau[0, :-1])
        
        ratios = []
        for i in range(1, len(tableau)):
            if tableau[i, pivot_col] > 0:
                ratios.append(tableau[i, -1] / tableau[i, pivot_col])
            else:
                ratios.append(np.inf)
        
        pivot_row = np.argmin(ratios) + 1
        pivot_val = tableau[pivot_row, pivot_col]
        tableau[pivot_row, :] /= pivot_val

        for i in range(len(tableau)):
            if i != pivot_row:
                tableau[i, :] -= tableau[i, pivot_col] * tableau[pivot_row, :]

    nova_solucao = np.zeros(num_vars)
    for i in range(num_vars):
        coluna = tableau[1:, i]
        if np.count_nonzero(coluna) == 1 and np.sum(coluna) == 1:
            row = np.where(coluna == 1)[0][0]
            nova_solucao[i] = tableau[row + 1, -1]

    novo_valor_otimo = tableau[0, -1] * -1

    return nova_solucao, novo_valor_otimo