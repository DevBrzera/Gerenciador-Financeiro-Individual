const dbConnection = require("../db/dbConnection");

class SaidaModel {
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

  create(newSaida) {
    const sql = "INSERT INTO Saidas (Data, Descricao, Categoria, Dinheiro, ID_Usuario) VALUES (?,?,?,?,?)";
    return this.executeSQL(sql, [
        newSaida.Data,
        newSaida.Descricao,
        newSaida.Categoria,
        newSaida.Dinheiro,
        newSaida.ID_Usuario,
      ]);
  }

  readList(userId) {
    const sql = "SELECT * FROM Saidas WHERE ID_Usuario = ?";
    return this.executeSQL(sql, [userId]);
  }

  read(id) {
    const sql = "SELECT * FROM Saidas WHERE ID = ?";
    return this.executeSQL(sql, [id]);
  }

  update(updateSaida, id) {
    const sql = "UPDATE Saidas SET Data = ?, Descricao = ?, Categoria = ?, Dinheiro = ? WHERE ID = ?";
    return this.executeSQL(sql, [
      updateSaida.Data,
      updateSaida.Descricao,
      updateSaida.Categoria,
      updateSaida.Dinheiro,
      id,
    ]);
  }

  delete(id) {
    const sql = "DELETE FROM Saidas WHERE ID = ?";
    return this.executeSQL(sql, [id]);
  }

}

module.exports = new SaidaModel();
