const dbConnection = require("../db/dbConnection");

class UserModel {
  executeSQL(sql, parametros = "") {
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, parametros, (error, resposta) => {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  create(newUser) {
    const sql = "INSERT INTO Usuario (Nome, Email, Senha) VALUES (?,?,?)";
    return this.executeSQL(sql, [ newUser.Nome, newUser.Email, newUser.Senha ]);
  }

  readList() {
    const sql = "SELECT * FROM Usuario";
    return this.executeSQL(sql);
  }

  read(id) {
    const sql = "SELECT * FROM Usuario WHERE ID = ?";
    return this.executeSQL(sql, [id]);
  }

  update(updatedUser, id) {
    const sql = "UPDATE Usuario SET Nome = ?, Email = ?, Senha = ? WHERE ID = ?";
    return this.executeSQL(sql, [updatedUser.Nome, updatedUser.Email, updatedUser.Senha, id]);
  }

  delete(id) {
    const sql = "DELETE FROM Usuario WHERE ID = ?";
    return this.executeSQL(sql, [id]);
  }
}

module.exports = new UserModel();
