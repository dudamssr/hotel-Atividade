const express = require("express");

const router = express.Router();

const {
  cadastrar,
  listar,
  listarPorQuarto,
  buscar,
  atualizar,
  excluir
} = require("../controllers/reservas.controller");

router.post("/cadastrar", cadastrar);
router.get("/listar", listar);
router.get("/quarto/:quartoId", listarPorQuarto);
router.get("/buscar/:id", buscar);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;