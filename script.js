let nome = prompt("Qual é o seu nome?");
let mensagensDoChat = [];
let nomeDoUsuario = {
    name: nome
}
const chat = document.querySelector('ul');


function mostrarMensagensDoChat() {
    exibirMensagem() 
    console.log("templatando as mensagens")
    chat.innerHTML = '';
    for (let i = 0; i < mensagensDoChat.length; i++) {
        if (mensagensDoChat[i].type === "status") {
            let template = `<li class="status" data-test="message"><span class="tempo"> (${
                mensagensDoChat[i].time
            }) </span> <span class="nome">&nbsp${
                mensagensDoChat[i].from
            }&nbsp</span> ${
                mensagensDoChat[i].text
            } </li>`
            chat.innerHTML = chat.innerHTML + template;
        } else {
            let template = `<li class="message" data-test="message"><span class="tempo"> (${
                mensagensDoChat[i].time
            })</span> <span class="nome">&nbsp${
                mensagensDoChat[i].from
            }&nbsp</span> para Todos: ${
                mensagensDoChat[i].text
            } </li>`
            chat.innerHTML = chat.innerHTML + template;
        }
    }
}



function pingaConexao(){
    console.log("vou tentar confirmar")
    console.log(nomeDoUsuario)
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nomeDoUsuario);
    promise.then((res)=>{
        console.log("deu certo ta online")
        })
}

function entrarNoChat() {
    let enviarnome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDoUsuario);
    console.log("Foi enviado ao servidor");
    enviarnome.then(nomeRecebido);
    enviarnome.catch(nomeNotRecebido)
}


function confirmaousai(response) {
    console.log(response)
}
function sodaerroessaporra(error) {
    console.log(error)
}

function nomeRecebido(response) {
    console.log("O servidor recebeu o nome");
    console.log(response);
    setInterval(pingaConexao, 5000)
    setInterval(mostrarMensagensDoChat, 3000)
}


function nomeNotRecebido(response) {
    console.log("O servidor não recebeu o nome");
}


function adicionarMensagem() {
    let mensagemDigitada = document.querySelector('input').value;
    let novaMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemDigitada,
        type: "message"
    }


    let mandandomsg = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
    mandandomsg.then(mensagemMandada);
    mandandomsg.catch(mensagemNaoFoi);
    document.querySelector('input').value = '';
}

function mensagemMandada(response) {
    console.log("Servidor recebeu a mensagem")

    exibirMensagem()
}

function mensagemNaoFoi(responde) {
    console.log("Deu algum erro")
}

function exibirMensagem() {
    console.log("indo pegar as mensagens")
    let mostrarAsMsgs = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    mostrarAsMsgs.then(res => mostraElas(res));
    mostrarAsMsgs.catch(naoVaiMostrar);
}

function mostraElas(r) {
    console.log("peguei as mensagens");
    mensagensDoChat = r.data;
    mostrarMensagensDoChat()
}

function naoVaiMostrar(resposta) {
    console.log("Deu erro")
}
function taoaqui(resposta) {
    console.log("chegou as msg")
    mostrarMensagensDoChat()
}
function naotaoaqui(resposta) {
    console.log("ocorreu um erro ao buscar as mensagens")
}
function mostraTudo() {
    let promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log("buscando mensagens")
    promessa.then(taoaqui);
    promessa.catch(naotaoaqui)
}

function mostraAUltima() {
    chat.querySelector('li:last-child').scrollIntoView();
}


entrarNoChat()
exibirMensagem()
mostraAUltima()
setInterval(mostraTudo, 3000)
setInterval(mostraAUltima, 3000)

