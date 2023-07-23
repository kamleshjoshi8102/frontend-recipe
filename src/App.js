import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import { CreateRecipe } from './Pages/create-recipe'; 
import SavedRecipe from './Pages/SavedRecipe';
import { Navbar } from './Components/navbar.js';



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/create-recipe" element={<CreateRecipe/>} />
            <Route path="/saved-recipes" element={<SavedRecipe/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
