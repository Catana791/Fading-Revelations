const CfS1 = extendContent(UnitType, "carrier-flagship", {});
CfS1.constructor = () => extend(MechUnit, {});
CfS1.abilities.add(new ForceFieldAbility(20, 5, 2000, 60 * 20));
CfS1.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 5 * 60, 0 / 4, -54 / 4));
CfS1.abilities.add(new UnitSpawnAbility(UnitTypes.flare, 5 * 60, 58 / 4, -54 / 7));
CfS1.abilities.add(new UnitSpawnAbility(UnitTypes.horizon, 5 * 62, 58 / 4, -54 / 4));
CfS1.ammoType = AmmoTypes.powerHigh;
