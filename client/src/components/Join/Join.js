import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Join.css'

export default () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input 
            type="text" 
            className="joinInput" 
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="text" 
            className="joinInput mt-20" 
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link 
          to={`/chat?name=${name}&room=${room}`}
          onClick={(e) => (!name || !room) ? e.preventDefault() : null }
        >
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}