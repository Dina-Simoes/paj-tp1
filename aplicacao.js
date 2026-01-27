// para apagar mais tarde
console.log("Aplicação iniciada.")

const content = document.getElementById("content");

function loadHeader() {
    const headerDiv = document.getElementById("header");

    headerDiv.innerHTML = `
    <header>
        <h1>Customer relationship Management</h1>
        <p>Utilizador: nome</p>


    </header>
    `
}

function loadFooter() {
    const footerDiv = document.getElementById("footer");

    footerDiv.innerHTML = `
    <p>@2026 all right reserved</p>
    `
}

function loadLeads() {
    content.innerHTML = `
    <h2>Leads</h2>
    <p>Lista de Leads</p>
    `
}

function loadClientes() {
    content.innerHTML = `
    <h2>Clientes</h2>
    <p>Lista de Clientes</p>
    `
}

// as 2 funções seguintes serão terminadas em projetos futuros
function loadProjetos() {}

function loadTarefas() {}


function loadLogin() {}

function loadDetalhes() {}

// mais tarde, completar as seguintes funções
function saveLead() {}

function saveCliente() {}