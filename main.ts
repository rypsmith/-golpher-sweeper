namespace SpriteKind {
    export const Collison = SpriteKind.create()
    export const Tile = SpriteKind.create()
    export const secret = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile12`, function (sprite, location) {
    sprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(currentTile, "revealed"))) {
        if (currentTile.image.equals(unseenTileImage)) {
            currentTile.setImage(seenTileImage)
        } else {
            currentTile.setImage(unseenTileImage)
        }
    }
})
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile18`, function (sprite, location) {
    sprite.destroy()
})
function flood_reveal (num: number, num2: number) {
    if (!(tiles.tileIsWall(tiles.getTileLocation(num, num2)))) {
        if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(num, num2), assets.tile`tile`))) {
            return
        } else {
            tiles.placeOnTile(recursive_target, tiles.getTileLocation(num, num2))
            number_of_gophers_but_here = count_gophers_where_i_am(recursive_target)
            tiles.setTileAt(tiles.getTileLocation(num, num2), tile_Numbers[number_of_gophers_but_here])
            if (0 < number_of_gophers_but_here) {
                return
            } else {
                flood_reveal(num - 1, num2 - 1)
                flood_reveal(num - 1, num2 - 0)
                flood_reveal(num - 0, num2 - 1)
                flood_reveal(num + 1, num2 - 0)
                flood_reveal(num + 1, num2 + 1)
                flood_reveal(num + 0, num2 + 1)
                flood_reveal(num - 1, num2 + 1)
                flood_reveal(num + 1, num2 - 1)
            }
        }
    }
}
function game_over () {
    currentTile.destroy()
    for (let value of sprites.allOfKind(SpriteKind.Tile)) {
        value.destroy()
        pause(10)
    }
    game.over(false)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (target.overlapsWith(currentTile)) {
        if (tiles.tileAtLocationEquals(tiles.locationOfSprite(currentTile), assets.tile`tile2`)) {
            game_over()
        }
        temp_number = count_gophers_where_i_am(currentTile)
        if (0 < temp_number) {
            tiles.setTileAt(tiles.locationOfSprite(currentTile), tile_Numbers[temp_number])
        } else {
            flood_reveal(tiles.locationXY(tiles.locationOfSprite(currentTile), tiles.XY.column), tiles.locationXY(tiles.locationOfSprite(currentTile), tiles.XY.row))
        }
        currentTile.destroy()
    }
    if (sprites.allOfKind(SpriteKind.Tile).length <= number_of_gophers) {
        game.over(true)
    }
})
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile14`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile16`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile17`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile19`, function (sprite, location) {
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Collison, SpriteKind.Tile, function (sprite, otherSprite) {
    currentTile = otherSprite
})
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile15`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile0`, function (sprite, location) {
    sprite.destroy()
})
function make_cover_tiles () {
    for (let value of tiles.getTilesByType(assets.tile`tile`)) {
        tile = sprites.create(img`
            9 1 1 1 1 1 1 d 
            1 b b b b b b c 
            1 b b b b b b c 
            1 b b b b b b c 
            1 b b b b b b c 
            1 b b b b b b c 
            1 b b b b b b c 
            d c c c c c c f 
            `, SpriteKind.Tile)
        tile.setFlag(SpriteFlag.Invisible, false)
        tiles.placeOnTile(tile, value)
        sprites.setDataBoolean(tile, "revealed", false)
    }
}
function count_gophers_where_i_am (mySprite: Sprite) {
    currentTileLocation = tiles.locationOfSprite(mySprite)
    number_of_gophers_next_to_me = 0
    if (tiles.tileIs(tiles.locationInDirection(tiles.locationInDirection(currentTileLocation, CollisionDirection.Left), CollisionDirection.Top), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    if (tiles.tileIs(tiles.locationInDirection(currentTileLocation, CollisionDirection.Top), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    if (tiles.tileIs(tiles.locationInDirection(tiles.locationInDirection(currentTileLocation, CollisionDirection.Top), CollisionDirection.Right), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    if (tiles.tileIs(tiles.locationInDirection(currentTileLocation, CollisionDirection.Left), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    if (tiles.tileIs(tiles.locationInDirection(currentTileLocation, CollisionDirection.Right), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    if (tiles.tileIs(tiles.locationInDirection(tiles.locationInDirection(currentTileLocation, CollisionDirection.Bottom), CollisionDirection.Left), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    if (tiles.tileIs(tiles.locationInDirection(currentTileLocation, CollisionDirection.Bottom), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    if (tiles.tileIs(tiles.locationInDirection(tiles.locationInDirection(currentTileLocation, CollisionDirection.Bottom), CollisionDirection.Right), assets.tile`tile2`)) {
        number_of_gophers_next_to_me += 1
    }
    return number_of_gophers_next_to_me
}
scene.onOverlapTile(SpriteKind.Tile, assets.tile`tile13`, function (sprite, location) {
    sprite.destroy()
})
function place_gophers () {
    allOpenTiles = tiles.getTilesByType(assets.tile`tile`)
    for (let index = 0; index <= number_of_gophers - 1; index++) {
        random_tile_index = randint(0, allOpenTiles.length - 1)
        tiles.setTileAt(allOpenTiles.removeAt(random_tile_index), assets.tile`tile2`)
    }
}
let random_tile_index = 0
let allOpenTiles: tiles.Location[] = []
let number_of_gophers_next_to_me = 0
let currentTileLocation: tiles.Location = null
let tile: Sprite = null
let temp_number = 0
let number_of_gophers_but_here = 0
let currentTile: Sprite = null
let tile_Numbers: Image[] = []
let number_of_gophers = 0
let seenTileImage: Image = null
let unseenTileImage: Image = null
let target: Sprite = null
let recursive_target: Sprite = null
let num_flags_placed = 0
tiles.setSmallTilemap(tilemap`level1`)
recursive_target = sprites.create(img`
    3 
    `, SpriteKind.secret)
recursive_target.setFlag(SpriteFlag.Invisible, true)
let cursor = sprites.create(img`
    . . f . . . . . 
    . f 1 f . . . . 
    . f 1 f f f . . 
    . f 1 b 1 b f . 
    . f 1 b 1 b 1 f 
    f 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 f 
    . f f f f f f . 
    `, SpriteKind.Player)
cursor.z = 10000000000
target = sprites.create(img`
    2 
    `, SpriteKind.Collison)
target.setFlag(SpriteFlag.Invisible, true)
controller.moveSprite(cursor, 50, 50)
unseenTileImage = img`
    9 1 1 1 1 1 1 d 
    1 b b b b b b c 
    1 b b b b b b c 
    1 b b b b b b c 
    1 b b b b b b c 
    1 b b b b b b c 
    1 b b b b b b c 
    d c c c c c c f 
    `
seenTileImage = img`
    9 1 1 1 1 1 1 d 
    1 b b b b 2 2 c 
    1 b e e e e b 2 
    1 b f e f e 2 c 
    1 e e e e e b c 
    1 b e e e e 2 c 
    1 b b b b b b c 
    d c c c c c c f 
    `
number_of_gophers = 30
tile_Numbers = [
assets.tile`tile12`,
assets.tile`tile0`,
assets.tile`tile13`,
assets.tile`tile14`,
assets.tile`tile15`,
assets.tile`tile16`,
assets.tile`tile17`,
assets.tile`tile18`,
assets.tile`tile19`
]
make_cover_tiles()
place_gophers()
game.onUpdate(function () {
    target.setPosition(Math.floor(cursor.left) + 3, Math.floor(cursor.top) + 1)
})
