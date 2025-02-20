import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket } from 'baileys';
import { Boom } from '@hapi/boom';
import { Command } from './commands/Command';

export class Bot {
  private sock: WASocket | undefined;
  private commands: Command[] = [];

  constructor(private authFolder: string) {}

  public addCommand(command: Command): void {
    this.commands.push(command);
  }

  public async start(): Promise<void> {
    try {
      const { state, saveCreds } = await useMultiFileAuthState(this.authFolder);

      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // Aktifkan QR Code di terminal
      });

      this.sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
          const shouldReconnect =
            (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
          console.log(
            'Connection closed due to ',
            (lastDisconnect?.error as Boom)?.message || 'unknown reason',
            ', reconnecting: ',
            shouldReconnect
          );
          if (shouldReconnect) {
            this.start();
          }
        } else if (connection === 'open') {
          console.log('Opened connection');
        }
      });

      this.sock.ev.on('messages.upsert', async (event) => {
        for (const message of event.messages) {
            console.log(message);

          // Lewati jika pesan berasal dari bot sendiri
        //   if (message.key.fromMe) continue;

          // Pastikan pesan memiliki remoteJid (ID pengirim)
          if (!message.key.remoteJid || !message.pushName) continue;

          // Ekstrak teks dari pesan
          const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
          if (!text) continue;

          console.log('Received message:', text);

          // Proses command
          const response = await this.handleCommand(text, message.pushName);
          if (response) {
            await this.sock?.sendMessage(message.key.remoteJid, { text: response });
          }
        }
      });

      this.sock.ev.on('creds.update', saveCreds);
    } catch (error) {
      console.error('Error connecting to WhatsApp:', error);
    }
  }

  private async handleCommand(text: string, sender: string): Promise<string | null> {
    for (const command of this.commands) {
      const fullCommand = `${command.prefix}${command.name}`;
      if (text.startsWith(fullCommand)) {
        return await command.execute(text, sender);
      }
    }
    return null; // Jika tidak ada command yang cocok
  }
}