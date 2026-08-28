import Form from "./Form.svelte";
import type {Meta, StoryObj} from "@storybook/svelte-vite";
export default {component: Form} satisfies Meta<typeof Form>;
export const Default = {args: {}} as const satisfies StoryObj<typeof Form>;
