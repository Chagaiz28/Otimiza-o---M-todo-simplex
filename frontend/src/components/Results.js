import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { optimalSolution, optimalValue, shadowPrices } = location.state || {};

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resultados do Método Simplex
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Ponto Ótimo" secondary={optimalSolution ? optimalSolution.join(', ') : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lucro Obtido" secondary={optimalValue !== undefined ? optimalValue : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Preços Sombra" secondary={shadowPrices ? shadowPrices.join(', ') : 'N/A'} />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Results;