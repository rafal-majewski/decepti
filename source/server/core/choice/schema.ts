import {z} from "zod";
export const schema = z.union([z.literal(`nie`), z.literal(`tak`)]);
