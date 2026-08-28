import Players from "./Players.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Players} satisfies Meta<typeof Players>;
export const Default = {
	args: {
		players: [
			{
				gender: `female`,
				id: `player-1`,
				name: `Alicja`,
				urlOfPhoto: `https://example.com/photo-1.png`,
			},
			{
				gender: `male`,
				id: `player-2`,
				name: `Bartek`,
				urlOfPhoto: `https://example.com/photo-2.png`,
			},
		],
	},
} as const satisfies StoryObj<typeof Players>;
