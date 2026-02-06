// ficheiro responsável pela gestão de leads (adicionar, listar por estado, editar e remover) com persistência em localStorage

// objeto lead
var lead = {titulo : "", descricao : "", estado : ""};


// Array de leads
let leadsList = new Array();

// opções de estado para as leads

const statusOptions = [ "Novo","Em análise","Proposta","Ganho","Perdido"];


// Função para gerar ID único para cada lead de forma incremental

function gerarID() {
   let ultimoId = Number(localStorage.getItem("ultimoLeadId")) || 0;
    ultimoId++;
    localStorage.setItem("ultimoLeadId", ultimoId);
    return ultimoId;
}

// Função para criar uma lead
function criarLead(titulo, descricao) {
    return{
        id:gerarID(),
        titulo: titulo,
        descricao: descricao,
        estado: statusOptions[0]  // define o status inicial como "Novo"

    }

}

// Função para adicionar uma lead

function adicionarLead() {
    titulo = document.getElementById("leadTitulo").value;
    descricao = document.getElementById("leadDescricao").value;
    const lead = criarLead(titulo, descricao);
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

function guardarEdicao(id) {
    const lead = leadsList.find(l => l.id == id);
    if (!lead) return;

    lead.titulo = document.getElementById("editTitulo").value;
    lead.descricao = document.getElementById("editDescricao").value;
    lead.estado = document.getElementById("editEstado").value;

    guardarLeads();

    alert("Lead atualizada com sucesso");
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

// Função para preencher preencher os filtros com as opções disponivéis

function preencherFiltroEstados() {
    const select = document.getElementById("filtroEstado");
    select.innerHTML = `<option value="">Todos</option>`;

    statusOptions.forEach(estado => {
        select.innerHTML += `<option value="${estado}">${estado}</option>`;
    });
}

// Função para listar as leads por estado

function listarLeadsPorEstado(estado) {
    const listaLeads = document.getElementById("listaLeads");
    listaLeads.innerHTML = "";

    const filtradas = leadsList.filter(l => l.estado === estado);

    if (filtradas.length === 0) {
        listaLeads.innerHTML = "<p>Sem leads neste estado</p>";
        return;
    }

    filtradas.forEach(lead => {
        listaLeads.innerHTML += `
            <div class="lead-item">
                <button onclick="abrirDetalhesLead(${lead.id})">
                    <strong>${lead.titulo}</strong>
                </button>
            </div>
        `;
    });
}




// Função para listar as leads

function listarLeads() {
     const listaLeads = document.getElementById("listaLeads");
    listaLeads.innerHTML = "";

    // criar cópia para não mexer no array original
    const leadsOrdenadas = [...leadsList].sort((a, b) => {
        return statusOptions.indexOf(a.estado) - statusOptions.indexOf(b.estado);
    });

    leadsOrdenadas.forEach(lead => {
        listaLeads.innerHTML += `
            <div class="lead-item">
        <button class="lead-btn" onclick="abrirDetalhesLead(${lead.id})">
            <span class="lead-titulo">${lead.titulo}</span>
            <span class="lead-estado">Estado: ${lead.estado}</span>
        </button>
            </div>
        `;
    });

}





// Função para abrir os detalhes de um Lead na página de detalhes

function abrirDetalhesLead(id) {
    window.location.href="detalhesLeads.html?id="+id;    
}

// Função para remover uma lead

function removerLead(id) {
    if (!confirm("Tem a certeza que deseja remover esta lead?")) return;

    leadsList = leadsList.filter(l => l.id != id);
    guardarLeads();

    window.location.href = "dashboard.html#leads";
}

// Função para carregar leads do localStorage

function carregarLeads() {
    const dados = getLeads();
    if (dados) {
        leadsList = dados;
        
    }

}

// Função para extrair as Leads da local storage

function getLeads(){
    return JSON.parse(localStorage.getItem("leadsList"));
}



function init(){

    carregarLeads();

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

    <label>Título</label><br>
    <input type="text" id="editTitulo" value="${lead.titulo}"><br><br>

    <label>Descrição</label><br>
    <textarea id="editDescricao">${lead.descricao}</textarea><br><br>

    <label>Estado</label><br>
    <select id="editEstado">
        ${statusOptions.map(s =>
            `<option value="${s}" ${s === lead.estado ? "selected" : ""}>${s}</option>`
        ).join("")}
    </select>

    <br><br>

    <button onclick="guardarEdicao(${lead.id})"><img src="/imagens/editar.jpg" alt="icon" class="icon">Guardar</button>
    <button onclick="removerLead(${lead.id})"><img src="/imagens/remover.jpg" alt="icon" class="icon">Remover</button>
    <button onclick="window.location.href='dashboard.html#leads'"><img src="/imagens/voltar.jpg" alt="icon" class="icon">Voltar</button>
    `
}

function getQueryParam(name, url = window.location.href) {
  const params = new URL(url).searchParams;
  return params.has(name) ? params.get(name) : null;
}

















