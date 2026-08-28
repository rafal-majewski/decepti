import {resolve} from "$app/paths";
import type {client_} from "../../../client/module.ts";
import {generatingRandomId_} from "../../../generating-random-id/module.ts";
import type {gender_} from "../gender/module.ts";
export class Player {
	public static createNew(data: {
		readonly gender: gender_.Gender;
		readonly name: string;
		readonly photo: File;
	}): Player {
		const player: Player = new Player(
			data.gender,
			generatingRandomId_.generate(),
			data.name,
			data.photo,
		);
		return player;
	}
	public constructor(
		gender: gender_.Gender,
		id: string,
		name: string,
		photo: File,
	) {
		this.gender = gender;
		this.id = id;
		this.name = name;
		this.photo = photo;
	}
	public readonly gender: gender_.Gender;
	public readonly id: string;
	public readonly name: string;
	public readonly photo: File;
	public snapshotify(
		idOfGame: string,
	): client_.core_.snapshotOfPlayer_.Snapshot {
		const snapshotOfThis: client_.core_.snapshotOfPlayer_.Snapshot = {
			gender: this.gender,
			id: this.id,
			name: this.name,
			urlOfPhoto: resolve(`/game/${idOfGame}/players/${this.id}/photo`),
		};
		return snapshotOfThis;
	}
}
