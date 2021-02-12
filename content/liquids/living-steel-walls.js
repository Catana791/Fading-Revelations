const cd1 = 30;
const cd2 = 20;

const LsW1 = extendContent(Block, "living-steel-wall", {});
LsW1.size = 1;
LsW1.health = 460;
LsW1.update = true;
LsW1.solid = true;
LsW1.blockGround = BlockGroup.walls;

LsW1.buildType = () => extend(Building, { 
  update(){
    if((this.health < 461 && this.timer.get(0, cd2))){
      this.health += 8;
    }
  }
});


const LsW2 = extendContent(Block, "living-steel-wall-2", {});
LsW2.size = 2;
LsW2.health = 1820;
LsW2.update = true;
LsW2.solid = true;
LsW2.blockGround = BlockGroup.walls;

LsW2.buildType = () => extend(Building, { 
  update(){
    if((this.health < 1821 && this.timer.get(0, cd1))){
      this.health += 16;
    }
  } 
});