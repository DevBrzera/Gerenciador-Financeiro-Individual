import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./login/authContext";
import "../styles/home.css";

export default function Home() {
  const { user } = useAuth();
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [novaEntrada, setNovaEntrada] = useState({
    Data: "",
    Descricao: "",
    Categoria: "",
    Dinheiro: "",
  });
  const [novaSaida, setNovaSaida] = useState({
    Data: "",
    Descricao: "",
    Categoria: "",
    Dinheiro: "",
  });
  const [saldo, setSaldo] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("entrada");

  useEffect(() => {
    async function fetchEntradasSaidas() {
      if (!user) return;

      try {
        const entradasResponse = await axios.get(
          `http://localhost:3000/entradas/${user.ID}`
        );
        const entradasData = entradasResponse.data;
        setEntradas(entradasData);

        const saidasResponse = await axios.get(
          `http://localhost:3000/saidas/${user.ID}`
        );
        const saidasData = saidasResponse.data;
        setSaidas(saidasData);

        const saldoEntradas = entradasData.reduce(
          (acc, entrada) => acc + parseFloat(entrada.Dinheiro),
          0
        );
        const saldoSaidas = saidasData.reduce(
          (acc, saida) => acc + parseFloat(saida.Dinheiro),
          0
        );
        setSaldo(saldoEntradas - saldoSaidas);
      } catch (error) {
        console.error("Erro ao buscar entradas e saídas:", error);
      }
    }

    fetchEntradasSaidas();
  }, [user]);

  const handleSubmitEntrada = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/entradas/${user.ID}/create`, {
        ...novaEntrada,
      });
      setNovaEntrada({ Data: "", Descricao: "", Categoria: "", Dinheiro: "" });
      const response = await axios.get(
        `http://localhost:3000/entradas/${user.ID}`
      );
      const entradasData = response.data;
      setEntradas(entradasData);
      const saldoAtual = entradasData.reduce(
        (acc, entrada) => acc + parseFloat(entrada.Dinheiro),
        0
      );
      const saldoSaidas = saidas.reduce(
        (acc, saida) => acc + parseFloat(saida.Dinheiro),
        0
      );
      setSaldo(saldoAtual - saldoSaidas);
    } catch (error) {
      console.error("Erro ao criar entrada:", error);
    }
    setShowModal(false);
  };

  const handleSubmitSaida = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/saidas/${user.ID}/create`, {
        ...novaSaida,
      });
      setNovaSaida({ Data: "", Descricao: "", Categoria: "", Dinheiro: "" }); 
      const response = await axios.get(
        `http://localhost:3000/saidas/${user.ID}`
      );
      const saidasData = response.data;
      setSaidas(saidasData);
      const saldoEntradas = entradas.reduce(
        (acc, entrada) => acc + parseFloat(entrada.Dinheiro),
        0
      );
      const saldoSaidas = saidasData.reduce(
        (acc, saida) => acc + parseFloat(saida.Dinheiro),
        0
      );
      setSaldo(saldoEntradas - saldoSaidas);
    } catch (error) {
      console.error("Erro ao criar saída:", error);
    }
    setShowModal(false);
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="home-container">
      <div className="home-title">
        <h1>Sistema Financeiro Pessoal</h1>
      </div>
      <div className="saldo-title">
        <h2 className="money-context">
          Saldo Atual:
          <p style={{ color: saldo < 0 ? "red" : "white" }}>
            R$ {saldo.toFixed(2)}
          </p>
        </h2>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalType === "entrada" ? (
              <form className="form-create" onSubmit={handleSubmitEntrada}>
                <h3>Cadastrar Entrada</h3>
                <input
                  type="date"
                  value={novaEntrada.Data}
                  onChange={(e) =>
                    setNovaEntrada({ ...novaEntrada, Data: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={novaEntrada.Descricao}
                  onChange={(e) =>
                    setNovaEntrada({
                      ...novaEntrada,
                      Descricao: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  value={novaEntrada.Categoria}
                  onChange={(e) =>
                    setNovaEntrada({
                      ...novaEntrada,
                      Categoria: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={novaEntrada.Dinheiro}
                  onChange={(e) =>
                    setNovaEntrada({ ...novaEntrada, Dinheiro: e.target.value })
                  }
                  required
                />
                <button type="submit">Cadastrar Entrada</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </form>
            ) : (
              <form className="form-create" onSubmit={handleSubmitSaida}>
                <h3>Cadastrar Saída</h3>
                <input
                  type="date"
                  value={novaSaida.Data}
                  onChange={(e) =>
                    setNovaSaida({ ...novaSaida, Data: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={novaSaida.Descricao}
                  onChange={(e) =>
                    setNovaSaida({
                      ...novaSaida,
                      Descricao: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  value={novaSaida.Categoria}
                  onChange={(e) =>
                    setNovaSaida({
                      ...novaSaida,
                      Categoria: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={novaSaida.Dinheiro}
                  onChange={(e) =>
                    setNovaSaida({ ...novaSaida, Dinheiro: e.target.value })
                  }
                  required
                />
                <button type="submit">Cadastrar Saída</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Lista de entradas */}
      <div className="table-container">
        <div className="entrada-container">
          <h3>Entradas</h3>
          <table className="entradas-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((entrada) => (
                <tr key={entrada.ID}>
                  <td>{new Date(entrada.Data).toLocaleDateString("pt-BR")}</td>
                  <td>{entrada.Descricao}</td>
                  <td>{entrada.Categoria}</td>
                  <td>
                    {entrada.Dinheiro.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="button-create-entrada" onClick={() => openModal("entrada")}>Cadastrar Entrada</button>
        </div>

        {/* Lista de saídas */}
        <div className="saida-container">
          <h3>Saídas</h3>
          <table className="saidas-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {saidas.map((saida) => (
                <tr key={saida.ID}>
                  <td>{new Date(saida.Data).toLocaleDateString("pt-BR")}</td>
                  <td>{saida.Descricao}</td>
                  <td>{saida.Categoria}</td>
                  <td>
                    {saida.Dinheiro.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="button-create-saida" onClick={() => openModal("saida")}>Cadastrar Saída</button>
        </div>
      </div>
    </div>
  );
}
