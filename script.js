function entrarNoChat(){


const nomeDoUsuario = prompt("Qual é o seu nome?")

let login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeDoUsuario)
console.log(login)

}



let mensagens = []

function exibirMensagen(){
    let Conversa = document.querySelector("ul");
    Conversa.innerHTML = ''

    for (let i=0; i<mensagens.length; i++){
        let template = `
        <li class="todos"> ${mensagens[i].de} para Todos: ${mensagens[i].texto}</li>
        `
        Conversa.innerHTML = Conversa.innerHTML + template;
    }
}



function adicionarMensagem(){
    let mensagemDoUsuario = document.querySelector("input").value;

    const novaMensagem = {
        de: nomeDoUsuario,
        texto: mensagemDoUsuario,
    }

let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', novaMensagem);
console.log('enviada');
promessa.then(RespostaChegou);

    exibirMensagen()
    document.querySelector("input").value = ''


}



/* o que precisa fazer : a promessa é o axios post com o link e o que deve ser postado no servido*/
