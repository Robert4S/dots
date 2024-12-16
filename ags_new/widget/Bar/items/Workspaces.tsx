import { bind, exec, Variable, execAsync } from "astal";
import { App, Gtk, Gdk } from "astal/gtk3";
import BarButton from "../BarButton";
import { range } from "../../../lib/utils";
import BarItem from "../BarItem";

export default () => {
	const ws: number = 9;

	const focusWorkspace = (workspaceId: number) =>
		exec(`/home/robert/wayfireconfig/wfctl set-focus ${workspaceId}`)

	const current = Variable("").poll(100, ["/home/robert/wayfireconfig/wfctl", "active-workspace", "digit"]);
	return (
		<BarItem>
			<box spacing={8}>
				{range(ws, 0).map((i) => {
					return (
						<button
							valign={Gtk.Align.CENTER}
							className={bind(current).as(
								(fw: string) => {
									let f = parseInt(fw);
									return i === f
										? "bar__workspaces-indicator active"
										: "bar__workspaces-indicator";
								},
							)}
							onClicked={() => {
								print(i);
								focusWorkspace(i)
							}}
						/>
					);
				})}
			</box>
		</BarItem>
	);
};
