const express = require('express');
const Sequelize = require('sequelize');

const router = express.Router();
const Cliente = require('../models/Clientes');
const Op = Sequelize.Op;

//serviço para criação do cliente
router.post('/', (req, res) => {
  let { nome, idade, empresa, email } = req.body;

  Cliente.create({
    nome,
    idade,
    empresa,
    email
  })
    .then(() => res.status(200).send("Cliente salvo com sucesso!!!")) 
    .catch(err => console.log(err));
});

//Serviço para exclusão
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Cliente.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({message: "Cliente excluído com sucesso!"});
      } else {
        res.status(204).send({
          message: `Não foi possível excluir o contato de código=${id}. Pode ser que o contato não exista!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Não foi possível excluir o contato de código=${id}.`
      });
    });
});

//retorna o contato por ID
router.get('/selectId/:id', (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)
    .then(data => {
      if (data == null) {
        res.status(204).send({});
      } else {
        res.status(200).send(data);
      }

    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao pesquisar o contato id=" + id
      });
    });
});

//retonra o contato com condição
router.get('/selectAll', (req, res) => {
  const nome = req.query.nome;
  const email = req.query.email;

  Cliente.findAll({
    where: {
      [Op.or]: [
        { nome: { [Op.like]: `%${nome}%` } },
        { email: { [Op.like]: `%${email}%` } }
      ]
    }
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algo ocorreu na tentativa de retornar os dados"
      });
    });
});

//alterar Cliente
router.put('/', (req, res) => {
  let { id, nome, idade, empresa, email } = req.body;

  //alteração
  Cliente.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Contato alterado com sucesso"
        });
      } else {
        res.send({
          message: `Não foi possível alterar o contato com id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro alterando o id=" + id
      });
    });

});
module.exports = router