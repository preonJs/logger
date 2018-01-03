import Logger, { LoggerInterface, LoggerOptionsInterface } from './lib/logger';
import { TransportTypes } from './lib/base';

export { TransportType, LogLevel } from './lib/base';

export interface LoggersRegisterListOptionsInterface {
  [key: string]: LoggerOptionsInterface
}

export interface LoggersOptionsInterface {
  cwd?: string,
  path?: string,
  transports?: Array<TransportTypes> | TransportTypes,
  loggers: LoggersRegisterListOptionsInterface,
}

export interface LoggerListInterface {
  [name: string]: LoggerInterface
}

export interface LoggersInterface {
  readonly loggers: LoggerListInterface,

  readonly loggerPath: string;

  register(key: string, scheme: LoggerOptionsInterface): void;

  get(key: string): LoggerInterface;
}

/**
 * @readonly
 * @instance
 * @name loggers
 * @memberOf Loggers
 */

/**
 * @readonly
 * @instance
 * @name cwd
 * @memberOf Loggers
 */

/**
 * @readonly
 * @instance
 * @name loggerPath
 * @memberOf Loggers
 */

/**
 * Loggers
 * @constructor
 */
export default class Loggers implements LoggersInterface {
  readonly loggers: LoggerListInterface = {};

  readonly loggerPath: string;

  private cwd: string;

  /**
   * @constructs
   * @param {object} options
   * @param {string} [options.cwd=process.cwd()] cwd path
   * @param {string} [options.path=logs] where to save logs
   * @param {string[]} [options.transports=console] - default transports
   * @param {object} options.loggers - loggers options
   */
  constructor(private options: LoggersOptionsInterface) {
    this.cwd = options.cwd || process.cwd();

    this.loggerPath = options.path || 'logs';

    Object.keys(options.loggers || {}).forEach((key: string) => {
      this.register(key, options.loggers[key]);
    });
  }

  /**
   * @public
   * @param {string} key logger name
   * @param {object} scheme see [Logger.option](Logger.html#~option) logger option
   */
  public register(key: string, scheme: LoggerOptionsInterface) {
    this.loggers[key] = new Logger({
      path: this.loggerPath,
      cwd: this.cwd,
      transports: this.options.transports,
      ...scheme,
      key
    });
  }

  /**
   * @public
   * @param {string} key logger name
   * @return [Logger](Logger.html)
   */
  public get(key: string) {
    return this.loggers[key];
  }
}
