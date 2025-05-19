import 'webrtc-adapter';
import { Socket } from 'socket.io-client';

export interface PeerConnection {
    connection: RTCPeerConnection;
    userId: string;
}

export interface WebRTCState {
    localStream: MediaStream | null;
    peerConnections: Map<string, PeerConnection>;
    socket: Socket | null;
    roomId: string | null;
    userId: string | null;
}

export const createPeerConnection = (
    userId: string,
    socket: Socket,
    roomId: string,
    localStream: MediaStream
): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ],
    });

    // Add local tracks to the peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', roomId, userId, event.candidate);
        }
    };

    return peerConnection;
};

export const initializeWebRTC = async (): Promise<MediaStream> => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        return stream;
    } catch (error) {
        throw new Error(`Error accessing media devices: ${String(error)}`);
    }
}; 