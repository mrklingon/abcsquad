namespace SpriteKind {
    export const Vehicle = SpriteKind.create()
    export const orb = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Vehicle, function (sprite, otherSprite) {
    if (Type == person) {
        otherSprite.destroy()
        sprite.setImage(otherSprite.image)
        Type = vtype
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == 0 && Type == vtype) {
        veh = sprites.create(Luke.image, SpriteKind.Vehicle)
        veh.setPosition(Luke.x - 32, Luke.y)
        Luke.setImage(assets.image`Pilot`)
        pause(500)
        Type = person
    }
    if (state == 2 && Type == vtype) {
        effects.clouds.endScreenEffect()
        tiles.setTilemap(tilemap`space`)
        pause(2000)
        startPlanet()
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
function startPlanet () {
    newplanet = sprites.create(assets.image`planet`, SpriteKind.orb)
    newplanet.setPosition(116, 91)
    newplanet.setVelocity(randint(-50, 50), randint(-50, 50))
    newplanet.setBounceOnWall(true)
    planetNOW = 1
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.orb, function (sprite, otherSprite) {
    state = 2
    newplanet.destroy()
    scene.setBackgroundColor(9)
    effects.clouds.startScreenEffect()
    tiles.setTilemap(tilemap`planetscape1`)
})
function laserBlast () {
    zap = sprites.create(assets.image`laser`, SpriteKind.Projectile)
    zap.setPosition(Luke.x, Luke.y)
    zap.setVelocity(200, 0)
    zap.setFlag(SpriteFlag.DestroyOnWall, true)
}
let zap: Sprite = null
let newplanet: Sprite = null
let YWing: Sprite = null
let XWing: Sprite = null
let veh: Sprite = null
let planetNOW = 0
let state = 0
let Type = 0
let Luke: Sprite = null
let vtype = 0
let person = 0
person = 1
vtype = 3
Luke = sprites.create(assets.image`Pilot`, SpriteKind.Player)
Type = person
state = 0
planetNOW = 0
createHangar()
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
        startPlanet()
    }
})
