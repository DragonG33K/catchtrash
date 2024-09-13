var dirxJ, pjx, velj, player;
var jogo, tela, telaX, telaY;
var frame, contLixo, painelLixo, lixoTotal, lixoORGTotal, velL, tmpLx;
var vidaJ, vida;
var pontos, pontosTemp, contador, cor, intervalo;

function movedown(e){
    dirxJ *= -1
}

function cj(){
    pjx += dirxJ * velj
    var PSize = player.offsetWidth
    player.style.left = pjx + "px";
    if(pjx <= 0 && dirxJ == -1 || pjx >= telaX-PSize && dirxJ == 1){
        dirxJ *= -1
    }
}


function loopgame(){
    if(jogo){
        cj()
        controlaLixo()
        controlaLixoORG()
        colPlayer()
        cont()
        attvida()
        perdeu()
        attIntervalo()
    }
    frame = requestAnimationFrame(loopgame)
}
function colPlayer(){
    lixoTotal = document.getElementsByClassName("lixo");
    var tam = lixoTotal.length
    var playerh = player.offsetHeight
    for(var i = 0;i<tam;i++){
        if (lixoTotal[i]){
            var pi = lixoTotal[i].offsetTop
            var pix = lixoTotal[i].offsetLeft
            var LSize = lixoTotal[i].offsetHeight
            if((pix >= pjx && pix <= pjx + 50) && (pi <= telaY - playerh && pi >= telaY - playerh*2 - LSize)){
                pontos += 1
                lixoTotal[i].remove()
        }}
    }
    var tam2 = lixoORGTotal.length
    for(var i = 0;i<tam2;i++){
        if (lixoORGTotal[i]){
            var pi = lixoORGTotal[i].offsetTop
            var pix = lixoORGTotal[i].offsetLeft
            var LSize = lixoORGTotal[i].offsetHeight
            if((pix >= pjx && pix <= pjx + 50) && (pi <= telaY - playerh && pi >= telaY - playerh*2 - LSize)){
                vidaJ -= 1
                lixoORGTotal[i].remove()
        }}
    }
}
function spawnLixo(){
    var r = Math.floor(Math.random() * 100)
    if(r >= 0 && r <= 35 && pontos > 13){
        criarLixoORG()
    }else{
        criarLixo()
    }
}
function cont(){
    contador = document.getElementById("contador")
    contador.innerText = pontos
}
function perdeu(){
    if (vidaJ <= 0){
        jogo = false
        lixoTotal = document.getElementsByClassName("lixo");
        lixoORGTotal = document.getElementsByClassName("lixoORG");
        var loozer = document.getElementById("perdeu")
        var tam = lixoTotal.length
        var tam2 = lixoORGTotal.length
        for(var i = 0;i<=tam;i++){
            if(lixoTotal[i]){
                lixoTotal[i].remove()
            }
        }
        for(var i = 0;i<tam2;i++){
            if(lixoORGTotal[i]){
                lixoORGTotal[i].remove()
                tam2 = lixoORGTotal.length
            }}
        loozer.style.display="flex";
    }
}
function attvida(){
    if (vidaJ >= 0){
        vida = document.getElementById("vidas")
        cor = "&#128154;"
        vida.innerHTML = cor.repeat(vidaJ)
    }
    
}
function attIntervalo(){
    if(pontosTemp + 5 == pontos){
        if (intervalo > 500){
            intervalo -= 80
            clearInterval(tmpLx)
            tmpLx = setInterval(spawnLixo, intervalo)
            console.log(intervalo, velL, velj)
        }
        if(velL < 5){
            velL += 0.20
            velj += 0.20}
        pontos += 1
        pontosTemp = pontos    
    }
}
function iniciar(){
    jogo = true
    dirxJ= 1
    velj=5
    pjx = 250
    tela = document.getElementById("tela")
    telaX = tela.offsetWidth;
    telaY = tela.offsetHeight;
    velL = 3
    vidaJ = 3
    pontos = 0
    intervalo = 1700
    pontosTemp = 0
    clearInterval(tmpLx)
    tmpLx = setInterval(spawnLixo, intervalo)
    player = document.getElementById("personagem")
    player.style.left = pjx + "px";
    player.style.bottom = 50 + "px";
    contLixo = 0
    loopgame()        
}
function reiniciar(){
    var tam = lixoTotal.length
    var tam2 = lixoORGTotal.length
    for(var i = 0;i<=tam;i++){
        if(lixoTotal[i]){
            lixoTotal[i].remove()
        }
    }
    for(var i = 0;i<tam2;i++){
        if(lixoORGTotal[i]){
            lixoORGTotal[i].remove()
            tam2 = lixoORGTotal.length
        }}
    jogo = true
    dirxJ= 1
    velj=5
    pjx = 250
    tela = document.getElementById("tela")
    telaX = tela.offsetWidth;
    telaY = tela.offsetHeight;
    velL = 3
    vidaJ = 3
    pontos = 0
    intervalo = 1700
    pontosTemp = 0
    clearInterval(tmpLx)
    tmpLx = setInterval(spawnLixo, intervalo)
    player = document.getElementById("personagem")
    player.style.left = pjx + "px";
    player.style.bottom = 50 + "px";
    contLixo = 0
}
function start(){
    var persona = document.getElementById("personagem") 
    persona.style.display = "none"
    var timer = document.getElementById("timer")
    var num = document.getElementById("num")
    var cont = 3
    var inter = setInterval(function(){
        if (cont>0){
            num.innerHTML = cont
            cont -= 1
        }else{
            clearInterval(inter)
            iniciar()
            persona.style.display = "inherit"
            timer.style.display = "none"
        }
        
    },1000) 
}
function start2(){
    var loozer = document.getElementById("perdeu")
    loozer.style.display="none";
    var persona = document.getElementById("personagem") 
    persona.style.display = "none"
    var timer = document.getElementById("timer")
    var num = document.getElementById("num")
    var cont = 3
    num.innerHTML = cont
    timer.style.display = "flex"
    var inter = setInterval(function(){
        if (cont>0){
            num.innerHTML = cont
            cont -= 1
        }else{
            clearInterval(inter)
            reiniciar()
            persona.style.display = "inherit"
            timer.style.display = "none"
        }
        
    },1000) 
}

function criarLixo(){
    if(jogo){ 
        
        var tela = document.getElementById("tela") 
        var lixo = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");
        var y = 0
        var LSize = lixo.offsetWidth
        var x = Math.random() * telaX
        att1.value = "lixo";
        att2.value = "top:"+ y + "px;left:"+ x + "px";
        lixo.setAttributeNode(att1);
        lixo.setAttributeNode(att2);
        tela.appendChild(lixo)
    }
}

function controlaLixo(){
    if(jogo){
        lixoTotal = document.getElementsByClassName("lixo");
        var tam = lixoTotal.length
        for(var i = 0;i<tam;i++){
            if(lixoTotal[i]){
                var LSize = lixoTotal[i].offsetHeight
                var pi = lixoTotal[i].offsetTop;
                var pix = lixoTotal[i].offsetLeft;
                pi += velL
                lixoTotal[i].style.top = pi + "px";
                if(pix>telaX - LSize){
                    lixoTotal[i].remove()
                }
                if (pi>telaY - LSize){
                    vidaJ -= 1
                    lixoTotal[i].remove()
                }
            }
        }
    }
}

function criarLixoORG(){
    if(jogo){
        
        var tela = document.getElementById("tela") 
        var lixo = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");
        var y = 0
        var LSize = lixo.offsetWidth
        var x = Math.random() * telaX
        att1.value = "lixoORG";
        att2.value = "top:"+ y + "px;left:"+ x + "px";
        lixo.setAttributeNode(att1);
        lixo.setAttributeNode(att2);
        tela.appendChild(lixo)
    }
}

function controlaLixoORG(){
    lixoORGTotal = document.getElementsByClassName("lixoORG");
    var tam = lixoORGTotal.length
    for(var i = 0;i<tam;i++){
        if(lixoORGTotal[i]){
            var pi = lixoORGTotal[i].offsetTop;
            var LSize = lixoORGTotal[i].offsetHeight
            var pix = lixoORGTotal[i].offsetLeft;
            pi += velL
            lixoORGTotal[i].style.top = pi + "px";
            if(pix>telaX - LSize){
                lixoORGTotal[i].remove()
            }
            if (pi>telaY-LSize){
                pontos += 1
                lixoORGTotal[i].remove()
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState == "hidden"){
            clearInterval(tmpLx)
        }else if(document.visibilityState == "visible"){
            tmpLx = setInterval(spawnLixo, intervalo)
        }})
})
window.addEventListener("load", start)
document.addEventListener("click", movedown)
document.addEventListener("keydown", movedown)    
document.getElementById("botao").addEventListener("click", start2)
