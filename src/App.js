import './App.css';
import About from './component/About';
import React, { useState } from 'react'
import Home from './component/Home';
import Navbar from './component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/noteState';
import Notes from './component/Notes';
import Alert from './component/Alert';
import AddNote from './component/AddNote';
import SignUp from './component/SignUp';
import LogIn from './component/LogIn';

function App() {
  const [myStyle, setStyle] = useState({
    backgroudColor: 'white',
    color: 'black'
  })
  const handaleInvertbag = () => {
    if (myStyle.backgroundColor !== 'black') {
      setStyle({
        backgroundColor: 'black',
        color: 'white'
      })

      document.body.style.backgroundColor = 'black'
      // you can also change the backgroud of body..
      setMode('bg-black')
      showAlert(" Enable_Dark_Mode", "Successfully")
      document.body.style.color = 'white'

    }
    else {
      setStyle({
        backgroundColor: 'white',
        color: 'black'
      })
      document.body.style.backgroundColor = 'white'
      document.body.style.color = 'black'

      setMode('bg1')
      showAlert(" Enable_Light_Mode", "Successfully")
    }
  }
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);

  }
  const [mode, setMode] = useState('bg1')
  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <div >
            <Navbar title="Cloudnote" bgchange={handaleInvertbag} />
          </div>
          <div className='ht'>
            <Alert alert={alert} />
          </div>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={
              <div className=''>
                <About mode={mode} />
              </div>} />
            <Route path="/mynotes" element={<Notes showAlert={showAlert} />} />
            <Route path="/addnote" element={<AddNote showAlert={showAlert} />} />
            <Route path="/signUp" element={<SignUp showAlert={showAlert} />} />
            <Route path="/login" element={<LogIn showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
