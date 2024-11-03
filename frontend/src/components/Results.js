import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { solucao, valorOtimo, precoSombra } = location.state || {};

  console.log('Received data in Results:', { solucao, valorOtimo, precoSombra });

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resultados do Método Simplex
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Ponto Ótimo" secondary={solucao ? solucao.join(', ') : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lucro Ótimo" secondary={valorOtimo !== undefined ? valorOtimo : 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Preços Sombra" secondary={precoSombra ? precoSombra.join(', ') : 'N/A'} />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Results;