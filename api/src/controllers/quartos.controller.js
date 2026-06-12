const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    let { numero, tipo } = req.body;

    if (!numero) {
      return res.status(400).json({
        erro: "Número do quarto obrigatório"
      });
    }

    numero = numero.trim();

    if (numero.length > 10) {
      return res.status(400).json({
        erro: "Número do quarto inválido"
      });
    }

    if (!tipo) {
      return res.status(400).json({
        erro: "Tipo obrigatório"
      });
    }

    tipo = tipo.trim();

    const existe = await prisma.quartos.findUnique({
      where: {
        numero
      }
    });

    if (existe) {
      return res.status(400).json({
        erro: "Quarto já cadastrado"
      });
    }

    const item = await prisma.quartos.create({
      data: {
        numero,
        tipo
      }
    });

    return res.status(201).json(item);

  } catch (erro) {
    console.log(erro);

    return res.status(500).json({
      erro: "Erro interno no servidor"
    });
  }
};

const listar = async (req, res) => {
  const lista = await prisma.quartos.findMany();

  return res.status(200).json(lista);
};

const buscar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.quartos.findUnique({
    where: {
      id: Number(id)
    }
  });

  return res.status(200).json(item);
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const item = await prisma.quartos.update({
    where: {
      id: Number(id)
    },
    data: dados
  });

  return res.status(200).json(item);
};

const excluir = async (req, res) => {
  const { id } = req.params;

  const reservas = await prisma.reservas.findMany({
    where: {
      quarto_id: Number(id)
    }
  });

  if (reservas.length > 0) {
    return res.status(400).json({
      erro: "O quarto possui reservas cadastradas"
    });
  }

  const item = await prisma.quartos.delete({
    where: {
      id: Number(id)
    }
  });

  return res.status(200).json(item);
};

module.exports = {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir
};