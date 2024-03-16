const searchBtn = document.getElementById("searchBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const appcontainer = document.getElementById("app");

const linkmaster = `https://pokeapi.co/api/v2/pokemon?limit=10`;
let linksiguiente;
let linkanterior;

const pokemones = [];


const getpokemons = async (link) => {
    try {
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        linksiguiente = data.next;
        linkanterior = data.previous;
        renderpoke(data.results);
        return data;
    } catch (error) {
        console.log(error);
    }
};
const getpokemon = async (link) => {
    try {
        const response = await fetch(link);
        if (!response.ok) {
            alert("pokemon no encontrado");
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);
        //return data;
    } catch (error) {
        console.log(error);
    }
};



function renderpoke(pokejson) {

    //nos hemos quedado en renderizar un solo pokemon y el css
    appcontainer.innerHTML = '';

    pokejson.forEach((pokemon) => {
        let addPokemon = document.createElement("div");
        addPokemon.classList.add("pokemon")
        addPokemon.innerHTML = (
            `<p><strong>${pokemon.name}</strong></p>`
        );
        appcontainer.appendChild(addPokemon);
    });
}

getpokemons(linkmaster);

searchBtn.addEventListener("click", () => {
    let pokemon = document.getElementById("searchInput").value;
    getpokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
})

nextBtn.addEventListener("click", () => {
    let newpage = linksiguiente;
    if (newpage) getpokemons(newpage);
})

prevBtn.addEventListener("click", () => {
    let newpage = linkanterior
    if (newpage) getpokemons(newpage);
})

resetBtn.addEventListener("click", () => {
    getpokemons(linkmaster);
})



