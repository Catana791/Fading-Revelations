const outpost = extend(StorageBlock, "outpost", {});

outpost.building = extend(StorageBlock.StorageBuild, outpost, {
  displayReact(table){
    this.super$displayReact(table);
  },
  
  craft(a, b){
    this.super$craft(a, b);
  },

  handleStack(item, amount, source){
    Log.info("S1: " + source);
    Log.info("I1: " + item);
    Log.info("A1: " + amount);
    var realAmount = Math.min(amount, this.storageCapacity - this.items.get(item));
    this.super$handleStack(item, realAmount, source);

    if(this.team == Vars.state.rules.defaultTeam && Vars.state.isCampaign()){
      Vars.state.rules.sector.info.handleCoreItem(item, amount);

      if(realAmount == 0){
        Fx.coreBurn.at(x, y);
      }
    }
  },

  handleItem(source, item){
    Log.info("S2: " + source);
    Log.info("I2: " + item);
    if(Vars.net.server() || !Vars.net.active()){
      if(this.team == Vars.state.rules.defaultTeam && Vars.state.isCampaign()){
        Vars.state.rules.sector.info.handleCoreItem(item, 1);
      }

      if(this.items.get(item) < this.storageCapacity){
        this.super$handleItem(source, item);
      }
    }
  }
});
