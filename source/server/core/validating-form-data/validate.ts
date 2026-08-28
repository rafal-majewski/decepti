import {convertingFormDataToObject_} from "../converting-form-data-to-object/module.ts";
import type {z} from "zod";
export function validate<Schema extends z.ZodType>(
	data: FormData,
	schema: Schema,
): z.ZodSafeParseResult<z.output<Schema>> {
	const object: {[key: string]: FormDataEntryValue} =
		convertingFormDataToObject_.convert(data);
	return schema.safeParse(object);
}
