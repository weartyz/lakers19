var sitename = "lakers19.";
var subtext = "v1.2";
var serverUrl1 = "https://gms.parcoil.com";

let gamesData = [];

document.title = document.title + " | " + sitename;

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = "";

  if (filteredGames.length === 0) {
    gamesContainer.innerHTML = '<p class="no-results">No games found 😢</p>';
    return;
  }

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = serverUrl1 + "/" + game.url + "/" + game.image;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = "play.html?gameurl=" + game.url + "/";
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);

    if (game.new) {
      const badge = document.createElement("span");
      badge.textContent = "NEW";
      badge.classList.add("new-badge");
      gameDiv.appendChild(badge);
    }

    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

fetch("/lakers19/config/games.json")
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    document.getElementById("loadingSpinner").style.display = "none";
    displayFilteredGames(data);
  })
  .catch((error) => {
    console.error("Error fetching games:", error);
    document.getElementById("loadingSpinner").textContent = "Failed to load games.";
  });

document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;
