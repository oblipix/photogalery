// Configuração da API Unsplash
const ACCESS_KEY = "xB-2QpMW_obvLNB2vszDrwI-R8kBUtXBBQkF6tr3b9k"; // Sua chave de acesso
const API_URL = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=10`; // Endpoint para carregar fotos

// Elementos do DOM
const photoGrid = document.getElementById("photoGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const noResults = document.getElementById("noResults");

// Lista de fotos (inicialmente vazia)
let photos = [];

// Função para carregar fotos da API Unsplash
async function fetchPhotos(query = "") {
  try {
    const url = query
      ? `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${query}&per_page=10` // Para pesquisa com palavras-chave
      : API_URL;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao carregar fotos da API.");

    const data = await response.json();
    photos = query ? data.results : data; // Usamos "results" para buscas com palavras-chave
    loadPhotos();
  } catch (error) {
    console.error(error);
    noResults.textContent = "Erro ao carregar fotos. Tente novamente mais tarde.";
    noResults.classList.remove("hidden");
  }
}

// Função para carregar fotos no grid
function loadPhotos() {
  photoGrid.innerHTML = "";
  if (photos.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  photos.forEach(photo => {
    const photoItem = document.createElement("div");
    photoItem.className = "photo-item";
    photoItem.innerHTML = `
      <img src="${photo.urls.small}" alt="${photo.alt_description || "Imagem sem descrição"}">
      <p>${photo.alt_description || "Sem título"}</p>
    `;
    photoGrid.appendChild(photoItem);
  });
}

// Função para realizar a busca
function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    fetchPhotos(query);
  } else {
    fetchPhotos(); // Se o campo estiver vazio, exibe as fotos iniciais
  }
}

// Evento de busca ao clicar no botão de busca
searchButton.addEventListener("click", handleSearch);

// Evento de busca ao digitar
searchInput.addEventListener("input", handleSearch);

// Carregar fotos ao iniciar
fetchPhotos();
