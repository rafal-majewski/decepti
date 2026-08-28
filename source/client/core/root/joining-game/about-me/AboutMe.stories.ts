import AboutMe from "./AboutMe.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: AboutMe} satisfies Meta<typeof AboutMe>;
export const Default = {args: {}} as const satisfies StoryObj<typeof AboutMe>;
