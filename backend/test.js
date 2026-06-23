const dns = require('dns');

dns.resolveSrv(
  '_mongodb._tcp.cluster0.tveylkx.mongodb.net',
  (err, records) => {
    console.log(err || records);
  }
);