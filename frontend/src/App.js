import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SetupForm from './components/SetupForm';
import SimplexForm from './components/SimplexForm';
import Results from './components/Results';
import AnalyzeForm from './components/AnalyzeForm';
import AnalysisResults from './components/AnalysisResults';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetupForm />} />
        <Route path="/simplex-form" element={<SimplexForm />} />
        <Route path="/results" element={<Results />} />
        <Route path="/analyze" element={<AnalyzeForm />} />
        <Route path="/analysis-results" element={<AnalysisResults />} />
      </Routes>
    </Router>
  );
};

export default App;