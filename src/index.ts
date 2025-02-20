import { Bot } from './Bot';
import { WebSocketServer } from './WebSocketServer';
import { BotCommand } from './commands/BotCommand';
import { HaloCommand } from './commands/HaloCommand';

// Inisialisasi bot
const bot = new Bot('./auth_info.json');
bot.addCommand(new BotCommand('/'));
bot.addCommand(new HaloCommand('/'));

// Mulai bot
bot.start();

// Inisialisasi WebSocket server
const webSocketServer = new WebSocketServer(8080);

console.log('Bot and WebSocket server started!');