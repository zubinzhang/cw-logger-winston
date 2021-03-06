const fs = require('fs');
const path = require('path');
const util = require('util');
const moment = require('moment');

const CWLogger = require('../lib/cw-logger');
const Logger = require('../lib/logger');

describe('test/cw-logger.test.js', () => {
  it('CWLogger', () => {
    expect(util.isFunction(CWLogger)).toBeTruthy();
  });

  it('CWLogger instance property', () => {
    const log = new CWLogger();

    ['error', 'warn', 'info', 'debug'].forEach(level => {
      expect(log).toHaveProperty(level);
      expect(util.isFunction(log[level]));
    });
  });

  it('create log file', () => {
    const logger = new CWLogger();
    logger.info('logger1');
    expect(
      fs.existsSync(
        path.join(__dirname, `../logs/info/app-info-${moment().format('YYYY-MM-DD')}.log`),
      ),
    ).toBeTruthy();
    expect(
      fs.existsSync(
        path.join(__dirname, `../logs/error/error-${moment().format('YYYY-MM-DD')}.log`),
      ),
    ).toBeTruthy();
  });

  it('create json file', () => {
    const logger = new CWLogger({ json: true });
    logger.info('logger1');
    expect(
      fs.existsSync(
        path.join(__dirname, `../logs/info/app-info-${moment().format('YYYY-MM-DD')}.log`),
      ),
    ).toBeTruthy();
    expect(
      fs.existsSync(
        path.join(__dirname, `../logs/error/error-${moment().format('YYYY-MM-DD')}.log`),
      ),
    ).toBeTruthy();
  });

  it('create log file has module name', () => {
    const logger = new CWLogger({ module: 'app' });
    logger.info('logger2');

    expect(logger.set('module1').info('module1 log 1') instanceof Logger).toBeTruthy();
    expect(logger.set('module1').info('module1 log 2') instanceof Logger).toBeTruthy();
  });
});
