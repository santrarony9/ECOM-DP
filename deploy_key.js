const { Client } = require('ssh2');

const pubKey = 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIF5dvd77ezk99buwynA3XHNyB8TR/MtAo7RH9OhSlA1+ hpi9@RonySantraNTT';
const password = 'SRhP8Rw_WJD8jZP2';
const host = '135.125.9.81';
const port = 20064;

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec(`mkdir -p ~/.ssh && echo "${pubKey}" >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: host,
  port: port,
  username: 'root',
  password: password,
  debug: console.log,
  readyTimeout: 20000,
  algorithms: {
    serverHostKey: [ 'ssh-ed25519', 'ssh-rsa', 'ecdsa-sha2-nistp256' ]
  }
});
