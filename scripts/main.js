require("outpost");
require("gold-exchanger");
require("music");

Events.on(ClientLoadEvent, e => {
  Time.run(8, () -> {
    a = Core.scene.find("menu container");
    cont = a.children.get(0);
    cont.row();
    cont.button("discord", () => {
      Core.app.openURI("https://discord.gg/YB3ky9tJR4");
    });
  });
}); 
