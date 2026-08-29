import {schemaForProcessEnv_} from "../../../schema-for-process-env/module.ts";
import type {WithStaticAdapterConfiguration} from "../WithStaticAdapterConfiguration.ts";
import {z} from "zod";
export const schema = z
	.intersection(
		schemaForProcessEnv_.schema,
		/* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
		z.object({}) as unknown as z.ZodUnknown,
	)
	.transform(function parse(processEnv): WithStaticAdapterConfiguration {
		const configuration: WithStaticAdapterConfiguration = {
			adapter: {id: `static`},
			type: `withStaticAdapter`,
			webPush: {
				email: processEnv.WEB_PUSH__EMAIL,
				privateKey: processEnv.WEB_PUSH__PRIVATE_KEY,
				publicKey: processEnv.WEB_PUSH__PUBLIC_KEY,
			},
		};
		return configuration;
	});
