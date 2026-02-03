// ficheiro responsável pela gestão de leads (adicionar, listar por estado, editar e remover) com persistência em localStorage

// objeto lead
var lead = {titulo : "", descrição : "", estado : ""};


// Array de leads
let leadsList = new Array();

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








