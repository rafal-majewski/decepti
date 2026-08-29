import {server_} from "../../../../server/module.ts";
import type {RequestEvent} from "./$types.d.ts";
import {z} from "zod";
const schemaForSubscription = z.strictObject({
	endpoint: z.string().nonempty(),
	keys: z.strictObject({
		auth: z.string().nonempty(),
		p256dh: z.string().nonempty(),
	}),
});
export async function POST(event: RequestEvent): Promise<Response> {
	const idOfPlayer: string | undefined = event.cookies.get(`idOfPlayer`);
	if (idOfPlayer === undefined) {
		return new Response(null, {status: 403});
	} else {
		const body: unknown = await event.request.json();
		const result = schemaForSubscription.safeParse(body);
		if (result.success) {
			const instances_ = await server_.importingInstances_.import_();
			instances_.pushNotifications_.pushNotifications.setSubscription(
				idOfPlayer,
				result.data,
			);
		} else {
			return new Response(null, {status: 400});
		}
		return new Response(null, {status: 200});
	}
}
