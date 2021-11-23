// Elementos a manipular:
let digitalElement = document.querySelector('.digital');

let sElement = document.querySelector('.p_segundos');
let mElement = document.querySelector('.p_minutos');
let hElement = document.querySelector('.p_horas');

// processo de atualização por segundo:
function updateClock()
{
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // innerHTML = permite escrita dentro do objeto 'digitalElement'
    digitalElement.innerHTML = `${fixZero(hours)}:${fixZero(minutes)}:${fixZero(seconds)}`;

    //calcula posição do ponteiro dos segundos através de seu ángulo.
    let sDegrees = ((360 / 60) * seconds) - 90;
    sElement.style.transform = `rotate(${sDegrees}deg)`;

    //calcula posição do ponteiro dos minutos através de seu ángulo.
    let mDegrees = ((360 / 60) * minutes) - 90;
    mElement.style.transform = `rotate(${mDegrees}deg)`;

    //calcula posição do ponteiro horas através de seu ángulo.
    let hDegrees = ((360 / 12) * hours) - 90;
    hElement.style.transform = `rotate(${hDegrees}deg)`;
}

function fixZero(time)
{
    if(time < 10)
        return '0' + time;
    else
        return time;

    // return time < 10 ? `0${time}` : time; (função com operador terciário).
}

// cria intervalo infinito.
setInterval(updateClock, 1000); // 1000ms = 1s
// chamada para 'burlar o timer de 1s'
updateClock();