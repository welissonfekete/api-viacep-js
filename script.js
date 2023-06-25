// Pegando os campos
const end = document.querySelector("#endereco");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const cep = document.querySelector("#cep");

async function pesquisarCep() {
    // montando a url de requisição
    const url = `https://viacep.com.br/ws/${cep.value}/json`;


    if (validarCep(cep.value)) {
        // Realizando requisição no servidor 
        const response = await fetch(url);
        // Convertendo os dados da resposta em um json
        const data = await response.json();

        if (data.hasOwnProperty("erro")) {
            end.value = "Endereço não encontrado!";
        }
        else {
            // Enviando os dados para a função que irá preencher o form
            preencherFormulario(data);
        }

    }
    else {
        end.value = "CEP inválido!";
    }

}

// Função que recebe o endereco e preenche os values
// do formulario
function preencherFormulario(endereco) {
    end.value = endereco.logradouro;
    bairro.value = endereco.bairro;
    cidade.value = endereco.localidade;
    estado.value = endereco.uf;
}

// Função de validação do CEP
function validarCep(cep) {
    if (cep.length == 8 && /^[0-9]+$/.test(cep)) {
        return true;
    }
    else {
        return false;
    }
}


// Criando função de saída do foco no campo
cep.addEventListener("blur", pesquisarCep);
