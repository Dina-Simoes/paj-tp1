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

// Função para editar uma lead

function editarLead(id, novosDados) {
    const lead = leadsList.find(l => l.id === id);
    if (!lead) return;

    lead.titulo = novosDados.titulo;
    lead.descricao = novosDados.descricao;

    guardarLeads();
}

// Função para mostrar detalhes de uma lead

function mostrarDetalhesLead(id) {
    const lead = leadsList.find(l => l.id === id);

    if (!lead) {
        content.innerHTML = "<p>Lead não encontrada</p>";
        return;
    }

    content.innerHTML = `
        <h2>Detalhes da Lead</h2>

        <p><strong>ID:</strong> ${lead.id}</p>
        <p><strong>Título:</strong> ${lead.titulo}</p>
        <p><strong>Descrição:</strong> ${lead.descrição}</p>
        <p><strong>Estado:</strong> ${lead.estado}</p>

        <button onclick="loadLeads()">Voltar</button>
    `;
}

// Função para listar as leads

function listarLeads() {
    const listaLeads = document.getElementById("listaLeads");
    listaLeads.innerHTML = ""; // limpa antes de preencher

    for (let i = 0; i < leadsList.length; i++) {
        listaLeads.innerHTML += `
            <div class="lead-item">
                <button onclick="abrirDetalhesLead(${leadsList[i].id})">
                    <strong>${leadsList[i].titulo}</strong>
                </button>
            </div>
        `;
    }
}



// Função para abrir os detalhes de um Lead na página de detalhes

function abrirDetalhesLead(id) {
    window.location.href="detalhesLeads.html?id="+id;
    
    
}

// Função para remover uma lead

function removerLead(id) {
    leadsList = leadsList.filter(l => l.id !== id);
    guardarLeads();
}

// Função para carregar leads do localStorage

function carregarLeads() {
    const dados = getLeads();
    if (dados) {
        leadsList = dados;
    }
}

function getLeads(){
    return JSON.parse(localStorage.getItem("leadsList"));
}


function init(){

    const id = getQueryParam("id");

    console.log(id);
    console.log(getLeads());

    const lead = getLeads().find(l => l.id == id);

    const content = document.getElementById("content");

    if (!lead) {
        alert("Lead não encontrada");
        return;
    }

    content.innerHTML = `
        <h2>Detalhes da Lead</h2>
        <p><strong>Título:</strong> ${lead.titulo}</p>
        <p><strong>Descrição:</strong> ${lead.descrição}</p>
        <p><strong>Estado:</strong> ${lead.estado}</p>
        <br>
        <button type="button" onclick="editarLead(id,novosdados)"><img src="/imagens/editar.jpg" alt="icon" class="icon">Editar</button>
        <button type="button" onclick="removerLead(id)"><img src="/imagens/remover.jpg" alt="icon" class="icon">Remover</button>
        <button onclick="window.location.href='dashboard.html#leads'"><img src="/imagens/voltar.jpg" alt="icon" class="icon">Voltar</button>
    `;

}

function getQueryParam(name, url = window.location.href) {
  const params = new URL(url).searchParams;
  return params.has(name) ? params.get(name) : null;
}















