let nome = prompt("Qual é o seu nome?");
let mensagensDoChat = [];



function mostrarMensagensDoChat(){
    const chat = document.querySelector('ul');
    chat.innerHTML= '';
    for (let i=0; i<mensagensDoChat.length; i++){
        let template = `<li class="message">${mensagensDoChat[i].time} ${mensagensDoChat[i].from} para Todos: ${mensagensDoChat[i].text} </li>`
        chat.innerHTML = chat.innerHTML  + template;
    }

}

function entrarNoChat(){

    let nomeDoUsuario= {
        name: nome,
    }
    let enviarnome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDoUsuario);
    console.log("Foi enviado ao servidor");
    enviarnome.then(nomeRecebido);
    enviarnome.catch(nomeNotRecebido)
}


function nomeRecebido(response){
    console.log("O servidor recebeu o nome")
}

function nomeNotRecebido(response){
    console.log("O servidor não recebeu o nome")
}

function manterConexao(){
    let conexao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeDoUsuario)
}

function adicionarMensagem(){
    let mensagemDigitada = document.querySelector('input').value;
let novaMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemDigitada,
        type: "message",
}

    let mandandomsg = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
    mandandomsg.then(mensagemMandada);
    mandandomsg.catch(mensagemNaoFoi);

}

function mensagemMandada(response){
    console.log("Servidor recebeu a mensagem")

    exibirMensagem()
}

function mensagemNaoFoi(responde){
    console.log("Deu algum erro")
}

function exibirMensagem(){
    let mostrarAsMsgs = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    mostrarAsMsgs.then(mostraElas);
    mostrarAsMsgs.catch(naoVaiMostrar);
}

function mostraElas(resposta){
    console.log(resposta.data);
    var mensagensDoChat = resposta.data;
}

function naoVaiMostrar(resposta){
    console.log("Deu erro")
}


entrarNoChat()
mostrarMensagensDoChat()