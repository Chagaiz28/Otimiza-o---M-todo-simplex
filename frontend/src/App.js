import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimplexForm from './components/SimplexForm';
import Results from './components/Results';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<SimplexForm />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App