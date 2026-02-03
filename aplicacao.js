// para apagar mais tarde
console.log("Aplicação iniciada.")

const content = document.getElementById("content");

document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById("loginForm");
    
    if (form) {
        form.addEventListener("submit", login);
    }

});


function loadHeader(page) {
    const headerDiv = document.getElementById("header");
    const currentPage = window.location.pathname;

    if (currentPage.includes("login.html")) {
        
        headerDiv.innerHTML = `
            <header id="header">
                <img src="/images/favicon1.png" class="logo">
                <h1>Customer Relationship Management</h1>

            </header>
        `;

    } else{

        const user = localStorage.getItem("currentUser") || "";
        headerDiv.innerHTML = `
        
            <header class="header-app">
                <div class="header-container">
                    <div class="header-left">
                        <img src="/images/favicon1.png" class="logo">
                        <h1>Customer Relationship Management</h1>
                    </div>
                
                    <div class="header-right">
                        <button class="logout-btn" onclick="logout()">Logout</button>
                    </div>
                </div>

                <div class="header-welcome">
                    <span class="Welcome">Welcome ${user}</span>
                </div>
            </header>
        `;
    }
}

function loadFooter() {
    const footerDiv = document.getElementById("footer");

    footerDiv.innerHTML = new Date().getFullYear() + ` © all right reserved`
    footerDiv.style.textAlign = "left";
}

function loadLeads() {
    content.innerHTML = `
    <h2>Leads</h2>
    <p>Lista de Leads</p>
    `;
}

function loadClientes() {
    content.innerHTML = `
    <h2>Clientes</h2>

    <!-- lista não ordenada de clientes -->
    <ul id="listaClientes"></ul> 

    <button onclick="loadNovoCliente()">Adicionar Cliente</button>
    `;
    
    listarClientes();
}

function loadNovoCliente() {
  content.innerHTML = `
    <h2>Novo Cliente</h2>

    <label>Nome</label>
    <input id="clienteNome" type="text">
    <br>
    <br>

    <label>Email</label>
    <input id="clienteEmail" type="email">
    <br>
    <br>

    <label>Telefone</label>
    <input id="clienteTelefone" type="text">
    <br>
    <br>

    <label>Empresa</label>
    <input id="clienteEmpresa" type="text">
    <br>
    <br>

    <button type="button" onclick="guardarNovoCliente()">Guardar</button>
    <button type="button" onclick="loadClientes()">Cancelar</button>
  `;
}

function login() {
    const username = document.getElementById("username").value;

    localStorage.setItem("currentUser", username);

    console.log("Login efetuado com sucesso.");
    console.log("Username guardado:", username);

    window.location.href = "dashboard.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    console.log("Logout efetuado com sucesso.");
    window.location.href = "login.html";
}


// as 2 funções seguintes serão terminadas em projetos futuros
function loadProjetos() {
    content.innerHTML = `
    <h2>Projetos</h2>
    <p>Funcionalidade futura</p>
    `;
}

function loadTarefas() {
    content.innerHTML = `
    <h2>Tarefas</h2>
    <p>Funcionalidade futura</p>
    `;
}


function loadLogin() {}

function loadDetalhes() {}

// mais tarde, completar as seguintes funções
function saveLead() {}

function saveCliente() {}



window.onload = function() {
    loadHeader();
    loadFooter();

    // carrega clientes do localStorage
    // fallback - adicionado "|| []" - se não existir nenhum cliente devolve array vazio
    clienteList = JSON.parse(localStorage.getItem("clientes") || "[]");
}