import { type ErrorMessage, regex, type ResultId, type ResultsList } from "@radroots/utils";
import { z } from "zod";
import type { IModelsForm, IModelsQueryBindValue, IModelsQueryValue, IModelsSchemaErrors, IModelsSortCreatedAt } from "../types";

export const LocationGcsSchema = z.object({
	lat: z.number({ message: "model.location_gcs.schema.lat.required" }).min(-90, { message: "model.location_gcs.schema.lat.min" }).max(90, { message: "model.location_gcs.schema.lat.max" }),
	lng: z.number({ message: "model.location_gcs.schema.lng.required" }).min(-180, { message: "model.location_gcs.schema.lng.min" }).max(180, { message: "model.location_gcs.schema.lng.max" }),
	geohash: z.string({ message: "model.location_gcs.schema.geohash.required" }),
	label: z.string().optional(),
	gc_id: z.string().optional(),
	gc_name: z.string().optional(),
	gc_admin1_id: z.string().optional(),
	gc_admin1_name: z.string().optional(),
	gc_country_id: z.string().optional(),
	gc_country_name: z.string().optional(),
});

export const LocationGcsUpdateSchema = z.object({
	lat: z.number({ message: "model.location_gcs.schema.lat.required" }).min(-90, { message: "model.location_gcs.schema.lat.min" }).max(90, { message: "model.location_gcs.schema.lat.max" }).optional(),
	lng: z.number({ message: "model.location_gcs.schema.lng.required" }).min(-180, { message: "model.location_gcs.schema.lng.min" }).max(180, { message: "model.location_gcs.schema.lng.max" }).optional(),
	geohash: z.string({ message: "model.location_gcs.schema.geohash.required" }).optional(),
	label: z.string().optional(),
	gc_id: z.string().optional(),
	gc_name: z.string().optional(),
	gc_admin1_id: z.string().optional(),
	gc_admin1_name: z.string().optional(),
	gc_country_id: z.string().optional(),
	gc_country_name: z.string().optional(),
});

export type LocationGcsFields = z.infer<typeof LocationGcsSchema>;
export type LocationGcsFormFields = { [K in keyof LocationGcsFields]: string; };
export type LocationGcs = { id: string; created_at: string; } & LocationGcsFields;

export type ILocationGcsSort = IModelsSortCreatedAt;
export type ILocationGcsQueryBindValuesKey = "id" | "geohash";
export type ILocationGcsQueryBindValuesTuple = [ILocationGcsQueryBindValuesKey, IModelsQueryBindValue];
export type ILocationGcsQueryBindValues = { id: IModelsQueryBindValue } | { geohash: IModelsQueryBindValue };
export type ILocationGcsGetList = { list: ["all"], sort?: ILocationGcsSort };
export type ILocationGcsGet = ILocationGcsQueryBindValues | ILocationGcsGetList;
export type ILocationGcsUpdate = { on: ILocationGcsQueryBindValues, fields: Partial<LocationGcsFormFields>; };

export type ILocationGcsAddResolve<T extends string> = ResultId | IModelsSchemaErrors | ErrorMessage<T>;
export type ILocationGcsDeleteResolve<T extends string> = true | ErrorMessage<T>;
export type ILocationGcsGetResolve<T extends string> = ResultsList<LocationGcs> | ErrorMessage<T>;
export type ILocationGcsUpdateResolve<T extends string> = true | IModelsSchemaErrors | ErrorMessage<T>;

export const location_gcs_sort: Record<ILocationGcsSort, string> = {
	newest: "created_at DESC",
	oldest: "created_at ASC",
};

export function parse_location_gcs(obj: any): LocationGcs | undefined {
	if (typeof obj !== 'object' || !obj) return undefined;
	const { id, created_at, lat, lng, geohash } = obj;
	if ((typeof lat !== "number") || (typeof lng !== "number") || (typeof geohash !== "string" || !geohash)) return undefined;
	return {
		id,
		created_at,
		lat,
		lng,
		geohash,
		label: typeof obj.label === "string" ? obj.label : undefined,
		gc_id: typeof obj.gc_id === "string" ? obj.gc_id : undefined,
		gc_name: typeof obj.gc_name === "string" ? obj.gc_name : undefined,
		gc_admin1_id: typeof obj.gc_admin1_id === "string" ? obj.gc_admin1_id : undefined,
		gc_admin1_name: typeof obj.gc_admin1_name === "string" ? obj.gc_admin1_name : undefined,
		gc_country_id: typeof obj.gc_country_id === "string" ? obj.gc_country_id : undefined,
		gc_country_name: typeof obj.gc_country_name === "string" ? obj.gc_country_name : undefined
	};
};

export const parse_location_gcs_list = ({ values }: { values?: any[] }): LocationGcs[] | undefined => {
	if (!Array.isArray(values)) return undefined;
	else if (!values.length) return [];
	const list: LocationGcs[] = [];
	for (const obj of values) {
		const o = parse_location_gcs(obj);
		if (o) list.push(o);
	};
	return list.length ? list : undefined;
};

export const location_gcs_form_fields: Record<keyof LocationGcsFormFields, IModelsForm> = {
	lat: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
	},
	lng: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
	},
	geohash: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
	},
	label: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	gc_id: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	gc_name: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	gc_admin1_id: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	gc_admin1_name: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	gc_country_id: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	gc_country_name: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
};

export const location_gcs_form_vals: Record<keyof LocationGcsFormFields, string> = {
	lat: "",
	lng: "",
	geohash: "",
	label: "",
	gc_id: "",
	gc_name: "",
	gc_admin1_id: "",
	gc_admin1_name: "",
	gc_country_id: "",
	gc_country_name: "",
};

export const parse_location_gcs_form_keys = (value: string): keyof LocationGcsFormFields | "" => {
	switch (value) {
		case "lat":
		case "lng":
		case "geohash":
		case "label":
		case "gc_id":
		case "gc_name":
		case "gc_admin1_id":
		case "gc_admin1_name":
		case "gc_country_id":
		case "gc_country_name":
			return value;
		default:
			return "";
	};
};

export const parse_location_gcs_form_fields = ([k, v]: [string, string]): [string, IModelsQueryValue] => {
	switch (k) {
		case "geohash":
		case "label":
		case "gc_id":
		case "gc_name":
		case "gc_admin1_id":
		case "gc_admin1_name":
		case "gc_country_id":
		case "gc_country_name":
			return [k, String(v)];
		case "lat":
		case "lng":
			return [k, Number(v)];
		default:
			throw new Error("Error: parse_location_gcs_form_fields did not match.");
	};
};