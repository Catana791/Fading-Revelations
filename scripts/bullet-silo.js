//this is NOT the complete definition for this block! see content/blocks/scatter-silo.hjson for the stats and other properties.

//create a simple shockwave effect
const siloLaunchEffect = newEffect(20, e => {
    Draw.color(Color.white, Color.lightGray, e.fin()); //color goes from white to light gray
    Lines.stroke(e.fout() * 3); //line thickness goes from 3 to 0
    Lines.circle(e.x, e.y, e.fin() * 100); //draw a circle whose radius goes from 0 to 100
});

//create the block type
const silo = extendContent(Block, "bullet-silo", {
    //override the method to build configuration
    buildConfiguration(tile, table){
        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {
            //configure the tile to signal that it has been pressed (this sync on client to server)
            tile.configure(0)
        })).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
    },

    //override configure event
    configured(tile, value){
        //make sure this silo has the items it needs to fire
        if(tile.entity.cons.valid()){
            //make this effect occur at the tile location
            Effects.effect(siloLaunchEffect, tile)

            //create 10 bullets at this tile's location with random rotation and velocity/lifetime
            for(var i = 0; i < 15; i++){
                Calls.createBullet(Bullets.flakExplosive, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
            }
            //triggering consumption makes it use up the items it requires
            tile.entity.cons.trigger()
        }
    }
})