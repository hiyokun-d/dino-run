const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//collision rectangle
function RectsColliding(r1, r2) {
    return !(r1.x > r2.x + r2.w ||
        r1.x + r1.w < r2.x ||
        r1.y > r2.y + r2.h ||
        r1.y + r1.h < r2.y);
}

let window_width;
let window_height;
setInterval(() => {
    window_width = window.innerWidth;
    window_height = window.innerHeight;
}, 0)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let player = {
    x: 10,
    y: 270,
    vy: 0, //velocity
    w: 10,
    h: 25,
    c: "black"
}

let lantai = {
    x: 0,
    y: 300,
    w: canvas.width,
    h: 0.41
}

class Cactus {
    constructor(x, y, w, h, c) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = c
    }

    draw(context) {
        context.fillStyle = this.c
        context.fillRect(this.x, this.y, this.w, this.h)
    }

    uptade(context) {
        this.draw(context)
        this.x -= 5
    }
}

let cactus = []

function spawner() {
    
    setInterval(() => {
        cactus.push(new Cactus(1090, 280, 10, 20, "green"))
    }, 2000)
}

let canJump = false

let score = 0;

let isDie = false;

function game() {
    if (canvas.width !== window_width || canvas.height !== window_height) {
        location.reload()
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    cactus.forEach((CactusParam, index) => {
        CactusParam.uptade(ctx)
        
        if (CactusParam.x < 0) {
            cactus.splice(index, 1)
            score += 1
        }
        
        if (RectsColliding(player, CactusParam) && !isDie) {
            alert("your score congrats " + score + " this game madebye hiyo A.K.A daffa")
            location.reload()
            isDie = true;
        }
    })
    
    console.log(score);
    ctx.fillStyle = "black"
    ctx.fillRect(lantai.x, lantai.y, lantai.w, lantai.h)

    ctx.fillStyle = player.c
    ctx.fillRect(player.x, player.y, player.w, player.h)

    if (!RectsColliding(lantai, player)) {
        canJump = false
        player.vy += 0.9;
        player.y += player.vy;
    } else {
        player.y = lantai.y-player.h;
        player.vy = 0;
        canJump = true
        return;
    }
}


addEventListener("click", () => {
    if (canJump) {
        player.vy = -10;
        player.y -= 1;
    }
})

addEventListener("keypress", (event) => {
    if (canJump) {
        if (event.key === " ") {
            player.vy = -10;
            player.y -= 1;
        }
    }
})

let fps = 50
let game_time = 1000 / fps

function init() {
    spawner()
    setInterval(() => {
        game()
    }, game_time)
}

init()
