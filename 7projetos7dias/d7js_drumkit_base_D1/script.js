// EVENTOS:

// evento de click da tela inteira. Para qualquer tecla.
document.body.addEventListener('keyup', (event)=>
{
    playSound(event.code.toLocaleLowerCase()); // code == identificador da tecla pressionada.
});

//                      classe do css
// evento to button 'Tocar'
document.querySelector('.composer button').addEventListener('click', () =>
{
    let song = document.querySelector('#input').value;
    console.log("Música", song); // valor de 'song' é atribuido a Música.

    // transforma inputs de 'song' em string em array.
    if (song != ' ')
    {
        let songArray = song.split('');
        console.log(songArray);
        playComposition(songArray);
    }
});


// FUNÇÕES:
function playSound(sound) // teclas relacionadas aos id's dos sons no html
{
    let audioElement = document.querySelector(`#s_${sound}`); // sound == variavel generica recebendo tecla apertada.
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    // tocar som das teclas.
    if (audioElement)
    {
        // traz o ponteiro de 'audio' para o começo sempre que uma tecla é apertada.
        // não depende de outras teclas, funciona sempre.
        audioElement.currentTime = 0;
        audioElement.play();
    }

    // adiciona/remove o css através das classes
    if (keyElement)
    {
        keyElement.classList.add('active');

        setTimeout(()=>
        {
            keyElement.classList.remove('active');
        }, 300);
    }
}


// toca as teclas no array através de um loop
function playComposition(songArray)
{
    // já setado em milisegundos.
    let sleep = 0;

    for(let songItem of songArray)
    {
        setTimeout(()=>
        { playSound(`key${songItem}`); }, sleep);

        sleep += 250;
        // o sleep funciona para as teclas sem som também.
        // dando um delay nos sons.
    }
}