import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'
const prt=process.env.REACT_APP_PORT || 5000;
function SignUp(probs) {
    let navigation=useNavigate();
    const {showAlert} = probs;
    const [credetial, setcredetial] = useState({name:'', email:'',password:'',conpassword:''})
    const {name, email, password, conpassword}=credetial;
    const handalsubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:${prt}/api/auth/createUser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({name,email, password }),
            });
            const json = await response.json();
            // console.log(json);
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                navigation('/')
            }
            else{
                showAlert(` ${json.errors}`,'Failed')}
        }catch(error){
            // showAlert(`${error}`,'Failed')}
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
                        <h1>Sign Up</h1>
                        <div className="f1">
                            <form onSubmit={handalsubmit}>
                                <ul>
                                    <li><input type="text" className="form-control in" id="name" name="name"autoComplete="name" placeholder="User Name" value={name} onChange={onChange}minLength={4} required /></li>
                                    <li><input type="email" className="form-control in" id="email" name="email" autoComplete="emailS" placeholder="Email" onChange={onChange} value={email} /></li>
                                    <li><input type="password" className="form-control in" id="password" name="password" autoComplete="current-password"minLength={8} required placeholder="password"value={password}  onChange={onChange}/></li>
                                    <li><input type="password" className="form-control in" id="conpassword" name="conpassword" placeholder="Re-enter the password" autoComplete="current-password" required value={conpassword} onChange={onChange} /></li>

                                    <li><button type="submit" className="form-control in sub" id="tag" name="tag" value="submit" disabled={password!==conpassword} >Submit</button></li>
                                    <Link className={`btn mx-1 btnsp`}role='button' type="submit" to='/login'>LogIn</Link>

                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp