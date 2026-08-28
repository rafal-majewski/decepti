import Page from "./Page.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Page} satisfies Meta<typeof Page>;
export const Default = {args: {numberOfPlayers: 3}} as const satisfies StoryObj<
	typeof Page
>;
