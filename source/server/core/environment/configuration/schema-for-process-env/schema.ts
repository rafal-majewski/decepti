import {z} from "zod";
export const schema = z.object({
	WEB_PUSH__EMAIL: z.string().nonempty(),
	WEB_PUSH__PRIVATE_KEY: z.string().nonempty(),
	WEB_PUSH__PUBLIC_KEY: z.string().nonempty(),
});
