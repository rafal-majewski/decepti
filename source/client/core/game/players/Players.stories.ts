import Players from "./Players.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Players} satisfies Meta<typeof Players>;
export const Default = {
	args: {
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
	},
} as const satisfies StoryObj<typeof Players>;
