import { useState } from 'react'
import {BrowserRouter,Routes,Route} from  'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/header'
import Contact  from './pages/Contact'

function App() {
  

  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Signin />} />
    <Route path='/Sign-up' element={< SignUp/>} />
    <Route path='/Profile' element={<Profile />} />
    <Route path='/About' element={<About />} />
    <Route path='/Contact' element={<Contact />} />
  </Routes>
  </BrowserRouter>
}

export default App
