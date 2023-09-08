var p = 3
var n = 0
var w,bw;
var a = [];
const P = document.getElementById("P")
var colors = [];
const T = document.getElementById("Triangle")
const B = document.getElementById("Buttons")
const N = document.getElementById("N")
P.value = `${p}`
N.value = `${n}`
function change_colors(){
    if(colors.length < p){
        colors = []
        for(var i=0;i<p;i++){
            var x = 200*i/(p-1)
            colors.push(`rgb(${x},${200-x},${200*Math.random()})`)
        }
    }
    while(colors.length > p){
        colors.pop()
    }
}
change_colors()
function change_buts(){
    if(p!=Number(P.value)){
        p = Number(P.value);
        for(var i=0;i<a.length;i++){
            a[i] = a[i]%p
        }
        resize()
        change_colors()
    }
    while(B.firstChild){
        B.removeChild(B.lastChild)
    }
    for(var i=0;i<p;i++){
        but(i);
    }
    but(-1)
    display()
    B.style.top = `${0.9*window.innerHeight+(0.1*window.innerHeight-bw)/2}px`
}
P.onchange = change_buts
N.onchange = function(){
    eval("n = "+N.value+";")
    N.value = `${n}`
    var l = a.length
    for(var i=l;i<n;i++){
        a.push(Math.floor((p-0.1)*Math.random()))
    }
    for(var i=l;i>n;i=i-1){
        a.pop()
    }
    resize()
    display()
}
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
    if(x!=-1){
        b.style.backgroundColor = colors[x]
    } else {
        b.style.backgroundColor = 'white'
        b.style.color = 'black'
    }
    b.onclick = function(e){
        if(x!=-1){
            a.push(e.target.x)
        } else {
            a.pop()
        }
        n = a.length
        N.value = `${n}`
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
    bw = Math.min(0.75*window.innerWidth/(p+1),0.1*window.innerHeight)
    reset_board()
}
window.onresize = function(){
    resize()
    change_buts()
    display()
}
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
resize()
change_buts()