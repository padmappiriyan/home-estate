import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import Contact from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';
import './App.css'

function App() {
  return (
    <div className=''>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route key="home" path="/" element={<Home />} />
        <Route key="signin" path="/sign-in" element={<Signin />} />
        <Route key="signup" path="/sign-up" element={<SignUp />} />

        <Route  element={<PrivateRoute />}>
        <Route key="profile" path="/profile" element={<Profile />} />
        </Route>

        <Route key="about" path="/about" element={<About />} />
        <Route key="contact" path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
