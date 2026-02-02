// ficheiro responsável pela gestão de clientes (adicionar, editar e remover) com persistência em localStorage
// objeto cliente

var cliente = {nome : "", email : "", telefone : "", empresa : ""};


// Array de clientes
let clienteList = new Array();

window.onload = function() {
    // fallback - adicionado "|| []" - se não existir nenhum cliente devolve array vazio
    clienteList = JSON.parse(localStorage.getItem("clientes") || "[]");
    
    

}

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
  const name = document.getElementById("clienteNome").value;
  const email = document.getElementById("clienteEmail").value;
  const telefone = document.getElementById("clienteTelefone").value;
  const empresa = document.getElementById("clienteEmpresa").value;

  adicionarCliente(name, email, telefone, empresa);
  loadClientes();
}



// Função para listar todos os clientes

function listarClientes() {

    var listaClientes = document.getElementById("listaClientes");
    listaClientes.innerHTML = ""; // Limpa a lista antes de adicionar novos elementos

    // // ordena os clientes por ordem alfabetica
    // // localeCompare compara strings, sort - ordena
    // clienteList.sort(function(a, b) {
    //     return a.name.localeCompare(b.name);
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
