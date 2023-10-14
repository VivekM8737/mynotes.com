import React,{useEffect} from 'react'
import {
  Link,
  useNavigate 
  // eslint-disable-next-line 
} from "react-router-dom";
import Notes from './Notes';
function Home(probs) {
  const {showAlert}=probs
  return (
    <>
    <Link className='btn-link mx-1' to='./AddNote'><button type="button" className="btn btn-primary btn-sm stPosbtn">Add Note</button></Link>
    <Notes showAlert={showAlert}/>


    </>
  )
}

export default Home