import { regex } from "@radroots/utils";
import { z } from "zod";
import type { IModelsForm, IModelsQueryBindValue, IModelsQueryValue, IModelsSortCreatedAt } from "../types";

export const LocationGcsSchema = z.object({
	lat: z.number({ message: "model.location_gcs.schema.lat.required" }).min(-90, { message: "model.location_gcs.schema.lat.min" }).max(90, { message: "model.location_gcs.schema.lat.max" }),
	lng: z.number({ message: "model.location_gcs.schema.lng.required" }).min(-180, { message: "model.location_gcs.schema.lng.min" }).max(180, { message: "model.location_gcs.schema.lng.max" }),
	geohash: z.string({ message: "model.location_gcs.schema.geohash.required" }),
	label: z.string({ message: "model.location_gcs.schema.label.required" }),
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
export type ILocationGcsUpdate = { on: ILocationGcsQueryBindValues, fields: LocationGcsFormFields };

export const location_gcs_sort: Record<ILocationGcsSort, string> = {
	newest: "created_at DESC",
	oldest: "created_at ASC",
};

export function parse_location_gcs(obj: any): LocationGcs | "" {
	if (typeof obj !== 'object' || !obj) return undefined;
	const { id, created_at, lat, lng, geohash, label } = obj;
	if ((typeof id !== "string" || !id) || (typeof created_at !== "string" || !created_at) || (typeof lat !== "number") || (typeof lng !== "number") || (typeof geohash !== "string" || !geohash) || (typeof label !== "string" || !label)) return "";
	return {
		id,
		created_at,
		lat,
		lng,
		geohash,
		label
	};
};

export const parse_location_gcs_list = ({ values }: { values?: any[] }): LocationGcs[] | undefined => {
	if (!Array.isArray(values) || !values.length) return undefined;
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
		optional: false,
	},
};

export const location_gcs_form_vals: Record<keyof LocationGcsFormFields, string> = {
	lat: "",
	lng: "",
	geohash: "",
	label: "",
};

export const parse_location_gcs_form_keys = (value: string): keyof LocationGcsFormFields | "" => {
	switch (value) {
		case "lat":
		case "lng":
		case "geohash":
		case "label":
			return value;
		default:
			return "";
	};
};

export const parse_location_gcs_form_fields = ([k, v]: [string, string]): [string, IModelsQueryValue] => {
	switch (k) {
		case "geohash":
		case "label":
			return [k, String(v)];
		case "lat":
		case "lng":
			return [k, Number(v)];
		default:
			throw new Error("Error: parse_location_gcs_form_fields did not match.");
	};
};

export const location_gcs_table = `CREATE TABLE IF NOT EXISTS location_gcs (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
	created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
	lat FLOAT NOT NULL,
	lng FLOAT NOT NULL,
	geohash CHAR(12) NOT NULL UNIQUE,
	label TEXT
);`;