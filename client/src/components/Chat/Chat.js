import React, { useState, useEffect } from 'react'
import queryString from 'query-string' // url에서 query를 처리해주는 모듈
import io from 'socket.io-client'

let socket;

export default ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = `localhost:5000`

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => { // join이라는 이름으로 name, room을 서버로 토스하고, callback을 보내 서버에서 처리를 client에서 반영시킬 수 있다
      
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search]) // 오직 배열안의 값들이 변할때만 실행시킴

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) socket.emit('sendMessage', message, () => setMessage(''))
  }

  console.log(message, messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
    </div>
  )
}