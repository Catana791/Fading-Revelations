//code from NickName73/Gravillaso

const ui = {
	// Functions to be called when atlas is ready
	loadEvents: [],
	// Functions to be called when the mouse is clicked
	clickEvents: [],
	areas: {},
	// Custom drawing functions
	effects: [],
	// Dialog used to show any runtime errors
	errors: null,
	// Dialog used to select items from a list
	selection: null,
	// if the loadEvents have started processing
	loaded: false
};

/** UTILITY FUNCTIONS **/

/* Run a function when the client loads, or now if it already has. */
ui.onLoad = func => {
	if (ui.loaded) {
		func();
	} else {
		ui.loadEvents.push(func);
	}
};

/* Run events to add UI and stuff when assets are ready. */
ui.load = () => {
	var table;
	for (var i in ui.areas) {
		table = new Table();
		table.fillParent = true;
		table.visibility = () => !Vars.ui.minimapfrag.shown();
		ui.areas[i].table = table;
		ui.areas[i].init(table);
	}

	ui.loaded = true;
	for (var e of ui.loadEvents) e();
	ui.loadEvents = [];

	var area;
	for (var i in ui.areas) {
		area = ui.areas[i];
		// Sort the cells by name
		area.table.cells.sortComparing(cell => {
			const name = cell.get().name;
			return name[0] == '$' ? Core.bundle.get(name.substr(1)) : name;
		});

		area.post(area.table);
		// Add the UI elements to the HUD by default
		if (area.group !== null) {
			(area.group || Vars.ui.hudGroup).addChild(area.table);
		}
	}
};

ui.getIcon = (icon) => {
	// () => Icon.leftSmall
	if (typeof(icon) == "function") {
		icon = icon();
	}
	// "admin" / "error"
	if (typeof(icon) == "string") {
		try {
			icon = Icon[icon]
		} catch (e) {
			icon = Core.atlas.find(icon);
		}
	}
	// Blocks.duo
	if (icon instanceof UnlockableContent) {
		icon = icon.icon(Cicon.full);
	}
	// Core.atlas.find("error")
	if (icon instanceof TextureRegion) {
		icon = new TextureRegionDrawable(icon);
	}
	// Hopefully its a Drawable by now
	return icon;
};

/* Area is an object with these functions:
	void init(Table):
		Called before any loadEvents.
		Argument is a shortcut for this.table.
	void post(Table):
		Called after all loadEvents but before the area is added to the HUD.
		Argument is a shortcut for this.table.
	void added(Table): (Optional)
		Called when a new table is added by ui.addTable. */
ui.addArea = (name, area) => {
	ui.areas[name] = area;
};

/** UI FUNCTIONS **/

/* Add a table to an area
	String area:
		Index to ui.areas that serves as the root.
		See areas.js.
	String name:
		Name of the table, used for sorting.
	void user(Table):
		Called when the table is created. */
ui.addTable = (area, name, user) => {
	ui.onLoad(() => {
		try {
			const root = ui.areas[area].table;
			const table = new Table();
			root.add(table).name(name);
			root.row();
			if (ui.areas[area].added) {
				ui.areas[area].added(table);
			}
			user(table);
		} catch (e) {
			ui.showError("Failed to add table " + name + " to area " + area, e);
		}
	});
};

/* Add a button to the top left.
	String name:
		Name of the button, used for sorting.
	Drawable icon:
		The icon of the button.
		Use Icon.xxx, a TextureRegion, UnlockableContent or String.
	void clicked(ImageButton):
		Called when the button is clicked.
	void user(Cell): (Optional)
		Called when the button is created. */
ui.addButton = (name, icon, clicked, user) => {
	ui.onLoad(() => {
		try {
			icon = ui.getIcon(icon);
			const cell = ui.areas.buttons.table.button(icon, Styles.clearTransi, 45, ()=>{});
			cell.name(name);
			const button = cell.get();
			if (clicked) {
				button.clicked(() => {
					/* UI crashes are only printed to stdout, not a crash log */
					try {
						clicked(button);
					} catch (e) {
						ui.showError("Error when clicking button " + name, e);
					}
				});
			}
			if (user) user(cell);
		} catch (e) {
			ui.showError("Failed to add button " + name, e);
		}
	});
};

/* Shortcut for adding an ImageTextButton to the menu area */
ui.addMenuButton = (name, icon, clicked, user) => {
	ui.addTable("menu", name, t => {
		t.button(name, ui.getIcon(icon), clicked).height(48).size(210, 84);
		if (user) user(t);
	});
};

/* Add a custom drawing functiom.
	function(int w, int h) effect:
		Called every frame in-game like a block's draw().
		Coordinates are in screen space, not world space.
		Textures are drawn at block scale.
		For convenience, w and h are the screen's width and height.
	boolean visible():
		Whether to draw the effect or not.
		By default only draws when in-game. */
ui.addEffect = (effect, visible) => {
	ui.effects.push({
		draw: effect,
		visible: visible || (() => {
			return !Vars.state.is(GameState.State.menu);
		})
	});
	return ui.effects.length - 1;
};

/** EXTRA UTILITIES */

/* Call the handler when the mouse is clicked somewhere.
	void handler(Vec2 screen, Vec2 world, boolean hasMouse):
		Called once when a mouse click is received.
		If the player clicked a UI element and !world, hasMouse is true.
	boolean world = false:
		Whether to ignore clicks that are over UI elements.
	Returns the index to ui.clickEvents should you need to cancel it,
	 use delete ui.clickEvents[index] if so. */
ui.click = (handler, world) => {
	ui.clickEvents.push({
		handler: handler,
		world: world
	});
	return ui.clickEvents.length - 1;
}

/* Show an error dialog.
	Similar to Vars.ui.showErrorMessage but it is only built once.
	String msg: Info about when the error was caught.
		Prepended to error, or used on its own if error is null.
	String/Exception error: message to show in the center of the dialog. */
ui.showError = (msg, error) => {
	if (error) {
		if (typeof(error) == "object") {
			error = error.message + "\n" + error.fileName + ": " + error.lineNumber;
		}

		msg = msg + ": " + error;
	}

	Log.err(msg);
	Core.app.post(() => {
		ui.errors.set(msg);
		ui.errors.show();
	});
};

/* TextAreas can't get newlines on Android, use the native text input.
	Does nothing on desktop.
	Not very useful for TextFields.
	TextField area:
		Field to get input for.
	void accepted(String text):
		Ran when the input is accepted.
	Object params / Object params():
		If a function, uses the output of that function.
		Fields of Input$TextInput that override the defaults of:
			multiline: true,
			accepted: set area.text and run accepted */
ui.mobileAreaInput = (area, accepted, params) => {
	if (!Vars.mobile) return;

	/* Constant params */
	if (typeof(params) != "function") {
		params = () => params;
	}

	area.update(() => {
		if (Core.scene.keyboardFocus == area) {
			Core.scene.keyboardFocus = null;

			const input = new Input.TextInput;
			input.multiline = true;
			input.accepted = text => {
				area.text = text;
				accepted(text);
			};
			Object.assign(input, params(area));

			Core.input.getTextInput(input);
		}
	});
};

/* Have the user select an option from a list.
	Values can be any type, but must be String[] if names isn't set.
	String title:
		Title of the dialog.
	Object[] values:
		Values returned when clicking a button.
	void selector(Object):
		Called when the user pressed a button.
		Object is values[i].
	String[] names / String names(int i, Object value):
		Array of names used in place of values.
		If a function, the name of a button will be the return value of it.
		Value is values[i] and i is the button index in the list. */
ui.select = (title, values, selector, names) => {
	if (values instanceof Seq) {
		values = values.toArray();
	}

	if (!names) names = values;
	if (typeof(names) != "function") {
		const arr = names;
		names = i => arr[i];
	}

	Core.app.post(() => {
		ui.selection.rebuild(title, values, selector, names);
		ui.selection.show();
	});
}

module.exports = ui;
if (typeof(cons) == "undefined") {
	const cons = method => extend(Cons, {get: method});
}

/* Create all the areas */

// To the right of the wave info / mobile buttons
ui.addArea("buttons", {
	init(buttons) {
		buttons.top().left();
		// Be obviously modded
		buttons.defaults().size(45).left();
		buttons.visibility = () => Vars.ui.hudfrag.shown && !Vars.ui.minimapfrag.shown();
	},

	post(buttons) {
		// Edges around buttons
		const count = buttons.cells.size;
		if (count == 0) return;

		// Not sure why this is needed
		Core.app.post(() => {
			// 5 buttons in vanilla mobile, same width as the wave fragment
			// float HudFragment#dsize = 65f;
			buttons.marginLeft(65 * 5 + 4);
			if (!Vars.mobile) {
				const info = Core.scene.find("fps/ping");
				info.update(() => {
					info.translation.y = -Scl.scl(45 + 4);
				});
			}
		});

		/* Add edges around the buttons */
		buttons.image().color(Pal.gray).width(4).fillY()
			.get().touchable = Touchable.disabled;
		buttons.row();
		buttons.image().color(Pal.gray).size(45 * count + 4, 4).left()
			.colspan(buttons.columns).get().touchable = Touchable.disabled;
	}
});

// Under the FPS counter.
ui.addArea("top", {
	init(top) {
		top.top().left().marginTop(65 + 54).marginLeft(65 * 5 + 16);
		top.defaults().top().left().padBottom(8);
	},
	post(top) {},
	added(table) {
		if (this.first) {
			// avoid some clutter on the screen
			ui.addButton("!!!top-visibility", Icon.upOpen, button => this.toggle(button));
			this.first = false;
		}
		table.visibility = () => this.shown;
	},

	toggle(button) {
		button.style.imageUp = this.shown ? Icon.upOpen : Icon.downOpen
		this.shown = !this.shown;
	},

	first: true,
	shown: false
});

ui.addArea("side", {
	init(side) {
		const base = Vars.mobile ? 65 * 2 : 65;
		const mtop = base + 130 + 8;
		side.top().left().marginTop(mtop).marginLeft(8);
		side.defaults().top().left().padBottom(8);
	},
	post(side) {},
	added(table) {
		if (this.first) {
			// avoid some clutter on the screen
			ui.addButton("!!!side-visibility", Icon.leftOpen, button => this.toggle(button));
			this.first = false;
		}
		table.visibility = () => this.shown;
	},

	toggle(button) {
		button.style.imageUp = this.shown ? Icon.leftOpen : Icon.rightOpen
		this.shown = !this.shown;
	},
	first: true,
	shown: false
});
// Logical alias
ui.areas.left = ui.areas.side;

ui.addArea("bottom", {
	init(bottom) {
		bottom.bottom().left();
	},
	post() {}
});

/* Button to open a dialog only visible from the menu screen */
ui.addArea("menu", {
	init(table) {
		this.dialog = new BaseDialog("Gravilasso");
		this.dialog.addCloseButton();

		const pane = new ScrollPane(table);
		table.defaults().pad(6);
		this.dialog.cont.add(pane).grow();

		if (Vars.mobile) {
			var parent = new WidgetGroup();
			parent.fillParent = true;
			parent.touchable = Touchable.childrenOnly;
			Vars.ui.menuGroup.addChild(parent);
			this.mobileButton(parent);
		} else {
			this.desktopButton(Vars.ui.menuGroup.children.get(0));
		}
	},

	post() {},

	buildDesktop(parent) {
		// Basically clearMenut
		const style = new TextButton.TextButtonStyle(Styles.cleart);
		style.up = Tex.clear;
		style.down = Styles.flatDown;

		// menufrag.container's first table
		const buttons = parent.children.get(1).cells.get(1).get();
		/* Specialized version of menufrag.buttons(buttons, new Buttoni(...)) */
		buttons.button("$ui.more", Icon.link, style, () => {
			this.dialog.show();
		}).marginLeft(11);
	},

	desktopButton(parent) {
		if (Core.assets.progress != 1) {
			Core.app.post(() => {
				this.desktopButton(parent);
			});
			return;
		}

		// ClientLauncher has a 6-long post snek, one-up it.
		Time.run(7, () => {
			this.buildDesktop(parent);
			Events.on(ResizeEvent, () => {
				this.buildDesktop(parent);
			});
		});
	},

	mobileButton(parent) {
		const style = new TextButton.TextButtonStyle(
			Tex.buttonEdge4,
			Tex.buttonEdgeOver4,
			Tex.buttonEdge4,
			Fonts.def);

		parent.fill(cons(button => {
			button.button("$ui.more", () => this.dialog.show())
				.top().left().grow().size(110, 45).get().setStyle(style);
		}));
	},

	group: null,

	dialog: null
});
Events.run(Trigger.uiDrawBegin, () => {
	const w = Core.graphics.width, h = Core.graphics.height;

	Draw.proj(Core.scene.camera);

	for (var i in ui.effects) {
		var effect = ui.effects[i];
		if (effect.visible()) {
			effect.draw(w, h);
		}
	}

	Draw.flush();
});
const world = new Vec2();

Events.run(Trigger.update, () => {
	if (!Core.input.justTouched()) {
		return;
	}

	// Position in the mindustry world
	world.set(Core.input.mouseWorld());
	// 0, 0 to w, h
	const pos = Core.input.mouse();
	const hasMouse = Core.scene.hasMouse();

	ui.clickEvents = ui.clickEvents.filter(event => {
		// Mod cancelled the event
		if (!event) return;
		// Clicked over a UI element, try again next time
		if (event.world && hasMouse) return true;

		return event.handler(pos, world, hasMouse);
	});
});
ui.onLoad(() => {
	var error;
	const dialog = extend(Dialog, "", {
		set(msg) {
			error.text = msg;
		}
	});

	const table = dialog.cont;
	table.fillParent = true;
	table.margin(15);
	table.add("$error.title");
	table.row();
	table.image().size(300, 4).pad(2).color(Color.scarlet);
	table.row();
	table.pane(t => {
		error = t.add("Success").pad(2).growX().wrap().get();
		error.alignment = Align.center;
	}).size(400, 300);
	table.row();
	table.button("$ok", () => dialog.hide()).size(120, 50).pad(4);

	ui.errors = dialog;
});
ui.onLoad(() => {
	const dialog = extend(BaseDialog, "<title>", {
		rebuild(title, values, selector, names) {
			this.cont.clear();
			this.title.text = title;

			this.cont.pane(t => {
				for (var i in values) {
					const key = i;
					t.button(names(i, values[i]), () => {
						selector(values[key]);
						this.hide();
					}).growX().pad(8);
					t.row();
				}
			}).size(400, 350);
		}
	});
	dialog.addCloseButton();
	ui.selection = dialog;
});


global.ui = ui;
Events.on(ClientLoadEvent, ui.load);