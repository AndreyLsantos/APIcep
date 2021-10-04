'use strict';

const limparInputs = (endereco)=>{
    document.querySelector('.estado').value = '';
    document.querySelector('.cidade').value = '';
}
const preencherInputs = (endereco)=>{
    document.querySelector('.estado').value = endereco.uf;
    document.querySelector('.cidade').value = endereco.localidade;
}

const numeroC = (numero) => /^[0-9]+$/.test(numero);
const validCep = (cep) => cep.length == 8 && numeroC(cep);


const consultarCep = async()=>{
    limparInputs();
    const cep = document.querySelector('.cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if(validCep(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
            if(endereco.hasOwnProperty('erro')){
               const msgError = document.querySelector('.msg');
               msgError.classList.add('msgError')
               msgError.innerHTML = 
               `               
               <p>CEP não encontrado</p>
               `;
            }else{
                preencherInputs(endereco);
            }
    }else{
            const msgError = document.querySelector('.msg');
            msgError.classList.add('msgError');
            msgError.innerHTML = 
            `               
            <p>CEP não encontrado</p>
            `;
    }
}

document.querySelector('.cep').addEventListener('focusout', consultarCep);


