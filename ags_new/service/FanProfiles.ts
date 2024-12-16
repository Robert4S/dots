import { exec, execAsync, GObject, Variable } from "astal";
import { dependencies } from "../lib/utils";

const FAN_REGISTER = 0x61;

export enum FanProfile {
	Silent = 1,
	Standart = 0,
	Performance = 2,
}

const profileBinding = {
	1: "battery",
	0: "balanced",
	2: "performance",
};

const available = true;

export const profileName = (profile: FanProfile) => {
	const profileName = profileBinding[profile];
	return profileName.charAt(0).toUpperCase() + profileName.slice(1);
};

const setPowerProfile = (profile: FanProfile) => {
	let p;
	switch (profile) {
		case 0:
			p = "balanced";
			break;
		case 1:
			p = "power-saver";
			break;
		case 2:
			p = "performance";
			break;
	}
	exec(`powerprofilesctl set ${p}`)
}

class FanProfileService extends GObject.Object {
	getProfile = () => {
		const result = exec("powerprofilesctl get");
		let profile: FanProfile = undefined as any;
		switch (result) {
			case "balanced":
				profile = 0 as FanProfile;
				break;
			case "power-saver":
				profile = 1 as FanProfile;
				break;
			case "performance":
				profile = 2 as FanProfile;
				break;
		}
		return profile;
	};

	#profile: FanProfile = this.getProfile();

	get profile() {
		return this.#profile;
	}

	get profiles(): FanProfile[] {
		return [1, 0, 2];
	}

	async nextProfile() {
		this.#profile++;
		if (this.#profile > 2) this.#profile = 0;
		setPowerProfile(this.#profile);
		this.notify("profile");
	}

	async prevProfile() {
		this.#profile--;
		if (this.#profile < 0) this.#profile = 2;
		setPowerProfile(this.#profile);
		this.notify("profile");
	}

	async setProfile(profile: FanProfile) {
		let p;
		switch (profile) {
			case 0:
				p = "balanced";
				break;
			case 1:
				p = "power-saver";
				break;
			case 2:
				p = "performance";
				break;
		}
		exec(`powerprofilesctl set ${p}`)
		this.#profile = profile;
		this.notify("profile");
	}
}

const FanProfileServiceRegister = GObject.registerClass(
	{
		GTypeName: "FanProffileService",
		Properties: {
			profile: GObject.ParamSpec.int(
				"profile",
				"Profile",
				"A fan-profile property",
				GObject.ParamFlags.READWRITE,
				0,
				2,
				0,
			),
		},
		Signals: {},
	},
	FanProfileService,
);

var service: FanProfileService | null = null;

if (available) {
	service = new FanProfileServiceRegister();
}

export default service;
