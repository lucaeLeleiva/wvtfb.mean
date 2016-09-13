'use strict';

//Importo las variables de ambiente.
const dotenv = require('dotenv').config(),
    _db_port = process.env.DB_PORT,
    _db_uri = process.env.DB_URI,
    _db_url = process.env.DB_URL,
    _db_user = process.env.DB_USER,
    _db_pass = process.env.DB_PASS,
    _host_ip = process.env.IP,
    _host_port = process.env.PORT;

//Exporto las variables de ambiente.
module.exports = {
    db_port: _db_port,
    db_uri: _db_uri,
    db_url: _db_url,
    db_user: _db_user,
    db_pass: _db_pass,
    port: _host_port,
    ip: _host_ip,
};