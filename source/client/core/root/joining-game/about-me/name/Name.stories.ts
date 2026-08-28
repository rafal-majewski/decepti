import Name from "./Name.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Name} satisfies Meta<typeof Name>;
export const Default = {args: {}} as const satisfies StoryObj<typeof Name>;
