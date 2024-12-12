import React from 'react'

const ErrorMessage = ({ error }) => {
    if (!error) {
        return null;
    }

    return (
        <p className="ErrorMessage">{error}</p>
    )
}

export default ErrorMessage