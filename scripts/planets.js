//Code from Sharlottes/ExampleMod.
Events.on(ClientLoadEvent, () => {
    const sirius = new Planet("sirius", Planets.sun, 0, 0.5);
    //sirius.generator = new SerpuloPlanetGenerator();
    sirius.mesh = new SunMesh(
                sirius, 4,
                5, 0.3, 1.7, 1.2, 1,
                1.3,
                Pal.lancerLaser,
                Pal.lancerLaser.cpy().lerp(Color.white, 0.2),
                Pal.lancerLaser.cpy().lerp(Color.white, 0.4),
                Pal.lancerLaser.cpy().lerp(Color.white, 0.6),
                Pal.lancerLaser.cpy().lerp(Color.white, 0.8),
                Color.white
        );

    sirius.orbitRadius = 8;
    sirius.orbitTime = 60;
    sirius.rotateTime = 30;
    sirius.bloom = true;
    sirius.accessible = true;
    sirius.hasAtmosphere = true;
    sirius.atmosphereColor = Pal.lancerLaser;
    sirius.atmosphereRadIn = 0.05;
    sirius.atmosphereRadOut = 0.3;
    sirius.localizedName = "Sirius";

    const cornal = new Planet("cornal", Planets.sun, 0, 0.3);
    //cornal.generator = new SerpuloPlanetGenerator();
    cornal.mesh = new SunMesh(
                cornal, 4,
                5, 0.3, 1.7, 1.2, 1,
                1.3,
                Pal.heal,
                Pal.heal.cpy().lerp(Color.white, 0.2),
                Pal.heal.cpy().lerp(Color.white, 0.3),
                Pal.heal.cpy().lerp(Color.white, 0.4),
                Pal.heal.cpy().lerp(Color.white, 0.5)
        );

    cornal.orbitRadius = 12;
    cornal.orbitTime = 60;
    cornal.rotateTime = 30;
    cornal.bloom = true;
    cornal.accessible = true;
    cornal.hasAtmosphere = true;
    cornal.atmosphereColor = Pal.heal;
    cornal.atmosphereRadIn = 0.001;
    cornal.atmosphereRadOut = 0.3;
    cornal.localizedName = "Cornal";

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
    slagia.localizedName = "Slagia";


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
    const grasiaGenerator = extend(SerpuloPlanetGenerator, {
        getBlock(p){
            this.arr = arrs;
            this.super$getBlock(p);
        }
    });
    grasiaGenerator.arr = arrs;
    const grasia = new Planet("grasia", cornal, 4, 0.8);
    grasia.generator = grasiaGenerator;
    grasia.mesh = new HexMesh(grasia, 8);
    grasia.orbitRadius = 7;
    grasia.orbitTime = 1.5 * 60;
    grasia.rotateTime = 60;
    grasia.bloom = true;
    grasia.accessible = true;
    grasia.hasAtmosphere = true;
    grasia.atmosphereColor = Blocks.grass.mapColor.cpy().mul(Pal.heal);
    grasia.atmosphereRadIn = 0.075;
    grasia.atmosphereRadOut = 0.3;
    grasia.startSector = 1;
    grasia.localizedName = "Grasia";

    const tantrosia = new Planet("tantrosia", sirius, 4, 0.8);
    tantrosia.generator = new TantrosPlanetGenerator();
    tantrosia.mesh = new HexMesh(tantrosia, 8);
    tantrosia.orbitRadius = 4;
    tantrosia.orbitTime = 1.5 * 60;
    tantrosia.rotateTime = 60;
    tantrosia.bloom = true;
    tantrosia.accessible = true;
    tantrosia.hasAtmosphere = true;
    tantrosia.atmosphereColor = Liquids.water.color.cpy().mul(Pal.lancerLaser);
    tantrosia.atmosphereRadIn = 0.075;
    tantrosia.atmosphereRadOut = 0.3;
    tantrosia.startSector = 10;
    tantrosia.alwaysUnlocked = true;
    tantrosia.localizedName = "Tantrosia";

    Planets.sun.accessible = true;
    Planets.sun.localizedName = "[coral]Sun"









    const antarcticaSurvival = new SectorPreset("antarcticaSurvival", tantrosia, 1);
    antarcticaSurvival.captureWave = 60;
    antarcticaSurvival.localizedName = "Antarctica Survival";
    antarcticaSurvival.difficulty = 6;
    antarcticaSurvival.alwaysUnlocked = true;

    const centralBase = new SectorPreset("centralBase", grasia, 6);
    centralBase.captureWave = 55;
    centralBase.localizedName = "Centeral Base";
    centralBase.difficulty = 6;
    centralBase.alwaysUnlocked = true;


    const desertCanyon = new SectorPreset("desertCanyon", grasia, 7);
    desertCanyon.captureWave = 40;
    desertCanyon.localizedName = "Desert Canyon";
    desertCanyon.difficulty = 5;
    desertCanyon.alwaysUnlocked = true;

    const iceBreak = new SectorPreset("iceBreak", tantrosia, 2);
    iceBreak.localizedName = "Ice Break";
    iceBreak.difficulty = 8;
    iceBreak.alwaysUnlocked = true;

    const polarOutpost = new SectorPreset("polarOutpost", tantrosia, 3);
    polarOutpost.localizedName = "Polar Outpost";
    polarOutpost.difficulty = 5;
    polarOutpost.alwaysUnlocked = true;

    const saltirekArchipelago = new SectorPreset("saltirekArchipelago", Planets.serpulo, 4);
    saltirekArchipelago.localizedName = "Saltirek Archipelago";
    saltirekArchipelago.difficulty = 5;
    saltirekArchipelago.alwaysUnlocked = true;

    const saltirekLanding = new SectorPreset("saltirekLanding", Planets.serpulo, 5);
    saltirekLanding.localizedName = "Saltirek Landing";
    saltirekLanding.difficulty = 7;
    saltirekLanding.alwaysUnlocked = true;

    const sporeErosion = new SectorPreset("sporeErosion", Planets.serpulo, 8);
    sporeErosion.localizedName = "Spore Erosion";
    sporeErosion.difficulty = 8;
    sporeErosion.alwaysUnlocked = true;

});
