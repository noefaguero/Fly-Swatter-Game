
let marcador = document.getElementById("marcador")
let ruta = "imagenes/mosca.png"
let fondo_juego = document.getElementById("fondo_juego")
let audio = document.getElementById("audio")

let motherfly = document.createElement("IMG")
motherfly.setAttribute("src", ruta)
motherfly.classList.add("mosca")

// calculate rows and column based on fly dimensions
let rows = Math.round(fondo_juego.offsetHeight/motherfly.naturalHeight-2)
let columns = Math.round(fondo_juego.offsetWidth/motherfly.naturalWidth-2)
// initialize the matrix
let map = new Array(rows)
for (let i = 0; i < rows; i++) {
    map[i]= new Array(columns)
}

//// FUNCTIONS

const setFlies = () => {
    let numero = Math.round(Math.random()*35+5)
    marcador.textContent = numero
    // create the fragment
    let fragment = document.createDocumentFragment()
    // clone the flies
    for (let i = 0; i < numero; i++) {
        let fly = motherfly.cloneNode(false)
        fly.setAttribute("style",  checkPosition())
        fragment.append(fly)
    }
    // set the flyes on the game scope
    fondo_juego.append(fragment)
}

const checkPosition = () => {  
    // generate a random position of the array
    let row, col
    do {
        row = Math.round(Math.random()*(rows-1))
        col = Math.round(Math.random()*(columns-1))
    } while (!map[row][col] == undefined)
    // fill the position of the matrix
    map[row][col] = true
    // calcute the position based on fly dimensions
    let y = row * motherfly.naturalHeight + motherfly.naturalHeight
    let x = col * motherfly.naturalWidth + motherfly.naturalWidth

    return "left: " + x + "px; top:" + y + "px;"

}

const killFlies = (event) => {
    if (event.target.tagName === "IMG" && event.target.src.substring(event.target.src.lastIndexOf("/")+1) == "mosca.png") {
        //change the image
        event.target.setAttribute("src","imagenes/muerta.png")
        event.target.style.top = (fondo_juego.offsetHeight - motherfly.naturalHeight) + "px"
        //play the audio
        if(!audio.onpause) {
            audio.currentTime = 0;
            audio.play()
        }
         // update the counter
         marcador.textContent = parseInt(marcador.textContent) - 1
    }
}

//// EVENTS
document.addEventListener("DOMContentLoaded", setFlies) 

document.addEventListener("click", (event) => killFlies(event))
