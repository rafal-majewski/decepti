import Gender from "./Gender.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Gender} satisfies Meta<typeof Gender>;
export const Default = {args: {}} as const satisfies StoryObj<typeof Gender>;
