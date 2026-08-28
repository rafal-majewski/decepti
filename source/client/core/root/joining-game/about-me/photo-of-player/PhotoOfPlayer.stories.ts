import PhotoOfPlayer from "./PhotoOfPlayer.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: PhotoOfPlayer} satisfies Meta<typeof PhotoOfPlayer>;
export const Default = {args: {}} as const satisfies StoryObj<
	typeof PhotoOfPlayer
>;
