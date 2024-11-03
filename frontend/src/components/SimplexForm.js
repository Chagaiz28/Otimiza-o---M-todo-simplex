import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SimplexForm = () => {
  const [objectiveFunction, setObjectiveFunction] = useState('');
  const [constraints, setConstraints] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      objectiveFunction: objectiveFunction.split(',').map(Number),
      constraints: constraints.split('\n').map(row => row.split(',').map(Number)),
    };
    console.log('Sending data to backend:', data);
    fetch('http://localhost:5000/api/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data from backend:', data);
        navigate('/results', { state: data });
      });
  };

  const handleViewResults = () => {
    const exampleData = {
      solucao: [1.5, 2.5],
      valorOtimo: 10.5,
      precoSombra: [0, 0.5],
    };
    console.log('Navigating to results with example data:', exampleData);
    navigate('/results', { state: exampleData });
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
              label="Função Objetivo (separada por vírgulas)"
              variant="outlined"
              value={objectiveFunction}
              onChange={(e) => setObjectiveFunction(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Restrições (cada linha uma restrição, valores separados por vírgulas)"
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
        <Button variant="outlined" color="secondary" onClick={handleViewResults} sx={{ mt: 2 }}>
          Ver Resultados de Exemplo
        </Button>
      </Box>
    </Container>
  );
};

export default SimplexForm;