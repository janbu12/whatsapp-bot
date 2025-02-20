import { Command } from './Command';

export class BotCommand extends Command {
  constructor(prefix: string) {
    super('bot', prefix);
  }

  async execute(message: string, sender: string): Promise<string> {
    return `Halo *${sender}*, berikut adalah *perintah* yang dapat dijanlankan:\n1. /bot (perintah2 bot)\n2. /halo (menyapa bot)`;
  }
}