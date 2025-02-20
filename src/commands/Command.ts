export abstract class Command {
    constructor(public name: string, public prefix: string) {}
  
    // Method abstrak untuk mengeksekusi command
    abstract execute(message: string, sender: string): Promise<string>;
}