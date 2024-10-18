const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

class Authenticate {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  }

  async registerUser(newUser) {
    const { Nome, Email, Senha } = newUser;

    if (!this.validateEmail(Email)) {
      throw new Error("E-mail inválido");
    }

    if (!this.validatePassword(Senha)) {
      throw new Error(
        "A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
      );
    }

    const hashedPassword = await bcrypt.hash(Senha, 10);

    return UserModel.create({ Nome, Email, Senha: hashedPassword });
  }

  async authenticateUser(email, password) {
    if (!this.validateEmail(email)) {
      throw new Error("E-mail inválido");
    }

    const users = await UserModel.readList();
    const user = users.find((u) => u.Email === email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.Senha);

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    const { Senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new Authenticate();
