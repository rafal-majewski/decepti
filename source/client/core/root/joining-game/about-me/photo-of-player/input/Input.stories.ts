import Input from "./Input.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Input} satisfies Meta<typeof Input>;
export const Default = {args: {hidden: false}} as const satisfies StoryObj<
	typeof Input
>;
