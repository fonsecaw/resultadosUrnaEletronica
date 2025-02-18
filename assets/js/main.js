// Função para carregar os dados do JSON
function carregarDados() {
  fetch("./mock.json")
    .then(response => response.json()) // Converte a resposta para JSON
    .then(dados => {
      // Exibe o total de votos
      document.getElementById("total-votos").textContent = dados.total_votos;

      // Pega a lista de candidatos
      const listaCandidatos = document.querySelector(".lista-candidatos");
      listaCandidatos.innerHTML = ""; // Limpa qualquer conteúdo anterior

      // Adiciona os candidatos à lista
      dados.candidatos.forEach(candidato => {
        const li = document.createElement("li");
        li.classList.add("label");

        const text = document.createElement('p')
        li.innerHTML = `${candidato.nome.toUpperCase()}<br/>`;
        li.innerHTML += `${candidato.votos_recebidos} votos`;

        // Criar a barra de progresso
        const progressContainer = document.createElement("div");
        progressContainer.classList.add("progress-container");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.id = `progress-${candidato.id}`;

        const progressText = document.createElement("span");
        progressText.id = `progress-value-${candidato.id}`;

        progressContainer.appendChild(progressBar);
        li.appendChild(progressContainer);
        li.appendChild(progressText);

        listaCandidatos.appendChild(li);

        // Calcula a porcentagem e atualiza a barra
        let percentual = (candidato.votos_recebidos / dados.total_votos) * 100;
        atualizarProgresso(`progress-${candidato.id}`, `progress-value-${candidato.id}`, percentual);
      });
    })
    .catch(error => console.error("Erro ao carregar os dados:", error));
}

// Função para atualizar a barra de progresso dinamicamente
function atualizarProgresso(idBarra, idTexto, valor) {
  let progressBar = document.getElementById(idBarra);
  let progressText = document.getElementById(idTexto);

  if (progressBar && progressText) {
    // Atualiza a barra de progresso
    progressBar.style.width = valor + "%";
    // Exibe a porcentagem na tela
    progressText.innerText = valor.toFixed(2) + "%";
  }
}

// Chama a função ao carregar a página
carregarDados();
