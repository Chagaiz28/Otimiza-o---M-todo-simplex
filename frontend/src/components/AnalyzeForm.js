import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './AnalyzeForm.css'; // Importe o arquivo CSS

const AnalyzeForm = () => {
  const location = useLocation();
  const { objectiveFunction, constraints, operators, constantes } = location.state || {};
  const [variations, setVariations] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!objectiveFunction || !constraints || !operators || !constantes) {
      navigate('/results'); // Redireciona de volta para os resultados se os dados não estiverem disponíveis
    }
  }, [objectiveFunction, constraints, operators, constantes, navigate]);

  const handleVariationChange = (index, value) => {
    setVariations({ ...variations, [index]: parseFloat(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      objectiveFunction,
      constraints,
      operators,
      constantes,
      variations,
    };
    console.log('Sending data to backend for analysis:', data);
    fetch('http://127.0.0.1:5000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Received analysis from backend:', data);
        navigate('/analysis-results', { state: data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  if (!constraints || !objectiveFunction || !operators || !constantes) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Análise de Viabilidade
        </Typography>
        <form onSubmit={handleSubmit} className="form-container">
          <Box className="form-section">
            <Typography variant="h6">Variações das Restrições</Typography>
            {constraints && constraints.length > 0 ? (
              constraints.map((constraint, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Variação da Restrição ${index + 1}`}
                  variant="outlined"
                  value={variations[index] || ''}
                  onChange={(e) => handleVariationChange(index, e.target.value)}
                  className="form-control"
                />
              ))
            ) : (
              <Typography variant="body1">Nenhuma restrição disponível</Typography>
            )}
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Analisar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AnalyzeForm;