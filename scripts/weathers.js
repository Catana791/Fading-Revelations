const Weathers = this.global.WEATHERS;

const HealingWinds = extendContent(ParticleWeather, "healing-winds", {});
Storm.yspeed = 3.5;
Storm.xspeed = 19.6;
Storm.padding = 20;
Storm.density = 4100;
Storm.minAlpha = 0.0;
Storm.maxAlpha = 0.38;
Storm.sizeMin = 8.0;
Storm.sizeMax = 16.0;
Storm.baseSpeed = 2.4;
Storm.force = 0.31;
Storm.opacityMultiplier = 0.6;
Storm.color = Storm.noiseColor = Color.valueOf("#36bd58");
Storm.attrs.set(Attribute.light, 1.3);
Storm.attrs.set(Attribute.heat, -0.25);
Storm.attrs.set(Attribute.oil, -0.05);

W.healingWinds = HealingWinds;


const RadioactiveWinds = extendContent(ParticleWeather, "radioactive-winds", {});
Storm.yspeed = -3.5;
Storm.xspeed = -1.6;
Storm.padding = 20;
Storm.density = 3000;
Storm.minAlpha = 0.0;
Storm.maxAlpha = 0.38;
Storm.sizeMin = 9.0;
Storm.sizeMax = 20.0;
Storm.baseSpeed = 4.4;
Storm.force = 0.61;
Storm.opacityMultiplier = 0.6;
Storm.color = Storm.noiseColor = Color.valueOf("#420420");
Storm.attrs.set(Attribute.light, -0.3);
Storm.attrs.set(Attribute.heat, 1.25);
Storm.attrs.set(Attribute.oil, 0.05);

W.radioactiveWinds = RadioactiveWinds;
