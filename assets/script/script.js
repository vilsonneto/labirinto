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
const myBody = document.querySelector("body")

// Função que cria um bloco
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

        appendFigures("nezuko", "./assets/img/nezuko.png", "Nezuko", newBlock)
        
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


// Função que cria uma linha
const createLine = (item) => {
    linha = document.createElement("div");
    linha.classList.add("linha")


    item.map(createBlock)

    labirinto.appendChild(linha)
}

// Função que cria o mapa
const createMap = (mapa, inicio) => {
    mapa.map(createLine)
    nezuko = document.getElementById("nezuko")
    nezuko.classList.add("no-reverse")
    createModal("modal-start", "./assets/img//nezuko-confusa.gif", "Nezuko confusa, com os olhos embaçados", "Nezuko confusa", "Nezuko se perdeu do Tanjirou e sua missão é ajuda-la!", "Começar!")
}

// Função que coloca um personagens em um bloco
const appendFigures = ( id, src, alt, idAppend ) => {
    let divFigure = document.createElement("div");
    if ( id !== "") {
        divFigure.id = id;
    }
    idAppend.appendChild(divFigure);

    let imgFigure = document.createElement("img");
    imgFigure.src = src;
    imgFigure.alt = alt;
    divFigure.appendChild(imgFigure)
}

createMap(cutMap)



const blocks = document.querySelectorAll(".casa")

let localAtual = 0;

// Função que realiza a troca de posição da Nezuko
const movimentNezuko = (index) => {
    let local = blocks[index]
    nezuko = document.getElementById("nezuko")
    local.appendChild(nezuko)
    return localAtual = index;
}

movimentNezuko(189)
 

// Funções de movimento
const moveUp = () => {
    let nextPosition = blocks[localAtual - 21 ].dataset["code"]

    if (nextPosition === "I") {
        createModal("modal-inosuke", "./assets/img/nezuko-inosuke.gif", "Inosuke enlouquecido", "Nezuko encontrou com Inosuke", "Nezuko encontrou Inosuke", "Fugir desse Louco!")
    }

    if (nextPosition === "B") {
        createModal("modal-start", "./assets/img/nezuko-caixa.gif", "Nezuko na", "Nezuko na caixa", "Nezuko encontrou sua caixa", "Voltar a procurar Tanjirou")

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
        createModal("modal-zenitsu", "./assets/img/nezuko-zenitsu.gif", "Nezuko sendo assediada pelo Zenitsu", "Nezuko encontrou Zenitsu", "Nezuko encontrou Zenitsu", "Fugir do assédio")
    }

    if (nextPosition === "F") {
        createModal("modal-tanjirou", "./assets/img/nezuko-tanjirou.gif", "Tanjirou fazendo carinho na Nezuko", "Nezuko encontrou com Tanjirou", "Você conseguiu! Nezuko está muito agradecido pela sua ajuda.", "Jogar de novo")
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



function createModal (classModal, src, alt, figText, textDescripition, textButton ) {

    let fundoModal = document.createElement("div")
    fundoModal.classList.add("modal-fundo")
    myBody.appendChild(fundoModal)
    
    let modal = document.createElement("div")
    modal.classList.add("modal")
    modal.classList.add( classModal )
    fundoModal.appendChild(modal)
    
    let figure = document.createElement("figure")
    modal.appendChild(figure)
    
    let gif = document.createElement("img")
    gif.src = src
    gif.alt = alt
    figure.appendChild(gif)
    
    let figcaption = document.createElement("figcaption")
    figcaption.classList.add("hidden")
    figcaption.innerText = figText
    figure.appendChild(figcaption)
    
    let textModal = document.createElement("h3")
    textModal.innerText = textDescripition
    modal.appendChild(textModal)
    
    let button = document.createElement("button")
    button.innerText = textButton
    modal.appendChild(button)

}
 





