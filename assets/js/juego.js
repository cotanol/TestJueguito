/*
    2C = Two of clubs
    2D = Two of diamonds
    2H = Two of hearts
    2S = Two of spades 
*/



let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputador = 0;

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const crearDeck = () => 
{

    for (let i = 2; i <= 10; i++)
    {
        for (let tipo of tipos)
        {
            deck.push(i+tipo);
        }
    }

    for (let especial of especiales)
    {
        for (let tipo of tipos)
        {
            deck.push(especial+tipo);
        }
    }

    deck = _.shuffle(deck);

    console.log(deck);
    return deck;
}

crearDeck();


const pedirCarta = () => 
{

    if (deck.length === 0) 
    {
        throw 'No hay cartas en el deck'; //hasta aqui nomas se ejecutara como error
    }
    else
    {
        const carta = deck.pop();  //pop elimina el ultimo elemento

        return carta;
    }
    
}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    console.log(valor);
    
    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : (valor * 1); // Ya no creo el 'puntos'

}


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador += valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;  //[0] = jugador

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21)
    {
        console.warn("Perdistes papeto lendo");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
    else if (puntosJugador === 21)
    {
        console.warn("Ganastes");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }


});

btnDetener.addEventListener('click', () => {

    while(puntosComputador < puntosJugador)
    {
        const carta = pedirCarta();

        puntosComputador += valorCarta(carta);

        puntosHTML[1].innerText = puntosComputador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta);
        
    }

    if (puntosComputador === puntosJugador)
    {
        console.warn("Empate");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
    else if (puntosComputador <= 21)
    {
        console.warn("Gano la Computadora :(");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
    else
    {
        console.warn("Gana el jugador :)");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
    
})

btnNuevo.addEventListener('click', () => {

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    puntosJugador = 0;
    puntosComputador = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    deck = [];
    crearDeck();

    // Query selector devuelve un arreglo del objeto de DOM de img, con foreach se lo recorre y se
    // elimina cada uno personalmente con el metodo remove
    divCartasComputadora.querySelectorAll('img').forEach(img => img.remove());
    divCartasJugador.querySelectorAll('img').forEach(img => img.remove());

})