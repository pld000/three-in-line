import { LogInfo } from '../interfaces/index';

class Statistic {
  private static logs: LogInfo[] = [];

  static write(info: LogInfo): void {
    this.logs.push(info);
  }

  static display(): void {
    console.table(this.logs);
  }
}
