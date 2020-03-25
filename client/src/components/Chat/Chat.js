import React, { useState, useEffect } from 'react'
import queryString from 'query-string' // url에서 query를 처리해주는 모듈
import io from 'socket.io-client'

let socket;

export default ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = `localhost:5000`

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room})
  }, [ENDPOINT, location.search]) // 오직 배열안의 값들이 변할때만 실행시킴
  return (
    <h1>Chat</h1>
  )
}