import { stat, createWriteStream } from 'fs';
import { Writable } from 'stream';
import { TransportInterface, TransportCore } from '../core';
import { LogLevel } from '../../base';

interface LogInterface {
  timestame: number,
  level: LogLevel,
  data: any[]
}

interface FileLoggerInterface extends TransportInterface {

}

/**
 * @constructs
 * @extends TransportCore
 */
export default class FileLogger extends TransportCore implements FileLoggerInterface {
  // 今天的时间戳
  private todayTS: number;

  // 要写入的文件路径
  private filePath: string;

  // 写入流
  private writeStream: Writable;

  // 队列
  private queue: Array<LogInterface>;

  constructor(options) {
    super(options);
    this.init();
  }

  // 存储超期的文件
  private rename() {

  }

  // 删除超期的文件
  private cleanup() {

  }

  // 写入之前要进行的初始化, 包括流创建,文件备份等
  private init() {

  }
}
