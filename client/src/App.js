import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DisciplinasPage from "./pages/DisciplinasPage";
import CadastrarProfessor from "./pages/CadastrarProfessor";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/disciplinas" element={<DisciplinasPage />} />
          <Route path="/cadastrar-professor" element={<CadastrarProfessor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
