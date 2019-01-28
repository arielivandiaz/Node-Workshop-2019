var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


const check_db = `SHOW DATABASES LIKE 'workshop_node'`;
const create = 'CREATE DATABASE `workshop_node`';
const create_table = 'CREATE TABLE `workshop_node`.`info` ( \
                        `id` int(11) NOT NULL AUTO_INCREMENT, \
                        `user` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
                        `info` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
                        `repo` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
                        `url` varchar(255) COLLATE utf8_spanish2_ci NOT NULL, \
                        PRIMARY KEY (`id`) \
                        )ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;';
const select = 'SELECT * FROM `workshop_node`.`info` WHERE 1';
const insert = 'INSERT INTO `workshop_node`.`info`( `user`, `info`, `repo`, `url`) VALUES ' + `('Ariel I. Diaz','Author','https://github.com/arielivandiaz/Node-Workshop-2019','https://www.arielivandiaz.com/')`;
const delete_db = 'DROP DATABASE `workshop_node`';

module.exports = {
    check_db,
    create,
    create_table,
    select,
    insert,
    delete_db,

    get_query: (str_query) => {
        return new Promise(function(resolve, reject) {     
            connection.query(  str_query , function (err, rows, fields) {
         
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },   
}