import Game from "./Game.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Game} satisfies Meta<typeof Game>;
export const Default = {
	args: {
		game: {
			currentPlayer: {
				assignments: [],
				canEscape: false,
				canSummon: false,
				fellowHostiles: null,
				hasAlivePlanner: false,
				hasArrivedToBase: false,
				id: `player-1`,
				idOfPendingPlayer: null,
				idOfPendingTask: null,
				indexOfPendingSlot: null,
				isCaptain: true,
				isDoneVoting: false,
				isKnownToBeDead: false,
				isKnownToBeInJail: false,
				isPlanner: false,
				nameOfAttitude: `Wrogi`,
				nameOfRole: `Kapitan`,
				nameOfSkills: `Medium`,
				plannerCandidates: [],
				summonableDead: [],
				targets: [],
				tasks: [],
				wantsToStart: false,
			},
			id: `game-1`,
			locations: [],
			messages: [
				{
					author: {
						id: `player-1`,
						isKnownToBeDead: false,
						person: {
							gender: `female`,
							name: `Alicja`,
							urlOfPhoto: `https://example.com/photo-1.png`,
						},
						roles: {captain: true, guard: false, planner: false, worker: false},
					},
					id: `message-1`,
					text: `Cześć wszystkim!`,
					timestamp: new Date(1720000000000),
				},
				{
					author: {
						id: `player-2`,
						isKnownToBeDead: false,
						person: {
							gender: `male`,
							name: `Bartek`,
							urlOfPhoto: `https://example.com/photo-2.png`,
						},
						roles: {captain: false, guard: false, planner: true, worker: false},
					},
					id: `message-2`,
					text: `Hej! Gotowi do gry?`,
					timestamp: new Date(1720000060000),
				},
			],
			nameOfState: `Poczekalnia`,
			numberOfRemainingTasks: 0,
			players: [
				{
					id: `player-1`,
					isKnownToBeDead: false,
					person: {
						gender: `female`,
						name: `Alicja`,
						urlOfPhoto: `https://example.com/photo-1.png`,
					},
					roles: {captain: true, guard: false, planner: false, worker: false},
				},
				{
					id: `player-2`,
					isKnownToBeDead: false,
					person: {
						gender: `male`,
						name: `Bartek`,
						urlOfPhoto: `https://example.com/photo-2.png`,
					},
					roles: {captain: false, guard: false, planner: true, worker: false},
				},
			],
			state: `lobby`,
			tasks: null,
			winners: null,
		},
	},
} as const satisfies StoryObj<typeof Game>;
