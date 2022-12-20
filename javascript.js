// create the matrix of divs

// let squares = rangeslider.value;

let display = document.getElementById('display');
let displayWidth = display.offsetWidth;
let displayHeight = display.offsetHeight;

let rangeslider = document.getElementById('slider');

let squares = 16;

function drawSquares(){
    for(let i = 0; i < squares; i++){
        let column = document.createElement('div');
        column.className = 'column';
        for(let j = 0; j < squares; j++){
            let row = document.createElement('div');
            row.className = 'row';
            row.id = 'rowid';
            column.appendChild(row);
        }
        display.appendChild(column);
    }
    let boxes = document.getElementsByClassName('row');
    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.width=`${displayWidth/squares}px`;
        boxes[i].style.height=`${displayHeight/squares}px`;
    }
}

let mode = 1;
document.getElementById('color-mode').classList.add('active');

document.getElementById('color-mode').addEventListener('click', function(e){
    mode = 1;
    if(mode === 1){
        document.querySelectorAll('.button').forEach(button =>{  
            button.classList.remove("active");
        })
        this.classList.add("active");
    }
});

document.getElementById('rainbow-mode').addEventListener('click', function(e){
    mode = 2;
    if(mode === 2){
        document.querySelectorAll('.button').forEach(button =>{  
            button.classList.remove("active");
        })
        this.classList.add("active");
    }
})

document.getElementById('clear').addEventListener('click', function(e){
    let grid = document.querySelectorAll('.row');
    grid.forEach(box => box.style.backgroundColor = "white");
})

document.getElementById('eraser').addEventListener('click', function(e){
    mode = 3;
    if(mode === 3){
        document.querySelectorAll('.button').forEach(button =>{  
            button.classList.remove("active");
        })
        this.classList.add("active");
    }
})



function fillColor(){
    let grid = document.querySelectorAll('.row');

    function color(){
        if(leftClickDown){
            if(mode === 1){
                this.style.backgroundColor = document.getElementById('color').value;
            }
            if(mode === 2){
                function random_rgba() {
                    var o = Math.round, r = Math.random, s = 255;
                    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
                }
                var randomColor = random_rgba();
                this.style.backgroundColor = randomColor;
            }
            if(mode === 3){
                this.style.backgroundColor = 'white';
            }
        }
    }
    
    let leftClickDown = false;
    
    onmousedown = function(){
        leftClickDown = true;
    }
    onmouseup = function(){
        leftClickDown = false;
    }
    grid.forEach(box => box.addEventListener('mouseover', color));
}



drawSquares();
fillColor();
let sizeText = document.getElementById('size-text');
sizeText.textContent = `${squares} x ${squares}`

rangeslider.oninput = function(){
    display.replaceChildren();
    squares = this.value;
    sizeText.textContent = `${squares} x ${squares}`
    drawSquares();
    fillColor();
    // resize();
}