import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
    if (!socket) {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || '';
        socket = io(socketUrl, {
            reconnectionDelayMax: 10000,
            transports: ['websocket'],
        });
    }
    return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const joinRoom = (roomId: string, userId: string): void => {
    if (socket) {
        socket.emit('join-room', roomId, userId);
    }
};

export const sendOffer = (roomId: string, userId: string, offer: RTCSessionDescriptionInit): void => {
    if (socket) {
        socket.emit('offer', roomId, userId, offer);
    }
};

export const sendAnswer = (roomId: string, userId: string, answer: RTCSessionDescriptionInit): void => {
    if (socket) {
        socket.emit('answer', roomId, userId, answer);
    }
};

export const sendIceCandidate = (
    roomId: string,
    userId: string,
    candidate: RTCIceCandidateInit
): void => {
    if (socket) {
        socket.emit('ice-candidate', roomId, userId, candidate);
    }
}; 