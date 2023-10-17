import noteContext from "./noteContext"
import { useState } from "react"
const prt=process.env.REACT_APP_PORT || 5000;
const NoteState = (props) => {
    const { showAlert } = props;
    const host = `http://localhost:${prt}`
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const getNotes = async () => {
        try {
            if(localStorage.getItem('token')){

                const response = await fetch(`${host}/api/notes/getNotes`, {
                    method: "GET", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": 'application/json',
                        "auth-tocken": localStorage.getItem('token')
                    },
                });
                const json = await response.json();
                setNotes(json)
            }
            else{
                showAlert("Please login first!","Sugession")
            }
        } catch (error) {
            showAlert("Internal server error!", "Failed")
        }

    }
    const addNote = async (title, tag, description) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": 'application/json',
                    "auth-tocken": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, tag, description }), // body data type must match "Content-Type" header
            });
            // Adding notes...
            const note = await response.json()
            setNotes(notes.concat(note))
        } catch (error) {
            showAlert("Internal server error!", "Failed")
        }

    }
    const deleteNote = async (id) => {
        let val = prompt("if you want to delete this note Enter: delete");
        try {
            if (val === "delete") {

                //todo by database
                await fetch(`${host}/api/notes/noteDelete/${id}`, {
                    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": 'application/json',
                        "auth-tocken": localStorage.getItem('token')
                    },
                });
                // Delete Note...
                const newnote = notes.filter((note) => {
                    return note._id !== id
                })
                setNotes(newnote)
                props.showAlert(`Deleted`, "Successfully")
            }
            else {
            }
        } catch (error) {
            showAlert("Internal server error!", "Failed")

        }

    }
    // todo in database..
    // Update Note...
    const editNote = async (id, title, tag, description) => {
        // api calls 
        // Default options are marked with *
        try {
            const response = await fetch(`${host}/api/notes/udatenote/${id}`, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": 'application/json',
                    "auth-tocken": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, tag, description }),
            });
            const json = response.json();
            // logic to change the client side
            let newN = JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < newN.length; index++) {
                const element = newN[index];
                if (element._id === id) {
                    newN[index].title = title;
                    newN[index].tag = tag;
                    newN[index].description = description;
                    break;
                }
            }
            setNotes(newN);
            showAlert("Note is updated", "Successfully")


        } catch (error) {
            showAlert("Internal server error!", "Failed")

        }

    }
    return (
        <>  
            <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
                {props.children}
            </noteContext.Provider>
        </>
    )
}
export default NoteState;;