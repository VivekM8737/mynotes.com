import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom"

function Notes(props) {
    const { showAlert } = props;
    let navigation = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
            getNotes();
        }
        else {
            navigation('/login')
        }
    }, [])
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setnote] = useState({ id: "", etitle: "", etag: "", edescription: "" });
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description })
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })

    }
    const handalClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.etag, note.edescription)
        refClose.current.click();
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-md-9">
                                    <label htmlFor="etitle" className="form-label" >For Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} placeholder="Title" minLength={3} required />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="etag" className="form-label">For Tag</label>
                                    <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onChange} placeholder="Tag" />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" rows="10" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange} placeholder="Write you note..." />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 6} className="btn btn-primary" onClick={handalClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='m-1 stPos'>
                <h2 style={{ textAlign: "center" }}>Your Notes</h2>
                {notes.length === 0 && "There is no notes..."}
                <div className='row'>


                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
                    })}

                </div>
            </div>
        </>
    )
}

export default Notes