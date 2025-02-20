import { Command } from './Command';

export class HaloCommand extends Command {
  constructor(prefix: string) {
    super('halo', prefix);
  }

  async execute(message: string, sender: string): Promise<string> {
    return `Halo *${sender}*, saya adalah bot personal apakah ada yang bisa saya bantu?`;
  }
}