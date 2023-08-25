import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import NewProject from './pages/NewProject';
import Projects from './pages/Projects'

import Container from './layout/Container';
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';
import Project from './pages/Project';


function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass="min-height">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
          <Route path='/project/:id' element={<Project />}></Route>
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
