import Enhanced from "./Enhanced.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Enhanced} satisfies Meta<typeof Enhanced>;
export const Default = {args: {input: undefined}} as const satisfies StoryObj<
	typeof Enhanced
>;
