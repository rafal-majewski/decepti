import Dialog from "./Dialog.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Dialog} satisfies Meta<typeof Dialog>;
export const Default = {
	args: {
		isOpen: false,
		onClose: (): void => {
			return;
		},
		onPhoto: (): void => {
			return;
		},
	},
} as const satisfies StoryObj<typeof Dialog>;
