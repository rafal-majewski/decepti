import Player from "./Player.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Player} satisfies Meta<typeof Player>;
export const Default = {
	args: {
		player: {
			gender: `female`,
			id: `player-1`,
			name: `Alicja`,
			urlOfPhoto: `https://example.com/photo-1.png`,
		},
	},
} as const satisfies StoryObj<typeof Player>;
