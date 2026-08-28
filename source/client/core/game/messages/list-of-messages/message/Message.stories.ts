import Message from "./Message.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Message} satisfies Meta<typeof Message>;
export const Default = {
	args: {
		message: {
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
	},
} as const satisfies StoryObj<typeof Message>;
