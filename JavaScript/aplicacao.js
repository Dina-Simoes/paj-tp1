// aplicacao.js - ficheiro principal da aplicação

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
                <img src="/imagens/favicon1.png" class="logo">
                <h1>Customer Relationship Management</h1>

            </header>
        `;

    } else{

        const user = localStorage.getItem("currentUser") || "";
        headerDiv.innerHTML = `
        
            <header class="header-app">
                <div class="header-container">
                    <div class="header-left">
                        <img src="/imagens/favicon1.png" class="logo">
                        <h1>Customer Relationship Management</h1>
                    </div>
                
                    <div class="header-right">
                        <button class="btn" onclick="logout()"><img src="/imagens/logout.jpg" alt="icon" class="icon">Logout</button>
                    </div>
                </div>

                <div class="header-welcome">
                    <strong><span class="Welcome">Bem-vindo ${user}</span></strong>
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

// Funções para carregar as Leads

function loadLeads() {
    content.innerHTML = `
    <h2>Leads</h2>
    <br>
    <label for="filtroEstado">Filtrar por estado:</label>
    <select id="filtroEstado">
    <option value="">Todos</option>
    </select>

    <ul id="listaLeads"></ul>
    <br>
    <button class="btn" type="button" onclick="loadNovoLead()"><img src="/imagens/adicionar.jpg" alt="icon" class="icon">Adicionar Lead</button>
    `;

    preencherFiltroEstados();
    listarLeads();

    const filtro = document.getElementById("filtroEstado");
    filtro.addEventListener("change", () => {
        const estadoSelecionado = filtro.value;

        if (estadoSelecionado === "") {
            listarLeads();
        } else {
            listarLeadsPorEstado(estadoSelecionado);
        }
    });
    
}

function loadNovoLead() {
    content.innerHTML = `
    <h2>Nova Lead</h2>

    <label>Título</label>
    <input id="leadTitulo" type="text" required>
    <br><br>

    <label>Descrição</label>
    <textarea id="leadDescricao" required></textarea>
    <br><br>

    <button id="btnGuardarLead" class="btn" disabled type="button" onclick="adicionarLead()"><img src="/imagens/guardar.jpg" alt="icon" class="icon">Guardar</button>

    <button class="btn" type="button" onclick="loadLeads()"><img src="/imagens/cancelar.jpg" alt="icon" class="icon">Cancelar</button>

    `;
    // Ativa a função para validar os campos de título e descrição e desativar o botão Guardar enquanto os campos não estão preenchidos
    ativarValidacaoNovaLead();
}

// Funções para carregar os Clientes

function loadClientes() {
    content.innerHTML = `
    <h2>Clientes</h2>
    <br>
    <!-- lista não ordenada de clientes -->
    <ul id="listaClientes"></ul> 
    <br>
    <button class="btn" type="button"onclick="loadNovoCliente()"><img src="/imagens/adicionar.jpg" alt="icon" class="icon">Adicionar Cliente</button>
    `;
    
    listarClientes();
}

function loadNovoCliente() {
  content.innerHTML = `
    <h2>Novo Cliente</h2>

    <!-- required indica que o campo é obrigatório (em Nome e Empresa) -->
    <label>Nome</label>
    <input id="clienteNome" type="text" required>
    <br><br>

    <label>Email</label>
    <input id="clienteEmail" type="email">
    <br><br>

    <label>Telefone</label>
    <input id="clienteTelefone" type="text">
    <br><br>

    <label>Empresa</label>
    <input id="clienteEmpresa" type="text" required>
    <br><br>

    <!-- O botão Guardar só é ativado quando os campos obrigatórios estão preenchidos, por defeito está disabled -->
    <button id="btnGuardarCliente" class="btn" disabled type="button" onclick="guardarCliente()"><img src="/imagens/guardar.jpg" alt="icon" class="icon">Guardar</button>

    <button class="btn" type="button" onclick="loadClientes()"><img src="/imagens/remover.jpg" alt="icon" class="icon">Cancelar</button>
  `;

  ativarValidacaoNovoCliente();

}

// Funções de login e logout

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


// as funções seguintes serão terminadas em projetos futuros
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

function loadDashboardHome() {
    content.innerHTML = `
        <section class="dashboard-home">
            <h2>Bem-vindo ao CRM</h2>
            <p>Seleciona uma opção no menu lateral para começar.</p>
        </section>
    `;
}

// Função para inicializar a aplicação

window.onload = function() {
    loadHeader();
    loadFooter();
    carregarClientes();
    carregarLeads();

    if (window.location.pathname.includes("dashboard")) {
    loadDashboardHome();
    }
    
}


