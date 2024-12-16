import { Gtk } from "astal/gtk3";
import { bind, Variable } from "astal";
import BarButton from "../BarButton";
import icons, { substitutions } from "../../../lib/icons";
import { lookUpIcon } from "../../../lib/utils";

export default () => {
	const focused = bind(Variable("{'title': '', 'app': ''}").poll(1000, ["/home/robert/wayfireconfig/wfctl", "active-view"])).as(j => {
		try {
			return JSON.parse(j);
		} catch (e) {
			return null;
		}
	});

	const activeWindowData = {
		icon: icons.fallback.executable,
		title: "",
	};

	const icon = focused.as((focused) => {
		if (focused) {
			const cls = focused.app;
			activeWindowData.icon = substitutions.icons[cls]
				? substitutions.icons[cls]
				: lookUpIcon(cls)
					? cls
					: icons.fallback.executable;
		}
		return activeWindowData.icon;
	});

	const title = focused.as((focused) => {
		if (focused) activeWindowData.title = focused.title.toString();
		return activeWindowData.title;
	});

	return (
		<revealer
			transitionType={Gtk.RevealerTransitionType.CROSSFADE}
			transitionDuration={300}
			revealChild={focused.as(Boolean)}
		>
			<BarButton className="bar__active-app">
				<box spacing={8}>
					<icon icon={icon} />
					<label label={title} truncate={true} maxWidthChars={24} />
				</box>
			</BarButton>
		</revealer>
	);
};
