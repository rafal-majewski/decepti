import {generatingRandomId_} from "../../../generating-random-id/module.ts";
export interface Place {
	readonly id: string;
	readonly name: string;
}
export const locations: Place[] = [
	{id: `lawki`, name: `Ławki`},
	{id: `kontener`, name: `Kontener`},
	{id: `carlos`, name: `Carlos`},
	{id: `mikroplastik`, name: `Mikroplastik`},
	{id: `lapki`, name: `Łapki`},
	{id: `stacja`, name: `Stacja`},
	{id: `boule`, name: `Boule`},
	{id: `tablica`, name: `Tablica`},
];
export function addLocation(name: string): void {
	const place: Place = {id: generatingRandomId_.generate(), name: name};
	locations.push(place);
	return;
}
export function removeLocation(id: string): void {
	const index: number = locations.findIndex(function findLocation(
		place: Place,
	): boolean {
		return place.id === id;
	});
	if (index >= 0) {
		locations.splice(index, 1);
	} else {
		/* empty */
	}
	return;
}
