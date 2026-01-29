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
    `

    }else{

    headerDiv.innerHTML = 
    `
    <header class="header-app">
        <div class="header-container">
            <div class="header-left">
                <img src="/images/favicon1.png" class="logo">
                <h1>Customer Relationship Management</h1>
                <br>
                
                </span>
            </div>
        

            <div class="header-right">
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
        </div>

        <div>
            <span class="Welcome">
                Welcome ${localStorage.getItem("currentUser")}
        </div>

    </header>
`
;

}
}

function loadFooter() {
    const footerDiv = document.getElementById("footer");

    footerDiv.innerHTML = new Date().getFullYear() + ` © all right reserved`
    footerDiv.style.
    text-align; center;
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
function loadProjetos() {}

function loadTarefas() {}


function loadLogin() {}

function loadDetalhes() {}

// mais tarde, completar as seguintes funções
function saveLead() {}

function saveCliente() {}



window.onload = function() {
    loadHeader();
    loadFooter();
}