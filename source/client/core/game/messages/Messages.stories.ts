import Messages from "./Messages.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Messages} satisfies Meta<typeof Messages>;
export const Default = {
	args: {
		idOfGame: `game-1`,
		messages: [
			{
				author: {
					id: `player-1`,
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
	},
} as const satisfies StoryObj<typeof Messages>;
