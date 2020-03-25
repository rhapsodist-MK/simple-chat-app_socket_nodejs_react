const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const router = require('./router')

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => { // client emit 쪽에서 넘겨준 string을 event 이름으로 지정하여 실행
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    // 입장한 유저에게 메세지를 보냄
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
    // 입장한 유저 이외에 방에 존재하는 유저들에게 메세지를 보냄
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`})

    socket.join(user.room)
    callback()
  })


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message})
    callback()
  })


  socket.on('disconnect', () => {
    console.log('user had left!')
  })
})

app.use(router)

server.listen(PORT, () => { console.log(`Server has started on port ${PORT}`) })