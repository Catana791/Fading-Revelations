const goldItem = extend(Block, "gold-exchanger", {
  init(){
    this.super$init();
    outputs = {};
    outputs[Items.surgeAlloy] = 5
    outputs[Items.copper] = 10
  }
});

goldItem.buildType = extend(Building, goldItem, {
  selection: Items.copper,
  buildConfiguration(table){
    ItemSelection.buildTable(table, Vars.content.items(), () -> this.selection, e -> this.configure);
  },
  updateTile(){
    this.super$updateTile();
    var gold = Vars.content.get(ContentType.item, "gold");
    if(this.selection != null && this.items.has(gold) && this.items.get(gold) >= 1){
      this.items.remove(gold, 1);
      this.items.add(this.selection, this.block.outputs[selection]);
    }
  }
});
