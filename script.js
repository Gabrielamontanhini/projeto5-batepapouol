let nome = prompt("Qual é o seu nome?");
let mensagensDoChat = [];
let nomeDoUsuario = {
    name: nome
}
const chat = document.querySelector('ul');


function mostrarMensagensDoChat() {
    
    chat.innerHTML = '';
    for (let i = 0; i < mensagensDoChat.length; i++) {
        if (mensagensDoChat[i].type === "status") {
            let template = `<li class="status">${
                mensagensDoChat[i].time
            } ${
                mensagensDoChat[i].from
            } ${
                mensagensDoChat[i].text
            } </li>`
            chat.innerHTML = chat.innerHTML + template;
        } else {
            let template = `<li class="message">${
                mensagensDoChat[i].time
            } ${
                mensagensDoChat[i].from
            } para Todos: ${
                mensagensDoChat[i].text
            } </li>`
            chat.innerHTML = chat.innerHTML + template;
        }
    }
}




function entrarNoChat() {
    let enviarnome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nomeDoUsuario);
    console.log("Foi enviado ao servidor");
    enviarnome.then(nomeRecebido);
    enviarnome.catch(nomeNotRecebido)
}



function confirmaousai(response){
    console.log(response)
}
function sodaerroessaporra(error){
    console.log(error)
}

function nomeRecebido(response) {
    console.log("O servidor recebeu o nome")
  //  setInterval(conexao, 5000)
   // function conexao(){
    //    let confirmarConexao = post.axios("https://mock-api.driven.com.br/api/v6/uol/status", nomeDoUsuario);
      //  confirmarConexao.then(confirmaousai)
        //confirmarConexao.catch(sodaerroessaporra)
    //}
}


function nomeNotRecebido(response) {
    console.log("O servidor não recebeu o nome")
}


function adicionarMensagem() {
    let mensagemDigitada = document.querySelector('input').value;
    let novaMensagem = {
        from: nome,
        to: "Todos",
        text: mensagemDigitada,
        type: "message"
    }
    mensagemDigitada = '';

    let mandandomsg = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMensagem);
    mandandomsg.then(mensagemMandada);
    mandandomsg.catch(mensagemNaoFoi);

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
    console.log("peguei as mensagens vou carregar elas");
    mensagensDoChat = r.data;
    mostrarMensagensDoChat()
}

function naoVaiMostrar(resposta) {
    console.log("Deu erro")
}
function taoaqui(resposta){
    mostrarMensagensDoChat()
    console.log("chegou as msg")
}
function naotaoaqui(resposta){
    console.log("ocorreu um erro ao buscar as mensagens")
}
function mostraTudo(){
    let promessa =  axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log("buscando mensagens")
    promessa.then(taoaqui);
    promessa.catch(naotaoaqui)
}

function mostraAUltima(){
    chat.querySelector('li:last-child').scrollIntoView();
}
function pingaConexao(){
    console.log("vou tentar confirmar")
    let confirmarConexao = post.axios("https://mock-api.driven.com.br/api/v6/uol/status", nomeDoUsuario);
    console.log("foi postado confirmação")
    confirmarConexao.then(confirmaousai)
    confirmarConexao.catch(sodaerroessaporra)
}

entrarNoChat()

exibirMensagem()
setInterval(mostraTudo, 3000)
setInterval(mostraAUltima, 3000)
mostraAUltima()
pingaConexao()
//setInterval(pingaConexao, 5000)
