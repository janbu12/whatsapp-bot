# Whatsapp Bot Starter

### Installation
- clone this repository
  ``` bash
  git clone https://github.com/janbu12/whatsapp-bot.git
  ```
- open project path
  ``` bash
  cd whatsapp-bot
  ```
- npm install
  ``` bash
  npm install
  ```
- npm start
  ``` bash
  npm start
  ```
- scan qr code to connect your whatsapp

### How to configure browsers
Open Bot.ts to configure your browser
```ts
this.sock = makeWASocket({
    auth: state,
    // You can edit 'Windows' for OS, and 'Chrome' for browser, and '11' for OS versions
    browser: ['Windows', 'Chrome', '11'],
    printQRInTerminal: true,
});
```

### How to make new commands

example you want to make new commands for Introduction
- create file typescript on folder /src/commands
    ```bash
    src/
    ├── Bot.ts
    ├── WebSocketServer.ts
    ├── commands/
    │   ├── Command.ts
    │   ├── MenuCommand.ts
    │   ├── IntroductionCommand.ts
    ├── index.ts
    ```
- and make yout command response
    ```ts
    import { Command } from './Command';

    export class IntroductionCommand extends Command {
        constructor(prefix: string) {
            super('introduction', prefix);
        }

        async execute(message: string, sender: string): Promise<string> {
            return `Hello *${sender}*, im personal bot`;
        }
    }
    ```
- call introduction command on index.ts
    ```ts
    import { Bot } from './Bot';
    import { WebSocketServer } from './WebSocketServer';
    import { BotCommand } from './commands/BotCommand';
    import { HaloCommand } from './commands/HaloCommand';
    import { IntroductionCommand } from './commands/IntroductionCommand';

    const bot = new Bot('./auth_info.json');
    bot.addCommand(new BotCommand('/'));
    bot.addCommand(new HaloCommand('/'));
    bot.addCommand(new IntroductionCommand('/'));

    // You can edit prefix
    // bot.addCommand(new IntroductionCommand('!'));

    bot.start();

    const webSocketServer = new WebSocketServer(8080);

    console.log('Bot and WebSocket server started!');
    ```
