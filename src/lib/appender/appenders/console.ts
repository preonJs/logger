import { TransportCore } from '../core';
import { LogLevel } from '../../base';

export default class ConsoleTransport extends TransportCore {
  static defaultFormat() {

  }

  out(level: LogLevel, ...data: any[]) {
    const outMethod = console[LogLevel[level]] ? console[LogLevel[level]] : console.log;
    outMethod(...data);
  }
}
