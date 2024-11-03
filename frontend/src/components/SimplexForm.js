import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SimplexForm = () => {
  const [objectiveFunction, setObjectiveFunction] = useState('');
  const [constraints, setConstraints] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        objectiveFunction,
        constraints,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/results', { state: data });
      });
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculadora do Método Simplex
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Função Objetivo"
              variant="outlined"
              value={objectiveFunction}
              onChange={(e) => setObjectiveFunction(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Restrições"
              variant="outlined"
              multiline
              rows={4}
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Calcular
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SimplexForm;