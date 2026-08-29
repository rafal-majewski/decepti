import Message from "./Message.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Message} satisfies Meta<typeof Message>;
export const Default = {
	args: {
		message: {
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
	},
} as const satisfies StoryObj<typeof Message>;
