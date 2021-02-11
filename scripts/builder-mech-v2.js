const bmv2 = extendContent(UnitType, "builder-mech-v2,{});
bmv2.constructor = () => extend(UnitAirMove, {});
bmv2.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
bmv2.ammoType = AmmoTypes.power;
