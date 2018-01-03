import { LogLevel, TransportTypes } from './base';
import { TransportInterface } from './appender/core';
import * as Transports from './appender';

export interface LoggerOptionsInterface {
  transports?: Array<TransportTypes> | TransportTypes, // 存储类型
  key: string,
  path: string, // 存储相对路径
  cwd: string,
}

export interface LoggerInterface {
}

/**
 * @constructor
 */
export default class Logger implements LoggerInterface {
  private transports: Array<TransportInterface>;

  /**
   * @constructs
   * @param {object} options
   * @param {any[]} [options.transports='console']
   * @param {string} options.key
   * @param {string} options.path
   * @param {string} options.cwd=process.cwd()
   */
  constructor(private options: LoggerOptionsInterface) {
    options.transports = Array.isArray(options.transports) ? options.transports : [options.transports || 'console'];

    this.transports = options.transports.map(this.getTransport);
  }

  /**
   * @public
   * @param {string} data
   */
  public info(...data: any[]) {
    this.logger(LogLevel.INFO, ...data);
  }

  /**
   * @public
   * @param {string} data
   */
  public warn(...data: any[]) {
    this.logger(LogLevel.WARN, ...data);
  }

  /**
   * @public
   * @param {string} data
   */
  public log(...data: any[]) {
    this.logger(LogLevel.NONE, ...data);
  }

  /**
   * @public
   * @param {string} data
   */
  public error(...data: any[]) {
    this.logger(LogLevel.ERROR, ...data);
  }

  /**
   * @public
   * @param {string} data
   */
  public debug(...data: any[]) {
    this.logger(LogLevel.DEBUG, ...data);
  }

  /**
   * @private
   * @param {TransportTypes} name
   */
  private getTransport(name: TransportTypes) {
    return new Transports[name.toLocaleLowerCase()](this.options);
  }

  /**
   * @private
   * @param {LogLevel} level
   * @param {string} data
   */
  private logger(level: LogLevel, ...data: any[]) {
    this.transports.forEach((transport: TransportInterface) => {
      transport.log(level, ...data);
    });
  }
}
