namespace SpriteKind {
    export const Vehicle = SpriteKind.create()
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
let YWing: Sprite = null
let XWing: Sprite = null
let veh: Sprite = null
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
createHangar()
forever(function () {
    if (state == 0) {
        if (30 > Luke.x || 290 < Luke.x) {
            if (vtype == Type) {
                state = 1
                tiles.setTilemap(tilemap`space`)
                YWing.destroy()
                XWing.destroy()
            }
        }
    }
})
