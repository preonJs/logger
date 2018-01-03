import * as assert from 'assert';
import * as colors from 'colors/lib/styles';

export type LogLevels = 'ALL' | 'LOG' | 'NONE' | 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL' | 'MARK' | 'OFF';

export default class LogLevel {
  static Levels = {};

  static ALL = new LogLevel(0, 'ALL', 'gray');
  static LOG = new LogLevel(1, 'LOG', 'gray');
  static NONE = new LogLevel(1, 'NONE', 'gray');
  static TRACE = new LogLevel(5000, 'TRACE', 'blue');
  static DEBUG = new LogLevel(10000, 'DEBUG', 'cyan');
  static INFO = new LogLevel(20000, 'INFO', 'green');
  static WARN = new LogLevel(30000, 'WARN', 'yellow');
  static ERROR = new LogLevel(40000, 'ERROR', 'red');
  static FATAL = new LogLevel(50000, 'FATAL', 'magenta');
  static MARK = new LogLevel(Number.MAX_SAFE_INTEGER, 'MARK', 'grey');
  static OFF = new LogLevel(Number.MAX_VALUE, 'OFF', 'grey');

  static from(level: string | number) {
    if (typeof level === 'string') {
      const existLevel = LogLevel[level.toUpperCase()];

      if (existLevel && existLevel instanceof LogLevel) {
        return existLevel;
      }

      return LogLevel.ALL;
    }

    // if is number, select the most close
    if (level <= 0) {
      return LogLevel.ALL;
    }
    if (level >= Number.MAX_VALUE) {
      return LogLevel.OFF;
    }

    const sortKeys = [...Object.keys(LogLevel.Levels), level].sort((a: string | number, b: string | number) => {
      const levelA = typeof a === 'number' ? a : LogLevel[a].level;
      const levelB = typeof b === 'number' ? b : LogLevel[b].level;
      return levelA - levelB;
    });
    const nextLevelIndex = sortKeys.indexOf(level) + 1;
    return LogLevel[sortKeys[nextLevelIndex]];
  }

  constructor(protected readonly level: number, protected readonly name: string, protected readonly color: string) {
    assert(level >= 0 && level <= Number.MAX_VALUE, `level must between ${0} and ${Number.MAX_VALUE}, got ${level}`);
    assert(!LogLevel.Levels[name], `duplicate level name: ${name}`);
    assert(colors[color], 'illegal argument');

    LogLevel.Levels[name] = this;
  }

  toString() {
    return this.name;
  }
}
