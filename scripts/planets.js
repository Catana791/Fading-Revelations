//Code from Sharlottes/ExampleMod.
Events.on(ClientLoadEvent, () => {
  const slagia = new Planet("slagia", cornal, 0, 0.2);
    slagia.mesh = new SunMesh(
                slagia, 4,
                5, 0.3, 1.7, 1.2, 1,
                1.3,
                Liquids.slag.color,
                Liquids.slag.color.cpy().lerp(Color.white, 0.2),
                Liquids.slag.color.cpy().lerp(Color.white, 0.3),
                Liquids.slag.color.cpy().lerp(Color.white, 0.4),
                Liquids.slag.color.cpy().lerp(Color.white, 0.5)
        );
    //slagia.mesh = new PlanetMesh(slagia, new MeshBuilder(1, 0.5), Shaders.slag);
    slagia.orbitRadius = 4;
    slagia.orbitTime = 60;
    slagia.rotateTime = 30;
    slagia.bloom = true;
    slagia.accessible = true;
    slagia.hasAtmosphere = true;
    slagia.atmosphereColor = Liquids.slag.color;
    slagia.atmosphereRadIn = 0.1;
    slagia.atmosphereRadOut = 0.3;
    slagia.localizedName = "Dion";


    var arrs = [
        [Blocks.water, Blocks.darksandWater, Blocks.darksand, Blocks.darksand, Blocks.darksand, Blocks.darksand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.darksandWater, Blocks.stone, Blocks.stone],
        [Blocks.water, Blocks.darksandWater, Blocks.darksand, Blocks.darksand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.darksandWater, Blocks.stone, Blocks.stone, Blocks.stone],
        [Blocks.water, Blocks.darksandWater, Blocks.darksand, Blocks.sand, Blocks.salt, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.darksandWater, Blocks.stone, Blocks.stone, Blocks.stone],
        [Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.salt, Blocks.salt, Blocks.sand, Blocks.stone, Blocks.stone, Blocks.stone, Blocks.snow, Blocks.iceSnow, Blocks.ice],
        [Blocks.deepwater, Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.salt, Blocks.sand, Blocks.sand, Blocks.basalt, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice],
        [Blocks.deepwater, Blocks.water, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.sand, Blocks.grass, Blocks.iceSnow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.snow, Blocks.ice],
        [Blocks.deepwater, Blocks.sandWater, Blocks.sand, Blocks.sand, Blocks.grass, Blocks.grass, Blocks.snow, Blocks.basalt, Blocks.basalt, Blocks.basalt, Blocks.ice, Blocks.snow, Blocks.ice],
        [Blocks.water, Blocks.darksandWater, Blocks.darksand, Blocks.darksand, Blocks.basalt, Blocks.grass, Blocks.basalt, Blocks.hotrock, Blocks.basalt, Blocks.ice, Blocks.snow, Blocks.ice, Blocks.ice],
        [Blocks.darksandWater, Blocks.darksand, Blocks.darksand, Blocks.darksand, Blocks.grass, Blocks.dirt, Blocks.snow, Blocks.basalt, Blocks.basalt, Blocks.ice, Blocks.snow, Blocks.ice, Blocks.ice],
        [Blocks.darksandWater, Blocks.darksand, Blocks.darksand, Blocks.dirt, Blocks.ice, Blocks.ice, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice],
        [Blocks.water, Blocks.darksandWater, Blocks.darksand, Blocks.mud, Blocks.mud, Blocks.ice, Blocks.ice, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice],
        [Blocks.darksandWater, Blocks.darksandWater, Blocks.darksand, Blocks.dirt, Blocks.grass, Blocks.dirt, Blocks.iceSnow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice],
        [Blocks.darksandWater, Blocks.darksand, Blocks.snow, Blocks.ice, Blocks.iceSnow, Blocks.snow, Blocks.snow, Blocks.snow, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice, Blocks.ice]
    ]; 
});
