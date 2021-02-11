const BmV2 = extendContent(UnitType, "builder-mech-v2", {});
BmV2.constructor = () => extend(MechUnit, {});
BmV2.abilities.add(new ForceFieldAbility(12, 0.13, 260, 80 * 5));
BmV2.abilities.add(new ShieldRegenFieldAbility(8, 120, 80, 10));
BmV2.ammoType = AmmoTypes.power;