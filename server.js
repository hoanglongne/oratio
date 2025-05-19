const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server);

    // Socket.io connection handling
    io.on('connection', (socket) => {
        console.warn('User connected:', socket.id);

        // Handle WebRTC signaling
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).emit('user-connected', userId);

            socket.on('disconnect', () => {
                socket.to(roomId).emit('user-disconnected', userId);
            });
        });

        // Handle WebRTC offer
        socket.on('offer', (roomId, userId, offer) => {
            socket.to(roomId).emit('offer', userId, offer);
        });

        // Handle WebRTC answer
        socket.on('answer', (roomId, userId, answer) => {
            socket.to(roomId).emit('answer', userId, answer);
        });

        // Handle ICE candidates
        socket.on('ice-candidate', (roomId, userId, candidate) => {
            socket.to(roomId).emit('ice-candidate', userId, candidate);
        });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.warn(`> Ready on http://localhost:${PORT}`);
    });
}); 