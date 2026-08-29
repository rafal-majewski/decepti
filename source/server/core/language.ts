import type {attitude_} from "./attitude/module.ts";
import type {game_} from "./game/module.ts";
import type {roles_} from "./roles/module.ts";
import type {skills_} from "./skills/module.ts";
export const language = {
	attitudes: {friendly: `Przyjazny`, hostile: `Wrogi`} as const satisfies {
		[AttitudeToUse in attitude_.Attitude]: string;
	},
	noSkills: `brak`,
	roles: {
		captain: `Kapitan`,
		guard: `Strażnik`,
		planner: `Planista`,
		worker: `Pracownik`,
	} as const satisfies {[RoleToUse in roles_.Role]: string},
	skills: {
		escapist: `Uciekinier`,
		medium: `Medium`,
		trustworthy: `Godny zaufania`,
	} as const satisfies {[SkillToUse in keyof skills_.Skills]: string},
	states: {
		discussing: `Narada`,
		end: `Koniec gry`,
		lobby: `Poczekalnia`,
		maintaining: `Utrzymanie`,
		planning: `Planowanie`,
		returning: `Powrót do bazy`,
	} as const satisfies {[StateToUse in game_.state_.State]: string},
};
