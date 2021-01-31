const ipUtil = require('ip');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const fingerprintStats = fs.statsSync(
  path.resolve(__dirname, '../fingerprint')
);

const makeFingerPrint = () => {
  const fp = `${os.hostname()}/${ipUtil.address()}`;
  const md5 = crypto.createHash('md5');
  const fpHash = md5.update(fp).digest();
  fs.writeFile(path.resolve(__dirname, '../fingerprint'), fpHash);
  return fpHash;
};

const fingerprint = fingerprintStats.isFile()
  ? makeFingerPrint()
  : fs.readFileSync('./fingerprint');

module.exports = { fingerprint };
