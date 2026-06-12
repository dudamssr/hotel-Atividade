const API = "http://localhost:3000";

const quartos = [];
let quartoAtual = null;


const modalQuarto = document.getElementById("modalQuarto");
const modalReservas = document.getElementById("modalReservas");
const modalReserva = document.getElementById("modalReserva");


const inputNumero = document.getElementById("numero");
const inputTipo = document.getElementById("tipo");

const inputHospede = document.getElementById("hospede");
const inputDataEntrada = document.getElementById("dataEntrada");
const inputDataSaida = document.getElementById("dataSaida");


const listaReservas = document.getElementById("listaReservas");
const tituloQuarto = document.getElementById("tituloQuarto");
const infoQuarto = document.getElementById("infoQuarto");

carregarQuartos();

function carregarQuartos() {

    fetch(API + "/quartos/listar")
        .then(res => res.json())
        .then(data => {

            quartos.length = 0;
            quartos.push(...data);

            listarQuartos();
        })
        .catch(() => alert("Erro ao conectar com API"));
}

function listarQuartos() {

    const container = document.querySelector("main");
    container.innerHTML = "";

    quartos.forEach(quarto => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>Quarto ${quarto.numero}</h3>
            <p><b>Tipo:</b> ${quarto.tipo}</p>

            <div class="botoes">

                <button class="btnReservas"
                    onclick="abrirReservas(${quarto.id})">
                    Ver Reservas
                </button>

                <button class="btnExcluir"
                    onclick="excluirQuarto(${quarto.id})">
                    Excluir
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


document.getElementById("formQuarto")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const novoQuarto = {
        numero: inputNumero.value,
        tipo: inputTipo.value
    };

    try {

        const res = await fetch(API + "/quartos/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoQuarto)
        });

        if (!res.ok) {
            const erro = await res.json();
            alert(erro.erro || "Erro ao cadastrar");
            return;
        }

        alert("Quarto cadastrado!");

        formQuarto.reset();
        modalQuarto.classList.add("oculto");

        carregarQuartos();

    } catch (err) {
        alert("Erro na conexão");
    }
});


function excluirQuarto(id) {

    if (!confirm("Deseja excluir este quarto?")) return;

    fetch(API + "/quartos/excluir/" + id, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error();
        alert("Quarto excluído!");
        carregarQuartos();
    })
    .catch(() => alert("Erro ao excluir quarto"));
}


function abrirReservas(id) {

    fetch(API + "/quartos/buscar/" + id)
        .then(res => res.json())
        .then(quarto => {

            quartoAtual = quarto;

            tituloQuarto.innerHTML = "Quarto " + quarto.numero;
            infoQuarto.innerHTML = "Tipo: " + quarto.tipo;

            listarReservas(quarto.reservas || []);

            modalReservas.classList.remove("oculto");

        })
        .catch(() => alert("Erro ao carregar reservas"));
}

function listarReservas(reservas) {

    listaReservas.innerHTML = "";

    reservas.forEach(reserva => {

        listaReservas.innerHTML += `
            <tr>
                <td>${reserva.id}</td>
                <td>${reserva.hospede}</td>
                <td>${new Date(reserva.dataEntrada).toLocaleDateString("pt-BR")}</td>
                <td>${new Date(reserva.dataSaida).toLocaleDateString("pt-BR")}</td>

                <td>
                    <button class="btnExcluir"
                        onclick="excluirReserva(${reserva.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}


function abrirCadastroReserva() {
    modalReserva.classList.remove("oculto");
}

document.getElementById("formReserva")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const novaReserva = {
        hospede: inputHospede.value,
        dataEntrada: inputDataEntrada.value,
        dataSaida: inputDataSaida.value,
        quartoId: quartoAtual.id
    };

    try {

        const res = await fetch(API + "/reservas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaReserva)
        });

        if (!res.ok) throw new Error();

        alert("Reserva cadastrada!");

        formReserva.reset();
        modalReserva.classList.add("oculto");

        abrirReservas(quartoAtual.id);

    } catch (err) {
        alert("Erro ao cadastrar reserva");
    }
});

function excluirReserva(id) {

    if (!confirm("Deseja excluir esta reserva?")) return;

    fetch(API + "/reservas/excluir/" + id, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error();
        alert("Reserva excluída!");
        abrirReservas(quartoAtual.id);
    })
    .catch(() => alert("Erro ao excluir reserva"));
}
