import './App.css';
import Favourites from './Components/Favourites';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    // Routes for handling multiple routes
    // BrowerRoutes to wrap the router and routes for enabling the routing facility
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<><Banner name="puru" /><Movies /></>} />
          <Route path="/fav" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
