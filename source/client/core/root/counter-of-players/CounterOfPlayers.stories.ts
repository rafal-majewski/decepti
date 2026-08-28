import CounterOfPlayers from "./CounterOfPlayers.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: CounterOfPlayers} satisfies Meta<
	typeof CounterOfPlayers
>;
export const Default = {args: {numberOfPlayers: 3}} as const satisfies StoryObj<
	typeof CounterOfPlayers
>;
