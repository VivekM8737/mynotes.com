import React from 'react'
import { useEffect } from 'react';
import PropTypes from 'prop-types'
import {
    Link,
    useLocation,
    useNavigate
    // eslint-disable-next-line 
} from "react-router-dom";

function Navbar(props) {
    let navigation=useNavigate();
    let location= useLocation();
    useEffect(() => {
    //   console.log(location.pathname)
    }, [location])
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigation('/login')
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.title}  </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'? "active":''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/mynotes'? "active":''}`} aria-current="page" to="/mynotes">MyNotes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'? "active":''}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            {/* <button className="btn btn-primary" type="submit">Search</button> */}
                            <Link className={`btn btn-primary mx-1 ${location.pathname==='/signup'? "d-none":''}`}role='button' type="submit" to='/signup'>SignUp</Link>
                            <Link className={`btn btn-primary mx-1 ${location.pathname==='/login'? "d-none":''}`}role='button' type="submit" to='/login'>LogIn</Link>
                        </form>:<button className="btn btn-primary" type="button" onClick={handleLogout}>LogOut</button>}

                        <div className="form-check form-switch mx-1">
                            <input className="form-check-input" type="checkbox" onClick={props.bgchange} role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark_Mode</label>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}
Navbar.prototype = {
    title: PropTypes.string
}
Navbar.defaultProps = {
    title: "Set the tilte"
}
export default Navbar