function carregaDados() {
  fetch("https://mesariobarao.squareweb.app/apuracao")
    .then((response) => response.json())
    .then((dados) => {
      document.querySelector("#total-votos").innerText = dados.totalGeralDeVotos;

      const listaCandidatos = document.querySelector(".lista-candidatos");
      listaCandidatos.innerHTML = ""; // Agora está FORA do loop (corrigido)

      dados.apuracao.forEach((apuracao, index) => {
        const percentual = (apuracao.totalVotos / dados.totalGeralDeVotos) * 100;
        console.log(index);

        const li = document.createElement("li");
        li.classList.add("card");

        const info = document.createElement("span");
        info.classList.add("left");
        info.innerHTML = `<strong>${apuracao.nome}</strong>`;

        const votos = document.createElement("span");
        votos.classList.add("votos");
        votos.innerHTML = `${apuracao.totalVotos} votos`;

        const textPerc = document.createElement("span");
        textPerc.classList.add("right");
        textPerc.innerHTML = `<strong>${percentual.toFixed(2)}%</strong>`;

        const aling = document.createElement("div");
        aling.classList.add("flex");
        aling.appendChild(info);
        aling.appendChild(textPerc);

        const barra = document.createElement("div");
        barra.classList.add("progress-container");

        const progresso = document.createElement("div");
        progresso.classList.add("progress-bar");
        progresso.id = `progress-${index}`;
        progresso.style.width = "0%"; // Garante que a barra começa vazia

        barra.appendChild(progresso);
        li.appendChild(aling);
        li.appendChild(votos);
        li.appendChild(barra);

        listaCandidatos.appendChild(li);

        // Atualiza a barra de progresso depois de adicionar ao DOM
        atualizarProgresso(`progress-${index}`, percentual);
      });
      console.log(dados)
    })
    .catch(error => console.error("Erro ao carregar os dados:", error));

    // Inserindo título com ano automático
    const data = new Date();
    const titulo = document.querySelector('.title');
    titulo.innerText = `Resultados Oficiais da Eleição do Grêmio Estudantil ${data.getFullYear()}`
}

// Função para atualizar a barra de progresso dinamicamente
function atualizarProgresso(idBarra, valor) {
  let progressBar = document.querySelector(`#${idBarra}`); // Adiciona "#" antes do ID

  if (progressBar) {
    progressBar.style.width = valor + "%";
  }
}

// Chama a função ao carregar a página
carregaDados();

