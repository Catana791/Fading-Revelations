const outpost = extend(StorageBlock, "outpost", {});

outpost.buildType = () => extend(StorageBlock.StorageBuild, outpost, {
  displayReact(table){
    this.super$displayReact(table);
  },
  
  craft(a, b){
    this.super$craft(a, b);
  },

  acceptItem(source, item){
    var core = this.team.core().building;
    return core != null ? core.acceptItem(source, item) : this.items.get(item) < this.getMaximumAccepted(item);
  },

  removeStack(item, amount){
    var core = this.team.core();
    var result = this.super$removeStack(item, amount);

    if(core != null && this.team == Vars.state.rules.defaultTeam && Vars.state.isCampaign()){
      Vars.state.rules.sector.info.handleCoreItem(item, -result);
    }

    return result;
  },

  handleItem(source, item){
    var core = this.team.core().building;
    if(core != null){
      if(core.items.get(item) >= core.storageCapacity){
        this.block.incinerateEffect(this, source);
      }
      core.handleItem(source, item);
    }else{
      this.super$handleItem(source, item);
    }
  },

  itemTaken(item){
    var core = this.team.core();
    if(core != null){
      core.itemTaken(item);
    }
  }
});
