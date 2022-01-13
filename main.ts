namespace SpriteKind {
    export const Vehicle = SpriteKind.create()
    export const orb = SpriteKind.create()
    export const ast = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Vehicle, function (sprite, otherSprite) {
    if (Type == person) {
        if (XWing == otherSprite) {
            ship = "x"
        } else {
            ship = "y"
        }
        otherSprite.destroy()
        sprite.setImage(otherSprite.image)
        Type = vtype
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == 0 && Type == vtype) {
        if (ship == "x") {
            XWing = sprites.create(Luke.image, SpriteKind.Vehicle)
            XWing.setPosition(Luke.x - 32, Luke.y)
        } else {
            YWing = sprites.create(Luke.image, SpriteKind.Vehicle)
            YWing.setPosition(Luke.x - 32, Luke.y)
        }
        ship = ""
        Luke.setImage(assets.image`Pilot`)
        pause(500)
        Type = person
    }
    if (state == 2 && Type == vtype) {
        effects.clouds.endScreenEffect()
        tiles.setTilemap(tilemap`space`)
        pause(2000)
        state = 1
        startPlanet(randint(0, 2))
    }
})
function createHangar () {
    XWing = sprites.create(assets.image`myImage`, SpriteKind.Vehicle)
    YWing = sprites.create(assets.image`Y-Wing`, SpriteKind.Vehicle)
    XWing.setPosition(66, 39)
    YWing.setPosition(64, 89)
    controller.moveSprite(Luke)
    scene.cameraFollowSprite(Luke)
    scene.setBackgroundColor(11)
    tiles.setTilemap(tilemap`hangar1`)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state != 0) {
        laserBlast()
    }
})
function startPlanet (num: number) {
    Planet = num
    newplanet = sprites.create(planets[num], SpriteKind.orb)
    newplanet.setPosition(116, 91)
    newplanet.setVelocity(randint(-50, 50), randint(-50, 50))
    newplanet.setBounceOnWall(true)
    planetNOW = 1
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Type != person) {
        if ("x" == ship) {
            Luke.setImage(xs[1])
        } else {
            Luke.setImage(ys[1])
        }
        dir = -1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.orb, function (sprite, otherSprite) {
    state = 2
    newplanet.destroy()
    if (Planet == 0) {
        scene.setBackgroundColor(9)
        effects.clouds.startScreenEffect()
        tiles.setTilemap(tilemap`planetscape1`)
    }
    if (Planet == 1) {
        scene.setBackgroundColor(5)
        effects.clouds.startScreenEffect()
        tiles.setTilemap(tilemap`planetscape2`)
    }
    if (Planet == 2) {
        scene.setBackgroundColor(6)
        effects.clouds.startScreenEffect()
        tiles.setTilemap(tilemap`planetscape3`)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.ast, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
    info.changeScoreBy(5)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Type != person) {
        if ("x" == ship) {
            Luke.setImage(xs[0])
        } else {
            Luke.setImage(ys[0])
        }
        dir = 1
    }
})
function laserBlast () {
    zap = sprites.create(assets.image`laser`, SpriteKind.Projectile)
    zap.setPosition(Luke.x, Luke.y)
    music.pewPew.play()
    zap.setVelocity(dir * 300, 0)
    zap.setFlag(SpriteFlag.DestroyOnWall, true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ast, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    music.knock.play()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
})
let rck: Sprite = null
let zap: Sprite = null
let newplanet: Sprite = null
let Planet = 0
let YWing: Sprite = null
let XWing: Sprite = null
let planets: Image[] = []
let dir = 0
let ys: Image[] = []
let xs: Image[] = []
let planetNOW = 0
let state = 0
let Type = 0
let Luke: Sprite = null
let vtype = 0
let person = 0
let ship = ""
info.setLife(10)
ship = ""
person = 1
vtype = 3
Luke = sprites.create(assets.image`Pilot`, SpriteKind.Player)
Type = person
state = 0
planetNOW = 0
xs = [assets.image`myImage`, assets.image`myImage0`]
ys = [assets.image`Y-Wing`, assets.image`Y-Wing0`]
let rocks = [
assets.image`asteroid`,
assets.image`asteroid0`,
assets.image`asteroid1`,
assets.image`asteroid2`
]
createHangar()
dir = 1
planets = [assets.image`planet`, assets.image`planet0`, assets.image`planet1`]
let monsters = [assets.image`TieFighter`, assets.image`Dragon`, assets.image`IceDragon`]
forever(function () {
    if (40 > Luke.x || 250 < Luke.x) {
        if (state == 0) {
            if (vtype == Type) {
                state = 1
                tiles.setTilemap(tilemap`space`)
                YWing.destroy()
                XWing.destroy()
            }
        } else {
            if (200 < Luke.x) {
                Luke.x = 50
            } else {
                Luke.x = 200
            }
        }
    }
})
forever(function () {
    if (planetNOW == 0 && 1 == state) {
        pause(5000)
        startPlanet(randint(0, 2))
    }
})
forever(function () {
    if (state == 1) {
        for (let value of rocks) {
            rck = sprites.create(value, SpriteKind.ast)
            rck.setPosition(randint(50, 100), randint(50, 100))
            rck.setVelocity(randint(-50, 50), randint(-50, 50))
            rck.setFlag(SpriteFlag.AutoDestroy, true)
            pause(500)
        }
    }
})
