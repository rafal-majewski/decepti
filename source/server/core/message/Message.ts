import type {client_} from "../../../client/module.ts";
import {generatingRandomId_} from "../../../generating-random-id/module.ts";
import type {player_} from "../player/module.ts";
export class Message {
	public static createNew(data: {
		readonly idOfAuthor: player_.Player[`id`];
		readonly text: string;
	}): Message {
		const message: Message = new Message(
			data.idOfAuthor,
			generatingRandomId_.generate(),
			data.text,
			new Date(),
		);
		return message;
	}
	public constructor(
		idOfAuthor: string,
		id: string,
		text: string,
		timestamp: Date,
	) {
		this.idOfAuthor = idOfAuthor;
		this.id = id;
		this.text = text;
		this.timestamp = timestamp;
	}
	public readonly id: string;
	public readonly idOfAuthor: string;
	public snapshotify(
		author: client_.core_.snapshotOfGame_.snapshotOfPlayer_.Snapshot,
	): client_.core_.snapshotOfGame_.snapshotOfMessage_.Snapshot {
		const snapshotOfThis: client_.core_.snapshotOfGame_.snapshotOfMessage_.Snapshot =
			{author: author, id: this.id, text: this.text, timestamp: this.timestamp};
		return snapshotOfThis;
	}
	public readonly text: string;
	public readonly timestamp: Date;
}
