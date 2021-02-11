const CfS1 = extendContent(UnitType, "carrier-flagship", {});
CfS1.constructor = () => extend(MechUnit, {});
CfS1.abilities.add(new ForceFieldAbility(80, 5, 2000, 60 * 20));
CfS1.abilities.add(new UnitSpawnAbility(UnitTypes.mono, monoSec * 60, 58 / 4, 54 / 4));
CfS1.abilities.add(new UnitSpawnAbility(UnitTypes.flare, flareSec * 60, 58 / 4, 54 / 7));
CfS1.ammoType = AmmoTypes.powerHigh;
