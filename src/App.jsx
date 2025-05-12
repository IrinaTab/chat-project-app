import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Chat from './Components/Chat/Chat';
import ScrollToTop from './Utils/ScrollToTop'



function App() {
  return (
    <div className="App center">
        <Router>

          <ScrollToTop />

          <Navbar />
          <h1>IRUSICHKA HELLO</h1>


            <Routes>
              
              <Route path="/chat-project-app" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/Сhat" element={<Chat />} />


            </Routes>

        </Router>

    </div>
  )
}

export default App
