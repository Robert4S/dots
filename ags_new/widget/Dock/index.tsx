import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk3";
import { spacing } from "../../lib/variables";
import { Variable, bind } from "astal";
import AstalApps from "gi://AstalApps?version=0.1";
import AppItem from "./AppItem";
//import KeyboardLayout from "./items/KeyboardLayout";
const dockHovered = Variable(false);
const apps = new AstalApps.Apps();

export function toggleWindow2(windowName: string) {
	const foundWindow = App.get_window(windowName);

	if (!foundWindow) {
		return;
	}

	foundWindow.set_visible(!foundWindow.visible);
}

export function HoverArea(gdkmonitor: Gdk.Monitor) {
	const dock = App.get_window("dock");
	const areaHovered = Variable(false);
	const toggleDock = () => {
		if (areaHovered.get()) {
			dock?.set_visible(true);
		}
	}

	const maybeDisableDock = () => {
		if (dockHovered.get()) {
			return;
		}
		dock?.set_visible(false);
	}

	return (<window
		vexpand={true}
		className="Bar"
		namespace="hover-area"
		name="hover-area"
		gdkmonitor={gdkmonitor}
		exclusivity={Astal.Exclusivity.NORMAL}
		anchor={
			Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT
		}
		application={App}
	>
		<eventbox onHover={() => { areaHovered.set(true); setTimeout(toggleDock, 300) }} onHoverLost={() => { areaHovered.set(false); setTimeout(maybeDisableDock, 500) }}>

		</eventbox>

	</window >
	)
}
export function Dock(gdkmonitor: Gdk.Monitor, dockItems: string[]) {
	const items = dockItems.map(i => apps.exact_query(i).map((app: AstalApps.Application) => AppItem(app)).at(0))

	return (
		<window
			vexpand={true}
			className="Bar"
			namespace="dock"
			name="dock"
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.NORMAL}
			anchor={
				Astal.WindowAnchor.BOTTOM
			}
			application={App}
		>
			<eventbox onHover={() => dockHovered.set(true)} onHoverLost={() => { dockHovered.set(false); toggleWindow2("dock") }}>
				<box className="dock" valign={Gtk.Align.CENTER}>
					{items}

				</box>
			</eventbox>

		</window>
	);
}
