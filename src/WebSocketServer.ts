import * as WebSocket from 'ws';

export class WebSocketServer {
  private wss: WebSocket.Server;

  constructor(port: number) {
    this.wss = new WebSocket.Server({ port });
    this.setupListeners();
  }

  private setupListeners(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected');

      ws.on('message', (message: string) => {
        console.log(`Received: ${message}`);
        ws.send(`Echo: ${message}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }
}