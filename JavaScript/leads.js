// ficheiro responsável pela gestão de leads (adicionar, listar por estado, editar e remover) com persistência em localStorage

// objeto lead
var lead = {titulo : "", descrição : "", estado : ""};


// Array de leads
let leadsList = new Array();

// opções de estado para as leads

const statusOptions = ["Novo", "Em análise", "Proposta", "Ganho", "Perdido"];


// Função para gerar ID único para cada lead de forma incremental

function gerarID() {
   let ultimoId = Number(localStorage.getItem("ultimoLeadId")) || 0;
    ultimoId++;
    localStorage.setItem("ultimoLeadId", ultimoId);
    return ultimoId;
}

// Função para criar uma lead
function criarLead(titulo, descrição) {
    return{
        id:gerarID(),
        titulo: titulo,
        descrição: descrição,
        estado: statusOptions[0]  // define o status inicial como "Novo"

    }

}

// Função para adicionar uma lead

function adicionarLead() {
    titulo = document.getElementById("leadTitulo").value;
    descrição = document.getElementById("leadDescricao").value;
    const lead = criarLead(titulo, descrição);
    leadsList.push(lead);
    guardarLeads();
    console.log("Lead adicionada:", lead);
    loadLeads();
}


// Função para guardar leads no localStorage

function guardarLeads() {
    localStorage.setItem("leadsList", JSON.stringify(leadsList));
}

function editarLead(id, novosDados) {
    const lead = leadsList.find(l => l.id === id);
    if (!lead) return;

    lead.titulo = novosDados.titulo;
    lead.descricao = novosDados.descricao;

    guardarLeads();
}


function removerLead(id) {
    leadsList = leadsList.filter(l => l.id !== id);
    guardarLeads();
}

function carregarLeads() {
    const dados = JSON.parse(localStorage.getItem("leadsList"));
    if (dados) {
        leadsList = dados;
    }
}

function listarLeads() {
    const listaLeads = document.getElementById("listaLeads");
    listaLeads.innerHTML = ""; // Limpa a lista antes de preencher

    for (let i = 0; i < leadsList.length; i++) {
        listaLeads.innerHTML += `
            <li>
                <strong>${leadsList[i].titulo}</strong>
            </li>
        `;
    }
}










