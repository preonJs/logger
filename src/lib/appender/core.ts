import { LogLevel } from '../base';

export interface TransportInterface {
  filter(level: LogLevel): boolean

  format(level: LogLevel, ...data: any[]): any

  out(level: LogLevel, ...data: any[]): void

  log(level: LogLevel, ...data: any[]): void
}

const debugLevel: string = process.env.NODE_DEBUG || '';

/**
 * core lib for transports
 * @constructor
 */
export class TransportCore implements TransportInterface {
  /**
   * 日志输出的等级
   */
  private readonly level: LogLevel;

  /**
   * @constructs
   * @param {object} level
   */
  constructor({level = ''} = {}) {
    if (level && LogLevel[level]) {
      this.level = LogLevel[level];
    } else {
      this.level = LogLevel[debugLevel] || LogLevel.WARN;
    }
  }

  /**
   * log filter
   * @param {LogLevel} level
   * @return {boolean}
   */
  protected filter(level: LogLevel) {
    return level >= this.level;
  }

  /**
   * format error string
   * @param {LogLevel} level
   * @param data
   */
  protected format(level: LogLevel, ...data: any[]) {

  }

  protected out(level: LogLevel, ...data: any[]) {
    const outMethod = console[LogLevel[level]] ? console[LogLevel[level]] : console.log;
    outMethod(...data);
  }

  public log(level: LogLevel, ...data: any[]) {
    if (!this.filter(level)) {
      return;
    }
    this.out(level, ...data);
  }
}
