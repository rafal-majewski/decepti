import {resolve} from "$app/paths";
import type {client_} from "../../../../client/module.ts";
import type {gender_} from "../../gender/module.ts";
export class Person {
	public constructor(gender: gender_.Gender, name: string, photo: File) {
		this.gender = gender;
		this.name = name;
		this.photo = photo;
	}
	public readonly gender: gender_.Gender;
	public readonly name: string;
	public readonly photo: File;
	public snapshotify(
		idOfGame: string,
		id: string,
	): client_.core_.snapshotOfGame_.snapshotOfPlayer_.snapshotOfPerson_.Snapshot {
		const snapshotOfThis: client_.core_.snapshotOfGame_.snapshotOfPlayer_.snapshotOfPerson_.Snapshot =
			{
				gender: this.gender,
				name: this.name,
				urlOfPhoto: resolve(`/game/${idOfGame}/players/${id}/photo`),
			};
		return snapshotOfThis;
	}
}
