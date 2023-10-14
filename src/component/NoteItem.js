import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
function NoteItem(props) {
    const context = useContext(noteContext);
    const { note , updateNote} = props;
    const {deleteNote } = context;    
    const delet = () => {
        deleteNote(note._id)
        
    }
    return (
        <div className='col-md-4 my-2'>
            <div className="card ">
            <div className='bz'>
            <span className="badge rounded-pill bg-danger">
                {note.tag}
            </span>
            </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={delet}></i>
                    <i className="fa-solid fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem