import List from "./List.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: List} satisfies Meta<typeof List>;
export const Default = {
	args: {
		messages: [
			{
				author: {
					gender: `female`,
					id: `player-1`,
					name: `Alicja`,
					urlOfPhoto: `https://example.com/photo-1.png`,
				},
				id: `message-1`,
				text: `Cześć wszystkim!`,
				timestamp: new Date(1720000000000),
			},
			{
				author: {
					gender: `male`,
					id: `player-2`,
					name: `Bartek`,
					urlOfPhoto: `https://example.com/photo-2.png`,
				},
				id: `message-2`,
				text: `Hej! Gotowi do gry?`,
				timestamp: new Date(1720000060000),
			},
		],
	},
} as const satisfies StoryObj<typeof List>;
