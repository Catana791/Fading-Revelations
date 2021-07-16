handleStack(item, amount, source){
  var realAmount = Math.min(amount, this.storageCapacity - this.items.get(item));
  this.super$handleStack(item, realAmount, source);

  if(this.team == Vars.state.rules.defaultTeam && Vars.state.isCampaign()){
    Vars.state.rules.sector.info.handleCoreItem(item, amount);

    if(realAmount == 0){
      Fx.coreBurn.at(x, y);
      }
   }
}
