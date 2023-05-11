let z = 1;



async function fetchPokemonData() {
    for (let i = 1; i <= 151; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let respsonse = await fetch(url);
        let currentPokemon = await respsonse.json();

        console.log(currentPokemon);
        renderPokemons(i, currentPokemon);
    }  
}



function renderPokemons(i, currentPokemon) {
    let content = document.getElementById('pokedex');
    let currentStats = currentPokemon['stats'];

    content.innerHTML += /*html*/`
    <div class="card pokemonCardFullScreen">
        <div class="card-body p-0 d-flex flex-column">

            <div id="cardInfos" class="${currentPokemon['types']['0']['type']['name']}">
                <h1>#${currentPokemon['id']}</h1>
                <div class="imgContainer ${currentPokemon['types']['0']['type']['name']}-border">
                    <img class="pokemonImg" src="${currentPokemon['sprites']['front_shiny']}" alt="">
                </div>
            </div>

            <div id="mainInfos${i}" class="mainInfos"></div>

            <div id="skills${i}" class="p-4"></div>
        </div>
    </div>

    `
   
    renderSkills(i, currentStats, currentPokemon);
    console.log(currentStats);
}



function renderSkills(j, currentStats, currentPokemon) {

    let skillsContent = document.getElementById(`skills${j}`);
    
    skillsContent.innerHTML = '';

    for (let i = 0; i < currentStats.length; i++) { 
    skillsContent.innerHTML += /*html*/`
        
    <div class="skillContainer d-flex justify-content-between">
        <div class="singleSkillContainer">
            <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuemin="0" aria-valuenow="${currentPokemon['stats'][i]['base_stat']}" aria-valuemax="120">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${currentPokemon['stats'][i]['base_stat']}%"></div>
        </div>
        
        <div id="skillName">
        ${currentPokemon['stats'][i]['stat']['name']}
        </div>
     </div>

    <div class="skillsNumber">
        <span>${currentPokemon['stats'][i]['base_stat']}</span>
        </div>
    </div>
    `
    }
    renderMainInfos(j, currentPokemon);
}



function renderMainInfos(j, currentPokemon) {
    let infoContent = document.getElementById(`mainInfos${j}`);

    infoContent.innerHTML += /*html*/`
    <div class="pokemonText p-4 d-flex flex-column justify-content-center">
        <h6 class="card-subtitle">${currentPokemon['types']['0']['type']['name']}</h6>
        <h2 class="card-title">${currentPokemon['name']}</h2>
    
        <table>
            <tr>
                <td>weight:</td>
                <td>${currentPokemon['weight']}Pound</td>
            </tr>

            <tr>
                <td>height:</td>
                <td>0,${currentPokemon['height']}m</td>
            </tr>
        </table>
     </div>
    `
}

