const Sequelize = require('sequelize');
const db = require('../db/connection');

const Cliente = db.define('cliente', {
    nome: { type: Sequelize.STRING, },
    idade: { type: Sequelize.INTEGER, },
    empresa: { type: Sequelize.STRING, },
    email: { type: Sequelize.STRING, }
});

module.exports = Cliente;