require("outpost");
require("gold-exchanger");
require("music");

let cont;
Events.on(ClientLoadEvent, e => {
  Time.run(10, () => {
    cont = Vars.ui.discord.cont.children.get(2);
    cont.row();
    cont.button("Mindustry Extended Discord", () => Core.app.openURI("https://discord.gg/YB3ky9tJR4"));
  }
} 

 
