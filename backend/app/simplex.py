import numpy as np

def simplex(funcao_Obj, restricoes, constantes):
    n_vars = len(funcao_Obj)
    n_cons = len(constantes)

    # Adiciona variáveis de folga às restrições
    restricoes = np.hstack([restricoes, np.eye(n_cons)])
    funcao_Obj = np.hstack([-np.array(funcao_Obj), np.zeros(n_cons)])  # Alterado para maximizacao

    # Garante que as constantes sejam uma matriz coluna
    constantes = np.array(constantes).reshape(-1, 1)  
    tableau = np.hstack([restricoes, constantes])  # Junta as restrições e constantes
    tableau = np.vstack([tableau, np.hstack([funcao_Obj, 0])])  # Adiciona a função objetivo

    print("Initial tableau:")
    print(tableau)

    while True:
        if np.all(tableau[-1, :-1] >= 0):
            break

        pivot_col = np.argmin(tableau[-1, :-1])
        ratios = tableau[:-1, -1] / tableau[:-1, pivot_col]
        ratios[ratios < 0] = np.inf
        pivot_row = np.argmin(ratios)

        print(f"Pivot column: {pivot_col}, Pivot row: {pivot_row}")

        pivot_val = tableau[pivot_row, pivot_col]
        tableau[pivot_row] /= pivot_val
        for i in range(tableau.shape[0]):
            if i != pivot_row:
                tableau[i] -= tableau[pivot_row] * tableau[i, pivot_col]

        print("Updated tableau:")
        print(tableau)

    # Cálculo da solução
    solucao = np.zeros(n_vars)
    for i in range(n_vars):
        col = tableau[:, i]
        if (col[:-1] == 1).sum() == 1 and (col[:-1] == 0).sum() == n_cons - 1:
            row = np.where(col[:-1] == 1)[0][0]
            solucao[i] = tableau[row, -1]

    precoSombra = tableau[-1, n_vars:-1]

    print("Solution:", solucao)
    print("Optimal value:", tableau[-1, -1])
    print("Shadow prices:", precoSombra)

    return solucao, tableau[-1, -1], precoSombra