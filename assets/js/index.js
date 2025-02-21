async function carregaDados() {
  try {
    const response = await fetch("https://mesariobarao.squareweb.app/apuracao");

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const dados = await response.json();

    document.querySelector("#total-votos").innerText = dados.totalGeralDeVotos;
    console.log(`Erro na requisição: ${response.status}`)

    const listaCandidatos = document.querySelector(".lista-candidatos");
    listaCandidatos.innerHTML = ""; // Limpa antes de adicionar novos elementos

    dados.apuracao.forEach((apuracao, index) => {
      let percentualDeVotos = (apuracao.totalVotos / dados.totalGeralDeVotos) * 100;

      const li = document.createElement("li");
      li.classList.add("card");
      li.id = `candidato-${index}`;

      const nomeCandidato = document.createElement("span");
      nomeCandidato.classList.add("left");
      nomeCandidato.innerHTML = `<strong>${apuracao.nome}</strong>`;

      const votosCandidato = document.createElement("span");
      votosCandidato.classList.add("votos");
      votosCandidato.innerHTML = `${apuracao.totalVotos} votos`;

      const percentualTexto = document.createElement("span");
      percentualTexto.classList.add("right");
      percentualTexto.innerHTML = `<strong>${percentualDeVotos.toFixed(2)}%</strong>`;

      const aling = document.createElement("div");
      aling.classList.add("flex");
      aling.appendChild(nomeCandidato);
      aling.appendChild(percentualTexto);

      const containerDaBarra = document.createElement("div");
      containerDaBarra.classList.add("progress-container");

      const progressoDaBarra = document.createElement("div");
      progressoDaBarra.classList.add("progress-bar");
      progressoDaBarra.id = `progress-${index}`;
      progressoDaBarra.style.width = "0%"; //Garante que se inicia em 0

      containerDaBarra.appendChild(progressoDaBarra);
      li.appendChild(aling);
      li.appendChild(votosCandidato);
      li.appendChild(containerDaBarra);

      listaCandidatos.appendChild(li);

      atualizaProgresso(`progress-${index}`, percentualDeVotos);
    });

    console.log(dados);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

// Função para atualizar a barra de progresso dinamicamente
function atualizaProgresso(idBarra, valor) {
  let progressBar = document.querySelector(`#${idBarra}`);

  if (progressBar) {
    progressBar.style.width = valor + "%";
  }
}

// Funç~~aopara adicionar título com o ano atual
function titulo() {
  const data = new Date();
  const titulo = document.querySelector('.title');
  titulo.innerText = `Resultados Oficiais da Eleição do Grêmio Estudantil ${data.getFullYear()}`;
}

// Chama a função ao carregar a página
titulo();
carregaDados();

