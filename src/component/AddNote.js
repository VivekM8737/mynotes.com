import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
function AddNote(props) {
    const {showAlert}=props
    const context = useContext(noteContext);
    const {addNote } = context;
    const [note, setnote] = useState({title:"",tag:"",description:""})
    const handalnote=(e)=>{
        e.preventDefault();
        try {
            addNote(note.title,note.tag, note.description)
            setnote({title:"",tag:"",description:""})
            showAlert("Successfully","Saved")
        } catch (error) {
            showAlert(" Internal server error","Failed")
        }
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value})

    }
  return (
    <>
    <div className='m-3 stPos'>
        <div>
          <h2>Add Your Note</h2>
        </div>
        <form className="row g-3">
          <div className="col-md-9">
            <label htmlFor="title" className="form-label" >For Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} minLength={3} required onChange={onChange} placeholder="Title" />
          </div>
          <div className="col-md-3">
            <label htmlFor="tag" className="form-label">For Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder="Tag" />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea type="text" className="form-control" rows="10" id="description" value={note.description} name="description" onChange={onChange} placeholder="Write you note..." />
          </div>
          <div className="col-12">
            <button type="submit" disabled={note.title.length<3||note.description.length<6} className="btn btn-primary"minLength={5} required onClick={handalnote}>Save Note</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default AddNote