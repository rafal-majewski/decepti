import Game from "./Game.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Game} satisfies Meta<typeof Game>;
export const Default = {
	args: {
		game: {
			id: `game-1`,
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
	},
} as const satisfies StoryObj<typeof Game>;
