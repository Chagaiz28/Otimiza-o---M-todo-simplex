import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SetupForm = () => {
  const [numVariables, setNumVariables] = useState('');
  const [numConstraints, setNumConstraints] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/simplex-form', { state: { numVariables: parseInt(numVariables), numConstraints: parseInt(numConstraints) } });
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configuração Inicial
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Número de Variáveis de Decisão"
              variant="outlined"
              value={numVariables}
              onChange={(e) => setNumVariables(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Número de Restrições"
              variant="outlined"
              value={numConstraints}
              onChange={(e) => setNumConstraints(e.target.value)}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Continuar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SetupForm;