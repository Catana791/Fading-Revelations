const goldItem = extend(Block, "gold-exchanger", {
  init(){
    this.super$init();

    this.outputs = {};
    this.outputs[Items.surgeAlloy] = 5;
    this.outputs[Items.copper] = 10;
    this.itemAccepts = [Items.copper, Items.surgeAlloy];
    this.craftTimer = this.timers++;
  }
});

goldItem.buildType = extend(Building, goldItem, {
  selection: Items.copper,

  buildConfiguration(table){
    ItemSelection.buildTable(table, this.block.itemAccepts, () => this.selection, e => this.configure);
  },

  acceptItem(source, item){
    return item in this.block.outputs;
  },

  updateTile(){
    this.super$updateTile();

    var gold = Vars.content.get(ContentType.item, "gold");

    if(this.timer(this.block.craftTimer, 60) && this.selection != null && this.items.has(gold) && this.items.get(gold) >= 1){
      this.items.remove(gold, 1);
      this.items.add(this.selection, this.block.outputs[selection]);
    }
  }
});
