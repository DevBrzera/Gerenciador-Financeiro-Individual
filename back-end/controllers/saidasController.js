const SaidaModel = require("../models/saidasModel");

class SaidaController {
  async create(req, res) {
    try {
      const { Data, Descricao, Categoria, Dinheiro} = req.body;
      const { userId } = req.params;
      const newSaida = { Data: Data, Descricao: Descricao, Categoria: Categoria, Dinheiro: Dinheiro, ID_Usuario: userId };
      await SaidaModel.create(newSaida);
      res.status(201).json({ message: "Saída criada com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao criar a saída" });
      console.error(e);
    }
  }

  async readList(req, res) {
    try {
      const userId = req.params.userId;
      const saidas = await SaidaModel.readList(userId);
      res.status(200).json(saidas);
    } catch (e) {
      res.status(500).json({ error: "Erro ao ler as saídas" });
      console.error(e);
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;
      const saida = await SaidaModel.read(id);
      if (!saida) {
        return res.status(404).json({ error: "Saída não encontrada" });
      }
      res.status(200).json(saida);
    } catch (e) {
      res.status(500).json({ error: "Erro ao ler a saída" });
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedSaida = req.body;
      const saida = await SaidaModel.update(updatedSaida, id);
      if (!saida) {
        return res.status(404).json({ error: "Saída não encontrada" });
      }
      res.status(200).json({ message: "Saída atualizada com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao atualizar a saída" });
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedSaida = await SaidaModel.delete(id);
      if (!deletedSaida) {
        return res.status(404).json({ error: "Saída não encontrada" });
      }
      res.status(200).json({ message: "Saída excluída com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao excluir a saída" });
      console.error(e);
    }
  }
}

module.exports = new SaidaController();
