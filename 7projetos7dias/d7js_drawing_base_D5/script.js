//DATA:
let currentColor = 'black';

let screen  = document.querySelector('#tela');
let ctx = screen.getContext('2d');

let drawing = false;

// EVENTOS:
document.querySelectorAll('.colorArea .color').forEach(item =>
    {
        item.addEventListener('click', colorClickEvent);
    });

// Monitors mouse state.
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearCanvas);

//FUNÇÕES:
//monitors which color is currently selected
function colorClickEvent(e)
{
    // e == event.
    // get a cor clicaada.
    let color = e.target.getAttribute('data-color');
    console.log("Cor clicada: ",color);

    currentColor = color;

    // remove classe
    document.querySelector('.color.active').classList.remove('active');

    //adiciona classe
    e.target.classList.add('active');
}

// monitors mouse state, executes according to mouse state.
function mouseDownEvent(e)
{
    //console.log("CLICOU!");
    drawing = true;
    
    // gets mouse position in the screen using its axis.
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e)
{
    //console.log("Moveu o mouse!");
    if(drawing)
    {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent()
{
    //console.log("SOLTOU!");
    drawing = false;
}

function draw(x, y)
{
    // mouse position.
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // drawing process:
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    // mouse new starting position.
    mouseX = pointX;
    mouseY = pointY;
}

// limpa o quadro de desenho.
function clearCanvas()
{
    // 'zera' cursor e processo de desenho. Traz cursor para inicio da matriz 2d do canvas.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// More advanced types of Canvas may be used to draw detailed graphics.