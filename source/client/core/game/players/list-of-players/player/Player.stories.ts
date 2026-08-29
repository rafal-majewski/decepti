import Player from "./Player.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Player} satisfies Meta<typeof Player>;
export const Default = {
	args: {
		player: {
			id: `player-1`,
			person: {
				gender: `female`,
				name: `Alicja`,
				urlOfPhoto: `https://example.com/photo-1.png`,
			},
			roles: {captain: true, guard: false, planner: false, worker: false},
		},
	},
} as const satisfies StoryObj<typeof Player>;
