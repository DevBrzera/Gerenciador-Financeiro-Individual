const dbConnection = require("../db/dbConnection");

class EntradaModel {
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

  create(newEntrada) {
    const sql = "INSERT INTO Entradas (Data, Descricao, Categoria, Dinheiro, ID_Usuario) VALUES (?,?,?,?,?)";
    return this.executeSQL(sql, [
      newEntrada.Data,
      newEntrada.Descricao,
      newEntrada.Categoria,
      newEntrada.Dinheiro,
      newEntrada.ID_Usuario,
    ]);
  }

  readList(userId) {
    const sql = "SELECT * FROM Entradas WHERE ID_Usuario = ?";
    return this.executeSQL(sql, [userId]);
  }

  read(id) {
    const sql = "SELECT * FROM Entradas WHERE ID = ?";
    return this.executeSQL(sql, [id]);
  }

  update(updateEntrada, id) {
    const sql = "UPDATE Entradas SET Data = ?, Descricao = ?, Categoria = ?, Dinheiro = ? WHERE ID = ?";
    return this.executeSQL(sql, [
      updateEntrada.Data,
      updateEntrada.Descricao,
      updateEntrada.Categoria,
      updateEntrada.Dinheiro,
      id,
    ]);
  }

  delete(id) {
    const sql = "DELETE FROM Entradas WHERE ID = ?";
    return this.executeSQL(sql, [id]);
  }
}

module.exports = new EntradaModel();
