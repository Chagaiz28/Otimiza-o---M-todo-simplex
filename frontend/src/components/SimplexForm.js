import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './SimplexForm.css'; // Importe o arquivo CSS

const SimplexForm = () => {
  const location = useLocation();
  const { numVariables, numConstraints } = location.state;
  const [objectiveFunction, setObjectiveFunction] = useState(Array(numVariables).fill(''));
  const [constraints, setConstraints] = useState(Array.from({ length: numConstraints }, () => Array(numVariables + 1).fill('')));
  const [operators, setOperators] = useState(Array(numConstraints).fill('<='));
  const navigate = useNavigate();

  const handleObjectiveChange = (index, value) => {
    const newObjectiveFunction = [...objectiveFunction];
    newObjectiveFunction[index] = value;
    setObjectiveFunction(newObjectiveFunction);
  };

  const handleConstraintChange = (constraintIndex, variableIndex, value) => {
    const newConstraints = constraints.map((constraint, index) => {
      if (index === constraintIndex) {
        const newConstraint = [...constraint];
        newConstraint[variableIndex] = value;
        return newConstraint;
      }
      return constraint;
    });
    setConstraints(newConstraints);
  };

  const handleOperatorChange = (index, value) => {
    const newOperators = [...operators];
    newOperators[index] = value;
    setOperators(newOperators);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      objectiveFunction: objectiveFunction.map(Number),
      constraints: constraints.map((row, index) => [...row.slice(0, -1).map(Number), operators[index], Number(row[row.length - 1])]),
    };
    console.log('Sending data to backend:', data);
    fetch('http://127.0.0.1:5000/api/solve', {
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculadora do Método Simplex
        </Typography>
        <form onSubmit={handleSubmit} className="form-container">
          <Box className="form-section">
            <Typography variant="h6">Função Objetivo</Typography>
            {objectiveFunction.map((value, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Coeficiente ${index + 1}`}
                variant="outlined"
                value={value}
                onChange={(e) => handleObjectiveChange(index, e.target.value)}
                className="form-control"
              />
            ))}
          </Box>
          <Box className="form-section">
            <Typography variant="h6">Restrições</Typography>
            {constraints.map((constraint, constraintIndex) => (
              <Box key={constraintIndex} className="form-section">
                {constraint.slice(0, -1).map((value, variableIndex) => (
                  <TextField
                    key={variableIndex}
                    fullWidth
                    label={`Coeficiente ${variableIndex + 1}`}
                    variant="outlined"
                    value={value}
                    onChange={(e) => handleConstraintChange(constraintIndex, variableIndex, e.target.value)}
                    className="form-control"
                  />
                ))}
                <FormControl fullWidth variant="outlined" className="form-control">
                  <InputLabel>Operador</InputLabel>
                  <Select
                    value={operators[constraintIndex]}
                    onChange={(e) => handleOperatorChange(constraintIndex, e.target.value)}
                    label="Operador"
                  >
                    <MenuItem value="<=">&le;</MenuItem>
                    <MenuItem value=">=">&ge;</MenuItem>
                    <MenuItem value="<">&lt;</MenuItem>
                    <MenuItem value=">">&gt;</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Constante"
                  variant="outlined"
                  value={constraint[constraint.length - 1]}
                  onChange={(e) => handleConstraintChange(constraintIndex, constraint.length - 1, e.target.value)}
                  className="form-control"
                />
              </Box>
            ))}
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