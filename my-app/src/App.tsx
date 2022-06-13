import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Description from './components/Description';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
 
  return (

    <div>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/description" element={<Description/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
