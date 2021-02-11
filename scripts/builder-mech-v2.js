const Bmv = extendContent(UnitType, "builder-mech-v2", {});

Bmv.constructor = () => extend(UnitEntity, {});
Bmv.abilities.add(new StatusFieldAbility(StatusEffect.overclock, 60 * 2, 64 * 3.5, 32));