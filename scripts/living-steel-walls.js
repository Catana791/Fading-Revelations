const cd1 = 25;
const cd2 = 35;

const LsW1 = extendContent(Block, "living-steel-wall", {});
LsW1.update = true;
LsW1.solid = true;
LsW1.blockGround = BlockGroup.walls;

LsW1.buildType = () => extend(Building, { 
  update(){
    if((this.health < 881 && this.timer.get(0, cd2))){
      this.health += 18;
    }
  }
});


const LsW2 = extendContent(Block, "living-steel-wall-2", {});
LsW2.update = true;
LsW2.solid = true;
LsW2.blockGround = BlockGroup.walls;

LsW2.buildType = () => extend(Building, { 
  update(){
    if((this.health < 3321 && this.timer.get(0, cd1))){
      this.health += 36;
    }
  } 
});
