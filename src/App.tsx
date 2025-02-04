import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/cadastroAluno/SignUp';
import Login from './components/LoginAluno/Login';
import VerifyNumber from './components/VerifyNumber/VerifyNumber';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/verify-number" element={<VerifyNumber />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;