import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AnalysisResults = () => {
  const location = useLocation();
  const { novaSolucao, novoValorOtimo, variacoesRestricoes } = location.state;

  const isViable = novaSolucao.every(value => value >= 0);

  // Função para calcular a análise de sensibilidade
  const calcularAnaliseSensibilidade = () => {
    return variacoesRestricoes.map((variation, index) => {
      return `Coluna da restrição ${index + 1} * Δrestrição ${index + 1}: ${variation}`;
    }).join(', ');
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resultados da Análise de Viabilidade
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Nova Solução" secondary={novaSolucao ? novaSolucao.join(', ') : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Novo Valor Ótimo" secondary={novoValorOtimo !== undefined ? novoValorOtimo : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Viabilidade" secondary={isViable ? 'Viável' : 'Não Viável'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Análise de Sensibilidade" secondary={calcularAnaliseSensibilidade()} />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default AnalysisResults;
