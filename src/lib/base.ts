export type TransportTypes = 'file' | 'console';

export type LogLevels = 'NONE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

/**
 * @readonly
 * @enum {number}
 * @property CONSOLE 0
 * @property FILE 1
 */
export enum TransportType {
  CONSOLE,
  FILE
}

/**
 * @readonly
 * @enum {number}
 * @property NONE 0
 * @property DEBUG 1
 * @property INFO 2
 * @property WARN 3
 * @property ERROR 4
 */
export enum LogLevel {
  NONE,
  DEBUG,
  INFO,
  WARN,
  ERROR
}
