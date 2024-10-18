const UserModel = require("../models/userModel");

class UserController {
  async create(req, res) {
    try {
      const newUser = req.body;
      await UserModel.create(newUser);
      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao criar Usuário" });
      console.error(e);
    }
  }

  async readList(req, res) {
    try {
      const users = await UserModel.readList();
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: "Erro ao listar Usuários" });
      console.error(e);
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;  
      const user = await UserModel.read(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json({ error: "Erro ao ler Usuário" });
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      const users = await UserModel.update(updatedUser, id);
      if (!users) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao atualizar Usuário" });
      console.error(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.delete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: "Erro ao excluir Usuário" });
      console.error(e);
    }
  }
}

module.exports = new UserController();