import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProfessionalProfile from './components/ProfessionalProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold text-center text-blue-600">Profissa</h1>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/professional/:id" element={<ProfessionalProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;