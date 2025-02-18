function carregaDados() {
  fetch("./mock.json")
    .then((response) => response.json())
    .then((dados) => {
      document.querySelector("#total-votos").innerText = dados.total_votos;

      dados.candidatos.forEach((candidato) => {
        const percentual = (candidato.votos_recebidos / dados.total_votos) * 100;
        atualizarProgresso(`progress-${candidato.id}`, `progress-value-${candidato.id}`, percentual);
        
        const listaCandidatos = document.querySelector(".lista-candidatos");
        listaCandidatos.innerText = "";
        
        const li = document.createElement("li");
        li.classList.add("card");
        
        const info = document.createElement('span');
        info.classList.add('left');
        info.innerHTML = `<strong>${candidato.nome}</strong>`;
        
        const votos = document.createElement('span');
        votos.classList.add('votos');
        votos.innerHTML += `${candidato.votos_recebidos} votos`;
        
        const textPerc = document.createElement('span');
        textPerc.classList.add('right');
        textPerc.innerHTML = `<strong>${percentual}%</strong>`;

        const aling = document.createElement('div');
        aling.classList.add('flex');
        aling.appendChild(info);
        aling.appendChild(textPerc);
        
        const barra = document.createElement("div");
        barra.classList.add("progress-container");
        
        const progresso = document.createElement("div");
        progresso.classList.add("progress-bar");
        progresso.id = `progress-${candidato.id}`;
        
        li.appendChild(aling);
        li.appendChild(votos);

        barra.appendChild(progresso);
        li.appendChild(barra);
        
        listaCandidatos.appendChild(li);
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

carregaDados();
