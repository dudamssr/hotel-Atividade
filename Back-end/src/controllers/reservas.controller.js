const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    let {
      hospede,
      dataEntrada,
      dataSaida,
      quartoId
    } = req.body;

    if (!hospede) {
      return res.status(400).json({
        erro: "Nome do hóspede obrigatório"
      });
    }

    hospede = hospede.trim();

    if (!dataEntrada || !dataSaida) {
      return res.status(400).json({
        erro: "Datas obrigatórias"
      });
    }

    if (!quartoId) {
      return res.status(400).json({
        erro: "Quarto obrigatório"
      });
    }

    quartoId = Number(quartoId);

    const quarto = await prisma.quartos.findUnique({
      where: {
        id: quartoId
      }
    });

    if (!quarto) {
      return res.status(404).json({
        erro: "Quarto não encontrado"
      });
    }

    const entrada = new Date(dataEntrada);
    const saida = new Date(dataSaida);

    if (saida <= entrada) {
      return res.status(400).json({
        erro: "Data de saída deve ser maior que a data de entrada"
      });
    }

    const item = await prisma.reservas.create({
      data: {
        hospede,
        dataEntrada: entrada,
        dataSaida: saida,
        quartoId
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
  const lista = await prisma.reservas.findMany({
    include: {
      quarto: true
    }
  });

  return res.status(200).json(lista);
};

const listarPorQuarto = async (req, res) => {
  const { quartoId } = req.params;

  const lista = await prisma.reservas.findMany({
    where: {
      quartoId: Number(quartoId)
    }
  });

  return res.status(200).json(lista);
};

const buscar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.reservas.findUnique({
    where: {
      id: Number(id)
    }
  });

  return res.status(200).json(item);
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const item = await prisma.reservas.update({
    where: {
      id: Number(id)
    },
    data: dados
  });

  return res.status(200).json(item);
};

const excluir = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.reservas.delete({
    where: {
      id: Number(id)
    }
  });

  return res.status(200).json(item);
};

module.exports = {
  cadastrar,
  listar,
  listarPorQuarto,
  buscar,
  atualizar,
  excluir
};