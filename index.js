function adicionarInteresse() {
    const input_interesse = document.getElementById("input-interesse");
    const valorInput_interesse = input_interesse.value.trim();
  
    if (valorInput_interesse) {
      const item = document.createElement("li");
      item.textContent = valorInput_interesse;
      let interesses = pegarDados();
      interesses.push(item.textContent);
      localStorage.setItem("meus-interesses", JSON.stringify(interesses)); // salvar no localStorage
      mostrarInteresses();
      input_interesse.value = "";
    } else {
      alert("Digite um interesse");
    }
  }
  
  function addEnter(event) {
    if (event.key === "Enter") {
      adicionarInteresse();
    }
  }
  
  function pegarDados() {
    let interesses = localStorage.getItem("meus-interesses");
    return interesses ? JSON.parse(interesses) : [];
  }
  
  function mostrarInteresses() {
    let interessesSalvos = pegarDados();
    let lista = document.getElementById("lista-interesses");
    lista.innerHTML = "";
  
    interessesSalvos.forEach((interesse) => {
      let item = document.createElement("li");
      item.innerHTML = interesse;
  
      let btn_excluir = document.createElement("button");
      btn_excluir.textContent = "Excluir";
      // btn_excluir.className = 'btn'
      btn_excluir.onclick = function () {
        excluirInteresse(interesse);
      };
      item.appendChild(btn_excluir);
  
      lista.appendChild(item);
    });
  }
  
  function excluirInteresse(index) {
    let interesses = pegarDados();
    interesses.splice(index, 1);
    localStorage.setItem("meus-interesses", JSON.stringify(interesses));
    mostrarInteresses();
  }
  
  async function news() {
    const retornoFetch = await fetch(
      "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release"
    );
    const noticia = await retornoFetch.json();
    const span = document.getElementById("title-news-today");
    span.innerText = noticia.items[0].titulo;
  }
  
  news();
  
  function limparLista() {
    localStorage.removeItem("meus-interesses");
  }
  
setInterval(() => {
mostrarInteresses();
}, 1000);