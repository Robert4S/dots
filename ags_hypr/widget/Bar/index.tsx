import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Workspaces, WorkspacesSimple } from "./items/Workspaces";
import { spacing } from "../../lib/variables";
import ActiveApp from "./items/ActiveApp";
import Clock from "./items/Clock";
import Battery from "./items/Battery";
import Tray from "./items/Tray";
import SystemIndicators from "./items/SystemIndicators";
import Notifications from "./items/Notifications";
import AppLauncher from "./items/AppLauncher";
import KeyboardLayout from "./items/KeyboardLayout";
import Weather from "./items/Weather";
import RecordingIndicator from "./items/RecordingIndicator";
import { Variable, bind } from "astal";

const Start = () => {
	return (
		<box halign={Gtk.Align.START} spacing={spacing}>
			<AppLauncher />
			<Workspaces />
			<ActiveApp />
		</box>
	);
};

const Center = () => {
	return (
		<box spacing={spacing}>
			<Clock />
		</box>
	);
};

const End = () => {
	return (
		<box halign={Gtk.Align.END} spacing={spacing}>
			<RecordingIndicator />
			<Weather />
			<KeyboardLayout />
			<box className="bar__rounded-box" spacing={spacing / 2}>
				<Notifications />
				<Tray />
				<SystemIndicators />
			</box>
			<Battery />
		</box>
	);
};
const StartSimple = () => {
	return (
		<box halign={Gtk.Align.START} spacing={spacing}>
		</box>
	);
};

const CenterSimple = () => {
	return (
		<box spacing={spacing}>
			<WorkspacesSimple />
		</box>
	);
};

const EndSimple = () => {
	return (
		<box halign={Gtk.Align.END} spacing={spacing}>
			<Clock />
		</box>
	);
};

export const barMode = Variable("normal");

export function Bar(gdkmonitor: Gdk.Monitor) {
	const contents = bind(barMode).as((m: string) => {
		if (m == "normal") {
			return <centerbox className="bar" valign={Gtk.Align.CENTER}>
				<Start />
				<Center />
				<End />
			</centerbox>

		} else if (m == "simple") {
			return <centerbox className="bar_simple" valign={Gtk.Align.CENTER}>
				<StartSimple />
				<CenterSimple />
				<EndSimple />
			</centerbox>
		}
	})
	return (
		<window
			vexpand={true}
			className="Bar"
			namespace="bar"
			name="bar"
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={
				Astal.WindowAnchor.TOP |
				Astal.WindowAnchor.LEFT |
				Astal.WindowAnchor.RIGHT
			}
			application={App}
		>
			{contents}

		</window>
	);
}
