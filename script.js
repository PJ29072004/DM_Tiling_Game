var p = 3
var w,bw;
var a = [];
const P = document.getElementById("P")
var colors = ["red",'blue','green']
const T = document.getElementById("Triangle")
const B = document.getElementById("Buttons")
function change_buts(){
    p = Number(P.value);
    console.log(p);
    colors = []
    while(B.firstChild){
        B.removeChild(B.lastChild)
    }
    resize()
    for(var i=0;i<p;i++){
        var x = 200*i/(p-1)
        colors.push(`rgb(${x},${200-x},${200*Math.random()})`)
        but(i);
    }
    but(-1)
}
P.onchange = change_buts
function but(x){
    var b = document.createElement('button');
    if(x!=-1){
        b.innerText = `${x}`
    } else{
        b.innerText = "Back"
    }
    b.className = "Buttons"
    b.x = x
    b.style.width = b.style.height = `${bw}px`
    b.onclick = function(e){
        if(x!=-1){
            a.push(e.target.x)
        } else {
            a.pop()
        }
        if(a.length==0){
            reset_board()
            return
        }
        var wn = Math.min(window.innerWidth,0.7*window.innerHeight)/a.length
        if(w==undefined){
            w=wn
            reset_board()
            display()
        } else {
            var inter = setInterval(function(){
                w = 0.1*wn + 0.9*w
                reset_board()
                display()
                if(Math.abs(w-wn)<=0.01*Math.abs(wn)){clearInterval(inter);w=wn;reset_board();display()}
            },10)
        }
    }
    B.appendChild(b)
}
function tile(x){
    var t = document.createElement('label')
    t.innerText = `${x}`
    t.style.fontSize = `${w*0.7}px`
    t.style.backgroundColor = colors[x]
    t.style.height = t.style.width = `${0.8*w}px`
    t.className = "Tile"
    return t
}
function reset_board(){
    while(T.firstChild){
        T.removeChild(T.lastChild)
    }
}
function resize(){
    var tw = Math.min(window.innerWidth,0.7*window.innerHeight)
    T.style.left = `${(window.innerWidth-tw)/2}px`
    if(a.length){
        w = tw/a.length
    }
    bw = Math.min(0.8*window.innerWidth/(p+1),0.1*window.innerHeight)
    reset_board()
    a = []
}
window.onresize = resize
function display(){
    L = []
    for(var x in a){
        L.push(a[x])
    }
    var Top = 0
    while (L.length > 0){
        row = document.createElement("div")
        Ln = []
        for(var i=0;i<L.length;i++){
            var t = tile(L[i])
            t.style.left = `${i*w+Top/2}px`
            t.style.top = `${Top}px`
            T.appendChild(t)
        }
        for(var i=0;i<L.length-1;i++){
            Ln.push((2*p-(L[i]+L[i+1]))%p)
        }
        L = Ln
        Top += w
    }

}
change_buts()