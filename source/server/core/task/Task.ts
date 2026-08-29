import type {client_} from "../../../client/module.ts";
import {location_} from "../location/module.ts";
export class Task {
	public constructor(id: string, idOfLocation: string) {
		this.id = id;
		this.idOfLocation = idOfLocation;
	}
	public readonly id: string;
	public readonly idOfLocation: string;
	public snapshotify(): client_.core_.snapshotOfGame_.snapshotOfTask_.Snapshot {
		const idOfLocation: string = this.idOfLocation;
		const location: location_.Place | undefined = location_.locations.find(
			function findLocation(locationToFind: location_.Place): boolean {
				return locationToFind.id === idOfLocation;
			},
		);
		return {
			id: this.id,
			idOfLocation: this.idOfLocation,
			nameOfLocation: location?.name ?? this.idOfLocation,
		};
	}
}
