declare namespace Express {
  import { Server } from 'socket.io';
  export interface Request {
    user: {
      id: string;
    };
    realtime: {
      io: Server
    };
  }
}