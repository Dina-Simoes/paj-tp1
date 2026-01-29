// objeto cliente

var cliente = {name : "", Email : "", telefone : "", empresa : ""};


// Array de clientes
let clienteList = new Array();

window.onload = function() {
    clienteList = JSON.parse(localStorage.getItem("clientes"));
    

}

// Função para adicionar um cliente
function adicionarCliente(name, Email, telefone, empresa) {
    var novoCliente = Object.create(cliente);
    novoCliente.name = name;
    novoCliente.Email = Email;
    novoCliente.telefone = telefone;
    novoCliente.empresa = empresa;
    clientes.push(novoCliente);
    console.log("Cliente adicionado:", novoCliente);
}

// Função para listar todos os clientes
function listarClientes() {
    for (var i = 0; i < clientes.length; i++) {
        
    }
}
