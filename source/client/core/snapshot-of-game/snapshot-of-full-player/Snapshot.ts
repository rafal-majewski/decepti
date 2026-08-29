export interface Snapshot {
	readonly attitude: `friendly` | `hostile` | null;
	readonly id: string;
	readonly imprisonment: `escaped` | `free` | `imprisoned`;
	readonly name: string;
	readonly roles: null | {
		readonly captain: boolean;
		readonly guard: boolean;
		readonly planner: boolean;
		readonly worker: boolean;
	};
	readonly skills: null | {
		readonly escapist: boolean;
		readonly medium: boolean;
		readonly trustworthy: boolean;
	};
	readonly stateOfDeath:
		| `alive`
		| `executed`
		| `freshlyMurdered`
		| `ghostOfExecuted`
		| `ghostOfMurdered`
		| `murdered`;
	readonly urlOfPhoto: string;
}
