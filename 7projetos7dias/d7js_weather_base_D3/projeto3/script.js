// Eventos:
// evento que faz requisição interna.
document.querySelector('.busca').addEventListener('submit', async (event)=> // async = indica que a função irá executar código não-ordenado/assíncrono.
{
        event.preventDefault();

        let input = document.querySelector('#searchInput').value;

        if(input != '')
        {
            //clearInfo();
            shoWarning('Carregando...');

            let url_api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=bbd31e4e0f6329be8a994d004bbd18d9&units=metric&lang=pt_br`;

            let result = await fetch(url_api); // aguarda o retorno da requisição da api e o salva em 'result'.
            let json = await result.json(); // aguarda a transformação para Json do valor guardado em 'result'.

            // montando o objeto que será exibido ao usuário com as informações necessárias.
            if(json.cod === 200)
            {
                showInfo
                ({
                    name: json.name,
                    country: json.sys.country,
                    temp: json.main.temp,
                    tempIcon: json.weather[0].icon,
                    windSpeed: json.wind.speed,
                    windAngle: json.wind.deg,
                });
            }
            else
            {
                clearInfo();
                shoWarning('Localização não encontrada!');
            }
        }
        else
        {
            clearInfo();
        }
});

// Funções:
// Mostra na tela avisos...
function shoWarning(message)
{
    // innerHTML == permite escrita dentro do objeto aviso.
    document.querySelector('.aviso').innerHTML = message;
}

// Mostra na tela as informações do local pesquisado
function showInfo(json)
{
    //showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('scr', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`; // -90 compensa ângulo da direção do vento, que está iniciando à 90 graus.

    // mostrando resultado após carregamento das informações.
    document.querySelector('.resultado').style.display = 'block'; // bloqueia o warning 'carregando...' quando chega o resultado da API.
}

// limpa a tela.
function clearInfo()
{
    showWarning(' ');
    document.querySelector('.resultado').style.display = 'none';
}