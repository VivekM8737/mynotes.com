import React from 'react'

export default function Alert(probs) {
    return (
        probs.alert && <div className="alert alert-primary ht" role="alert">
            <strong>{probs.alert.type}:</strong>{probs.alert.msg}
        </div>


    )
}