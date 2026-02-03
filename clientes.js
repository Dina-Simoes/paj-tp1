// ficheiro responsável pela gestão de clientes (adicionar, editar e remover) com persistência em localStorage
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
    localStorage.setItem("clientes", JSON.stringify(clienteList));

    console.log("Cliente adicionado:", novoCliente);
}

function guardarNovoCliente() {
    console.log("1) cliquei Guardar");

    const nome = document.getElementById("clienteNome").value;
    const email = document.getElementById("clienteEmail").value;
    const telefone = document.getElementById("clienteTelefone").value;
    const empresa = document.getElementById("clienteEmpresa").value;

    console.log("2) dados lidos:", nome, email, telefone, empresa);

    adicionarCliente(nome, email, telefone, empresa);
    console.log("3) depois de adicionarCliente");

    loadClientes();
    console.log("4) depois de loadClientes");
}



// Função para listar todos os clientes

function listarClientes() {

    var listaClientes = document.getElementById("listaClientes");
    listaClientes.innerHTML = ""; // Limpa a lista antes de adicionar novos elementos

    // // ordena os clientes por ordem alfabetica
    // // localeCompare compara strings, sort - ordena
    // clienteList.sort(function(a, b) {
    //     return a.nome.localeCompare(b.nome);
    // });

    for (var i = 0; i < clienteList.length; i++) {

        listaClientes.innerHTML += `
        <li>
            <strong>Nome:</strong> ${clienteList[i].nome} <br>
            <strong>Email:</strong> ${clienteList[i].email} <br>
            <strong>Telefone:</strong> ${clienteList[i].telefone} <br>
            <strong>Empresa:</strong> ${clienteList[i].empresa} <br>
        </li>
        `;
    }
}
