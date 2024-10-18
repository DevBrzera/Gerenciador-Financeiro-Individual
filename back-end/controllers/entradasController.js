const EntradaModel = require("../models/entradasModel");

class EntradaController {
  async create(req, res) {
    try {
      const { Data, Descricao, Categoria, Dinheiro } = req.body;
      const { userId } = req.params;
      const newEntrada = { Data: Data, Descricao: Descricao, Categoria: Categoria, Dinheiro: Dinheiro, ID_Usuario: userId };
      await EntradaModel.create(newEntrada);
      res.status(201).json({ message: "Entrada criada com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao criar entrada" });
      console.error(e);
    }
  }

  async readList(req, res) {
    try {
      const userId = req.params.userId;
      const entradas = await EntradaModel.readList(userId);
      res.status(200).json(entradas);
    } catch (e) {
      res.status(500).json({ error: "Erro ao ler as entradas" });
      console.error(e);
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;
      const entrada = await EntradaModel.read(id);
      if (!entrada) {
        return res.status(404).json({ error: "Entrada não encontrada" });
      }
      res.status(200).json(entrada);
    } catch (e) {
      res.status(500).json({ error: "Erro ao ler a entrada" });
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedEntrada = req.body;
      const entrada = await EntradaModel.update(updatedEntrada, id);
      if (!entrada) {
        return res.status(404).json({ error: "Entrada não encontrada" });
      }
      res.status(200).json({ message: "Entrada atualizada com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao atualizar a entrada" });
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedEntrada = await EntradaModel.delete(id);
      if (!deletedEntrada) {
        return res.status(404).json({ error: "Entrada não encontrada" });
      }
      res.status(200).json({ message: "Entrada excluída com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao excluir a entrada" });
      console.error(e);
    }
  }
}

module.exports = new EntradaController();
