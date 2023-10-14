import React from 'react'

function About(probs) {
  return (
    <>
    <div className={`text-center ${probs.mode} stPos`}>
            <div className="row">
                <div className="col m-2">
                    <h3>Contacts</h3>
                    <p>Email Id: vivekmishra1526@gmail.com</p>
                </div>
                <div></div>
                <div className="col m-1">
                    <h3>Service</h3>
                    <p>We providing a website where you can save your notes and access any where at any time!</p>
                    <p>Also we working on it... </p>
                </div>
                <div className="col m-1">
                    <h3>Since</h3>
                    <p>We are working from 20/03/2023</p>
                    <p>Also we are working on it.We are alway ready on your Service...</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default About