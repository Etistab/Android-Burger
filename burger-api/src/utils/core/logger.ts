import chalk from 'chalk';

const stdout = console;

/**
 * Application logger object.
 */
export const logger = {
  /**
   * Logs information message on the standard output.
   */
  info: (message: object | string | number) =>
    stdout.info(chalk.bold.bgGreen.black('[INFO]') + ' ' + message.toString()),

  /**
   * Logs error message on the standard output.
   */
  error: (message: object | string | number) =>
    stdout.error(chalk.bold.bgRed.black('[ERROR]') + ' ' + message.toString()),

  /**
   * Logs warning message on the standard output.
   */
  warn: (message: object | string | number) =>
    stdout.warn(chalk.bold.bgYellow.black('[WARN]') + ' ' + message.toString()),

  /**
   * Logs simple message on the standard output.
   */
  log: (message: object | string | number) => stdout.log(message.toString())
};
