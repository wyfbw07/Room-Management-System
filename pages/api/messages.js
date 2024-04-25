// pages/api/messages.js
import { Server } from 'socket.io';

export default function handler(req, res) {
    if (!res.socket.server.io) {
        console.log('New Socket.io server being initialized...');
        const io = new Server(res.socket.server);

        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('message', (data) => {
                console.log('Message received:', data);
                io.emit('message', data); 
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        res.socket.server.io = io;
    } else {
        console.log('Socket.io already running');
    }
    res.end();
}
