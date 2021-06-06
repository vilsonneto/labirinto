const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W WIW",
    "W W W WWW WWWWW W W W",
    "W W W   W    ZW W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW W WWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W WBW WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let cutMap = map.map((item) => item.split(""))
let linha = "";


const labirinto = document.getElementById("labirinto")

let positionColuna = 0;
let positionLinha = 9;

const createBlock = (item) => {
    const newBlock = document.createElement("div")
    newBlock.classList.add("casa")

    if ( item === "W" ) {
        newBlock.classList.add("parede")
        newBlock.dataset.code = "W"
        linha.appendChild(newBlock)

        appendFigures("", "./assets/img/pinheiro.png", "arvores", newBlock)

    }
    if ( item === " " ) {
        newBlock.classList.add("caminho")
        newBlock.dataset.code = " "
        linha.appendChild(newBlock)
    }
    if ( item === "S" ) {
        newBlock.id = "start"
        newBlock.dataset.code = " "
        linha.appendChild(newBlock)
    }
    if ( item === "B" ) {
        newBlock.id = "casa-box"
        newBlock.dataset.code = "B"
        linha.appendChild(newBlock)

        appendFigures("box", "./assets/img/box.png", "Box Nezuko", newBlock)
    }
    if ( item === "Z" ) {
        newBlock.id = "casa-zenitsu"
        newBlock.dataset.code = "Z"
        linha.appendChild(newBlock)

        appendFigures("zenitsu", "./assets/img/zenitsu.gif", "Zenitsu", newBlock)

    }
    if ( item === "I" ) {
        newBlock.id = "casa-inosuke"
        newBlock.dataset.code = "I"
        linha.appendChild(newBlock)

        appendFigures("inosuke", "./assets/img/inosuke.gif", "Inosuke", newBlock)

    }
    if ( item === "F" ) {
        newBlock.id = "casa-tanjiro"
        newBlock.dataset.code = "F"
        linha.appendChild(newBlock)

        appendFigures("tanjiro", "./assets/img/tanjiro.png", "Tanjiro", newBlock)

    }
    
    
}

const appendFigures = ( id, src, alt, idAppend ) => {
    let divFigure = document.createElement("div");
    divFigure.id = id;
    idAppend.appendChild(divFigure);

    let imgFigure = document.createElement("img");
    imgFigure.src = src;
    imgFigure.alt = alt;
    divFigure.appendChild(imgFigure)
}

const createLine = (item) => {
    linha = document.createElement("div");
    linha.classList.add("linha")


    item.map(createBlock)

    labirinto.appendChild(linha)
}

const createMap = () => {
    cutMap.map(createLine)
}

createMap()

let nezuko = document.createElement("div")
nezuko.id = "nezuko"
nezuko.classList.add("no-reverse")
labirinto.appendChild(nezuko)

nezuko = document.getElementById("nezuko")
let imgNezuko = document.createElement("img");
imgNezuko.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d7342616-47df-4f4a-a9ff-adc5532cb145/ddj1k7i-2f1687e6-2b1b-4770-aa46-6ecc51b62be8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q3MzQyNjE2LTQ3ZGYtNGY0YS1hOWZmLWFkYzU1MzJjYjE0NVwvZGRqMWs3aS0yZjE2ODdlNi0yYjFiLTQ3NzAtYWE0Ni02ZWNjNTFiNjJiZTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ibSsDEKxFVLSXdJtZMbeYKaS4ZZxxUT2QeHv9RlPoB0"
imgNezuko.alt = "Nezuko-chan"
nezuko.appendChild(imgNezuko)

const blocks = document.querySelectorAll(".casa")

let localAtual = 0;
const movimentNezuko = (index) => {
    let local = blocks[index]
    nezuko = document.getElementById("nezuko")
    local.appendChild(nezuko)
    return localAtual = index;
}

movimentNezuko(189)
 


const moveUp = () => {
    let nextPosition = blocks[localAtual - 21 ].dataset["code"]

    if (nextPosition === "I") {
        return alert("UuUWAAAARRAAGH!")
    }

    if (nextPosition === "B") {
        return alert("Nezuko achou sua caixa.")
    }

    if (nextPosition === " ") { 
        return movimentNezuko( localAtual - 21 )
    }
}

const moveDown = () => {
    let nextPosition = blocks[localAtual + 21 ].dataset["code"]
    if (nextPosition === " ") { 
        return movimentNezuko( localAtual + 21 )
    }
}

const moveLeft = () => {
    let nextPosition = blocks[localAtual - 1 ].dataset["code"]
    if (nextPosition === " " && nextPosition !== 138) { 
        nezuko.classList.remove("no-reverse")
        nezuko.classList.add("reverse")
        return movimentNezuko( localAtual - 1 )
    }
}

const moveRight = () => {
    let nextPosition = blocks[localAtual + 1 ].dataset["code"]

    if (nextPosition === "Z") {
        return alert("NEZUKO-CHAN!")
    }

    if (nextPosition === "F") {
        return alert("Você ajudou a Nezuko a encontrar Tanjiro.")
    }

    if (nextPosition === " ") { 
        nezuko.classList.remove("reverse")
        nezuko.classList.add("no-reverse")
        return movimentNezuko( localAtual + 1 )
    }
}


document.addEventListener("keydown", (event) => {
    let keyPress = event.key;

    if( keyPress === "ArrowUp" ) {
        return moveUp()
    }

    if( keyPress === "ArrowDown" ) {
        return moveDown()
    }

    if( keyPress === "ArrowLeft" ) {
        return moveLeft()
    }

    if( keyPress === "ArrowRight" ) {
        return moveRight()        
    }

})


