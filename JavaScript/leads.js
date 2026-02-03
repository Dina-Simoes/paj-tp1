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
    const lead = criarLead(titulo, descrição);
    leadsList.push(lead);
    guardarLeads();
    
    console.log("Lead adicionada:", lead);

}


// Função para guardar leads no localStorage

function guardarLeads() {
    localStorage.setItem("leads", JSON.stringify(leadsList));
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
    const dados = JSON.parse(localStorage.getItem("leads"));
    if (dados) {
        leadsList = dados;
    }
}

function listarLeads() {
    const listaLeads = document.getElementById("listaLeads");
    listaLeads.innerHTML = ""; // Limpa a lista antes de adicionar novos elementos  
    for (let i = 0; i < leadsList.length; i++) {
        const lead = leadsList[i];
        listaLeads.innerHTML += `
            <li>
                <strong>${lead.titulo}</strong> - ${lead.descrição} [${lead.estado}]
                <button onclick="editarLead(${lead.id}, {titulo: 'Novo Título', descricao: 'Nova Descrição'})">Editar</button>
                <button onclick="removerLead(${lead.id})">Remover</button>
            </li>
        `;
    }
}










