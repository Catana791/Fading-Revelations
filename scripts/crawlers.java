cryo-crawler = new UnitType("cryo-crawler"){{
            aiController = SuicideAI::new;

            speed = 1f;
            hitSize = 8f;
            health = 200;
            mechSideSway = 0.25f;
            range = 40f;
            ammoType = new ItemAmmoType(Items.coal);

            weapons.add(new Weapon(){{
                shootOnDeath = true;
                reload = 24f;
                shootCone = 180f;
                ejectEffect = Fx.none;
                shootSound = Sounds.explosion;
                x = shootY = 0f;
                mirror = false;
                bullet = new BulletType(){{
                    collidesTiles = false;
                    collides = false;
                    hitSound = Sounds.explosion;

                    rangeOverride = 30f;
                    hitEffect = Fx.pulverize;
                    speed = 0f;
                    splashDamageRadius = 55f;
                    instantDisappear = true;
                    splashDamage = 90f;
                    killShooter = true;
                    hittable = false;
                    collidesAir = true;
                }};
            }});
        }};
    )
)
