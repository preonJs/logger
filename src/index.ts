import Logger, { LoggerInterface, LoggerOptionsInterface } from './lib/logger';
import { TransportTypes } from './lib/base';

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

export default class Loggers implements LoggersInterface {
  readonly loggers: LoggerListInterface = {};

  readonly loggerPath: string;

  private cwd: string;

  constructor(private options: LoggersOptionsInterface) {
    this.cwd = options.cwd || process.cwd();

    this.loggerPath = options.path || 'logs';

    Object.keys(options.loggers || {}).forEach((key: string) => {
      this.register(key, options.loggers[key]);
    });
  }

  public register(key: string, scheme: LoggerOptionsInterface) {
    this.loggers[key] = new Logger({
      path: this.loggerPath,
      cwd: this.cwd,
      transports: this.options.transports,
      ...scheme,
      key
    });
  }

  public get(key: string) {
    return this.loggers[key];
  }
}
