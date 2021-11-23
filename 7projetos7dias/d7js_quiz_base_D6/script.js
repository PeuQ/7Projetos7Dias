// Data:
let currentQuestion = 0;
let correctAnswers = 0;

// Events:
showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', tryAgain);

// Functions:
function showQuestion()
{
    if(questions[currentQuestion])
    {
        let q = questions[currentQuestion];

        // progress bar configuration
        let percentage = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${percentage}%`;

        //escondendo área de pontuação.
        document.querySelector('.scoreArea').style.display = 'none';
        
        // exibindo área de questões.
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;

        //exibindo alternativas por concatenação de strings.
        // menos custo de memória + melhor performance.
        let optionsHtml = '';
        for(let i in q.options)
        {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        // Adicionando evento de clique nas opções.
        document.querySelectorAll('.options .option').forEach(item =>
            {
                item.addEventListener('click', optionClickEvent);
            });
    }
    else
    {
        // acabaram as questões.
        finishQuiz();
        
    }
}

// Executes everything that happens when an option is clicked.
function optionClickEvent(e)
{
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    /*
    if(questions[currentQuestion].answer === clickedOption)
        console.log("ACERTOU!");
    else
        console.log("ERROU!");
    */

    if(questions[currentQuestion].answer === clickedOption)
        correctAnswers++;

    
    // goes to next question when current is answered
    currentQuestion++;
    showQuestion();
}

// hides question area + show result area
function finishQuiz()
{
    // calculating score
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30)
    {
        document.querySelector('.scoreText1').innerHTML = `Tá ruim em?!`;
        document.querySelector('.scorePct').style.color = '#FF0000';
    }
    else if(points >= 30 && points < 70)
    {
        document.querySelector('.scoreText1').innerHTML = `Muito Bom!`;
        document.querySelector('.scorePct').style.color = '#FFF00';
    }
    else if(points >= 70)
    {
        document.querySelector('.scoreText1').innerHTML = `Ótimo! Parabéns!`;
        document.querySelector('.scorePct').style.color = '#0D630D';   
    }

    // showing score
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';

    document.querySelector('.progress--bar').style.width = '100%';

}

// faz o botão "fazer novamente" funcionar como deve.
function tryAgain()
{
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}