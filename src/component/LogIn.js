import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'

function LogIn(probs) {
    let navigation=useNavigate();
    const {showAlert} = probs;
    const [credetial, setcredetial] = useState({email:'',password:''})
    const handalsubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/loginUser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({email: credetial.email,password: credetial.password }),
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                setcredetial({email:'',password:''})
                navigation('/')
            }
            else{showAlert(" Enter a valid email and password",'Failed')}

        }catch(error){

        }
        
    }
    const onChange=(e)=>{
        setcredetial({...credetial,[e.target.name]: e.target.value})
    }
  return (
    <>
    <div className=''>
        <div className="main_fo">
            <div className="fo1 bgg">
                <h1>Log In</h1>
                <div className="f1">
                    <form onSubmit={handalsubmit}>
                        <ul>
                            <li><input type="email" className="form-control in" id="email" name="email" placeholder="Email" value={credetial.email} onChange={onChange} /></li>
                            <li><input type="password" className="form-control in" id="password" autoComplete='current-password' name="password" placeholder="password" value={credetial.password} onChange={onChange} /></li>
                            <li><button type="submit" className="form-control in sub" id="tag" name="tag" value="submit" >Submit</button></li>
                            <Link className={`btn mx-1 btnsp`}role='button' type="submit" to='/signup'>SignUp</Link>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default LogIn