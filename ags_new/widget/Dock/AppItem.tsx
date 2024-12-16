import { App, Gtk, Widget } from "astal/gtk3";
import AstalApps from "gi://AstalApps?version=0.1";

export default (app: AstalApps.Application) => {
	const icon = new Widget.Icon({
		icon: app.iconName || "",
	});

	const AppItem = new Widget.Button({
		className: "dock__item",
		on_clicked: () => {
			app.launch();
		},
		setup: (self) => {
			self.add(
				new Widget.Box({
					spacing: 8,
					child: icon,
				}),
			);
		},
	});

	return Object.assign(AppItem, {
		app,
	});
};
