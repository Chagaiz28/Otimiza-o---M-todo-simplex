import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { solucao, valorOtimo, precoSombra, objectiveFunction, constraints, operators, constantes } = state;

  const handleAnalyzeClick = () => {
    navigate('/analyze', { state: { objectiveFunction, constraints, operators, constantes } });
  };

  if (!solucao || !valorOtimo || !precoSombra) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resultados
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Solução Ótima" secondary={solucao ? solucao.join(', ') : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Valor Ótimo" secondary={valorOtimo !== undefined ? valorOtimo : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Preços Sombra" secondary={precoSombra ? precoSombra.join(', ') : 'N/A'} />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" onClick={handleAnalyzeClick}>
          Analisar Viabilidade
        </Button>
      </Box>
    </Container>
  );
};

export default Results;