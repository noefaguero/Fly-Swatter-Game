
let marcador = document.getElementById("marcador")
let ruta = "imagenes/mosca.png"
let fondo_juego = document.getElementById("fondo_juego")
let audio = document.getElementById("audio")

let motherfly = document.createElement("IMG")
motherfly.setAttribute("src", ruta)
motherfly.classList.add("mosca")

//// FUNCTIONS

const setFlies = () => {
    let numero = Math.round(Math.random()*35+5)
    marcador.textContent = numero

    let fragment = document.createDocumentFragment()

    for (let i = 0; i < numero; i++) {
        let fly = motherfly.cloneNode(false)
        fly.setAttribute("style",  checkPosition())
        fragment.append(fly)
    }
    fondo_juego.append(fragment)
}

const checkPosition = () => {
    let rows = Math.round(fondo_juego.offsetHeight/motherfly.naturalHeight-2)
    let columns = Math.round(fondo_juego.offsetWidth/motherfly.naturalWidth-2)
    let map = new Array(rows)
    map.forEach(row => row = new Array(columns))

    let row, col
    do {
        row = Math.round(Math.random()*rows)
        col = Math.round(Math.random()*columns)
    } while (map[row[col]] !== undefined)

    map[row[col]] = true

    let y = row * motherfly.naturalHeight + motherfly.naturalHeight
    let x = col * motherfly.naturalWidth + motherfly.naturalWidth

    return "left: " + x + "px; top:" + y + "px;"

}

const killFlies = (event) => {
    if (event.target.tagName === "IMG") {
        event.target.setAttribute("src","imagenes/muerta.png")
        event.target.style.top = (fondo_juego.offsetHeight - motherfly.naturalHeight) + "px"
        
        if(!audio.onpause) {
            audio.currentTime = 0;
            audio.play()
        }
    }
}

//// EVENTS
document.addEventListener("DOMContentLoaded", setFlies) 

document.addEventListener("click", (event) => killFlies(event))
