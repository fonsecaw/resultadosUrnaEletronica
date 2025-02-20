function carregaDados() {
  fetch("https://mesariobarao.squareweb.app/apuracao")
    .then((response) => response.json())
    .then((dados) => {
      document.querySelector("#total-votos").innerText = dados.total_votos;

      const listaCandidatos = document.querySelector(".lista-candidatos");
      listaCandidatos.innerHTML = ""; // Agora está FORA do loop (corrigido)

      dados.candidatos.forEach(candidato => {
        let percentual = (candidato.votos_recebidos / dados.total_votos) * 100;

        const li = document.createElement("li");
        li.classList.add("card");

        const info = document.createElement("span");
        info.classList.add("left");
        info.innerHTML = `<strong>${candidato.nome}</strong>`;

        const votos = document.createElement("span");
        votos.classList.add("votos");
        votos.innerHTML = `${candidato.votos_recebidos} votos`;

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
        progresso.id = `progress-${candidato.id}`;
        progresso.style.width = "0%"; // Garante que a barra começa vazia

        barra.appendChild(progresso);
        li.appendChild(aling);
        li.appendChild(votos);
        li.appendChild(barra);

        listaCandidatos.appendChild(li);

        // Atualiza a barra de progresso depois de adicionar ao DOM
        atualizarProgresso(`progress-${candidato.id}`, percentual);
      });
    })
    .catch(error => console.error("Erro ao carregar os dados:", error));
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
