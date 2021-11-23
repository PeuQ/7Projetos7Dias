// Data:
// objeto de controle.
let areas =
{
    a: null,
    b: null,
    c: null
};

//EVENTOS:
document.querySelectorAll('.item').forEach(item =>
    {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

document.querySelectorAll('.area').forEach(area =>
    {
        area.addEventListener('dragover', dragOver);
        area.addEventListener('dragleave', dragLeave);
        area.addEventListener('drop', drop);
    });

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// FUNÇÕES:
//functions Item
function dragStart(e)
{
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e)
{
    e.currentTarget.classList.remove('dragging');
}

//functions Area:
function dragOver(e)
{
    if(e.currentTarget.querySelector('.item') === null)
    {
        e.preventDefault(); // permite o 'drop'
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e)
{
    e.currentTarget.classList.remove('hover');
}

function drop(e)
{
    e.currentTarget.classList.remove('hover');

    //verifying area disponibility
    if(e.currentTarget.querySelector('.item') === null)
    {
        //changing item position
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

//functions Neutral Area:
function dragOverNeutral(e)
{
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e)
{
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e)
{
    e.currentTarget.classList.remove('hover');

    // changing item position.
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

// control functions
function updateAreas()
{
    document.querySelectorAll('.area').forEach(area =>
        {
            let name = area.getAttribute('data-name');

            if(area.querySelector('.item') !== null)
                areas[name] = area.querySelector('.item').innerHTML;
            else
                areas[name] = null;
        });
        //console.log(areas);
        if(areas.a === '1' && areas.b === '2' && areas.c === '3')
            document.querySelector('.areas').classList.add('correct');
        else
            document.querySelector('.areas').classList.remove('correct');
}