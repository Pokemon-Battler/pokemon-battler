import React from 'react'
import { useLocation } from 'react-router-dom'

export default function WinPage() {

    const location = useLocation();

    return (
        <div>{location.state.winner.name}</div>
    )
}
