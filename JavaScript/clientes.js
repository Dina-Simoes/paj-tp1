// ficheiro responsável pela gestão de clientes (adicionar, listar, editar e remover) com persistência em localStorage

// objeto cliente
var cliente = {nome : "", email : "", telefone : "", empresa : ""};


// Array de clientes
let clienteList = new Array();


// Função para adicionar um cliente
function adicionarCliente(nome, email, telefone, empresa) {
    var novoCliente = Object.create(cliente);
    novoCliente.nome = nome;
    novoCliente.email = email;
    novoCliente.telefone = telefone;
    novoCliente.empresa = empresa;
    clienteList.push(novoCliente); 

    // guarda no localStorage
    // ordena os clientes por ordem alfabetica
    // localeCompare compara strings, sort - ordena, neste caso por ordem alfabetica
    clienteList.sort(function(a, b) {
        return a.nome.localeCompare(b.nome);
    });
    localStorage.setItem("clientes", JSON.stringify(clienteList));

    console.log("Cliente adicionado:", novoCliente);
}

function guardarCliente(index = null) {

    const nome = document.getElementById("clienteNome").value;
    const email = document.getElementById("clienteEmail").value;
    const telefone = document.getElementById("clienteTelefone").value;
    const empresa = document.getElementById("clienteEmpresa").value;

    // verifica se os campos obrigatórios estão preenchidos: nome empresa e pelo menos um contacto (email ou telefone)
    // trim() remove espaços em branco no início e no fim da string, ex: quando o utilizador insere apenas espaços
    if (nome.trim() === "" || empresa.trim() === "" || (email.trim() === "" && telefone.trim() === "")) {
        alert("Por favor, preencha os campos obrigatórios: Nome, Empresa e pelo menos um contacto (Email ou Telefone).");
        return; // 
    }

    // se o index for null => o cliente ainda não existe, é um novo cliente
    if (index === null) {
    adicionarCliente(nome, email, telefone, empresa);
    console.log("Lista de clientes após adição:", clienteList);

    } else {
    // editar cliente já existente
    clienteList[index].nome = nome;
    clienteList[index].email = email;
    clienteList[index].telefone = telefone;
    clienteList[index].empresa = empresa;

    // atualiza no localStorage: setItem()
    localStorage.setItem("clientes", JSON.stringify(clienteList));

    console.log("Cliente editado:", clienteList[index]);
    }

    loadClientes();
    window.location.href="dashboard.html#clientes"
}


// Função para listar todos os clientes
function mostrarDetalhesCliente() {
    
    // carregar lista do localStorage
    clienteList = JSON.parse(localStorage.getItem("clientes") || "[]");

    const index = parseInt(localStorage.getItem("clienteSelecionado"), 10);
    const detalhesDiv = document.getElementById("detalhesContent");

    if (!detalhesDiv) return;

   
    const c = clienteList[index];

    detalhesDiv.innerHTML = `

        <p><strong>Nome:</strong> ${c.nome}</p>
        <p><strong>Email:</strong> ${c.email}</p>
        <p><strong>Telefone:</strong> ${c.telefone}</p> 
        <p><strong>Empresa:</strong> ${c.empresa}</p> 
        
        <br>

        <button class="btn" type="button" onclick="editarCliente(${index})"><img src="/imagens/editar.jpg" alt="icon" class="icon">Editar</button>
        <button class="btn" type="button" onclick="removerCliente(${index})"><img src="/imagens/remover.jpg" alt="icon" class="icon">Remover</button>
        <button class="btn" onclick="window.location.href='dashboard.html#clientes'"><img src="/imagens/voltar.jpg" alt="icon" class="icon">Voltar</button>

    
    `;
    
}

function listarClientes() {
    
    var listaClientes = document.getElementById("listaClientes");
    listaClientes.innerHTML = ""; // Limpa a lista antes de adicionar novos elementos


    for (var i = 0; i < clienteList.length; i++) {

        listaClientes.innerHTML += `
            <li class="cliente-item">

                <button class = "cliente-item-btn" type="button" onclick="abrirDetalhesCliente(${i})"><strong>${clienteList[i].nome}</strong></button>

            </li>
            `;
    }

    console.log("Lista de clientes após ordenação:", clienteList);
}


function abrirDetalhesCliente(index) {
  localStorage.setItem("clienteSelecionado", index);
  window.location.href = "detalhes.html";
}


// Função para remover um cliente
function removerCliente(index) {
    if (confirm("Tem a certeza que deseja remover este cliente?")) {

        clienteList.splice(index, 1); // Remove o cliente do array  

        localStorage.setItem("clientes", JSON.stringify(clienteList)); // Atualiza o localStorage

// ====== >>>>>      confirmar remoção
        console.log("Cliente removido:", clienteList[index]); 

        listarClientes(); // Atualiza a lista de clientes
    }

}

// Função para editar um cliente
function editarCliente(index) {
    const cliente = clienteList[index];
    content.innerHTML = `

    <h2>Editar Cliente</h2> 
    
    <label>Nome</label>
    <input id="clienteNome" type="text" value="${cliente.nome}">
    <br><br>    

    <label>Email</label>
    <input id="clienteEmail" type="email" value="${cliente.email}">
    <br><br>

    <label>Telefone</label>
    <input id="clienteTelefone" type="text" value="${cliente.telefone}">
    <br><br>

    <label>Empresa</label>
    <input id="clienteEmpresa" type="text" value="${cliente.empresa}">
    <br><br>

    <button class="btn" type="button" onclick="guardarCliente(${index})"><img src="/imagens/guardar.jpg" alt="icon" class="icon">Guardar</button>
    <button class="btn" onclick="window.location.href='dashboard.html#clientes'"><img src="/imagens/cancelar.jpg" alt="icon" class="icon">Cancelar</button>
    `;
}
           

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("detalhesContent")) {
        mostrarDetalhesCliente();
    }
});

function carregarClientes() {
    const dados = JSON.parse(localStorage.getItem("clientes"));
    if (dados) {
        clienteList = dados;
    }
}

