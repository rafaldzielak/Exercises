// Singleton
class Logger {
  constructor() {
    if (Logger.instance === null) {
      this.logs = [];
      Logger.instance = this;
    }
    return Logger.instance;
  }
  log(message) {
    this.logs.push(message);
    console.log(`Logger: ${message}`);
  }
  printLogCoun() {
    console.log(`${this.logs.length} logs`);
  }
}
const logger = new Logger();
Object.freeze(logger); // prevents the object from being changed
export default logger;
