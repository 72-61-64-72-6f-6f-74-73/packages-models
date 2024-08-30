import { z } from "zod";
import { regex } from "@radroots/utils";
import type { IModelsForm, IModelsQueryBindValue, IModelsSortCreatedAt, IModelsFormErrorTuple, IModelsFormValidationTuple } from "./types";

export const MassUnitSchema = z.union([
	z.literal("g"),
	z.literal("lb"),
]);

export type MassUnit = z.infer<typeof MassUnitSchema>;

export function parse_mass_unit(val: string): MassUnit {
    switch (val) {
        case "g":
		case "lb":
            return val;
        default:
            return "g";
    };
};

export const LocationGcsSchema = z.object({
    lat: z.number({ message: "model.location_gcs.schema.lat.required" }).min(-90, { message: "model.location_gcs.schema.lat.min" }).max(90, { message: "model.location_gcs.schema.lat.max" }),
	lng: z.number({ message: "model.location_gcs.schema.lng.required" }).min(-180, { message: "model.location_gcs.schema.lng.min" }).max(180, { message: "model.location_gcs.schema.lng.max" }),
	geohash: z.string({ message: "model.location_gcs.schema.geohash.required" }),
	label: z.string().optional()
});

export type LocationGcsFields = z.infer<typeof LocationGcsSchema>;
export type LocationGcsFormFields = ({
    [K in keyof z.infer<typeof LocationGcsSchema>]: string;
});
export type LocationGcs = ({ id: string; created_at: string; } & LocationGcsFields);
export type ILocationGcsSort = (IModelsSortCreatedAt);
export type ILocationGcsQueryBindValuesKey = ("id" | "geohash");
export type ILocationGcsQueryBindValuesTuple = [ILocationGcsQueryBindValuesKey, IModelsQueryBindValue];
export type ILocationGcsQueryBindValues = ({ id: IModelsQueryBindValue } | { geohash: IModelsQueryBindValue });
export type ILocationGcsGetList = { list: ["all"], sort?: ILocationGcsSort };
export type ILocationGcsGet = (ILocationGcsQueryBindValues | ILocationGcsGetList);
export type ILocationGcsUpdate = { on: ILocationGcsQueryBindValues, fields: LocationGcsFormFields };

export const location_gcs_sort: Record<ILocationGcsSort, string> = {
    newest: "created_at DESC",
    oldest: "created_at ASC",
};

export function parse_location_gcs(obj: any): LocationGcs | undefined {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const { id, created_at, lat, lng, geohash, label } = obj;
    if ((typeof id !== "string" || !id) || (typeof created_at !== "string" || !created_at) || (typeof lat !== "number") || (typeof lng !== "number") || (typeof geohash !== "string" || !geohash)) return undefined;
    return { id, created_at, lat, lng, geohash, label, };
};

export const parse_location_gcss = ({ values }: { values?: any[] }): LocationGcs[] | undefined => {
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
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    },
	lng: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    },
	geohash: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    },
	label: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: true,
    }
};

export const location_gcs_form_vals: Record<keyof LocationGcsFormFields, string> = {
    lat: "",
	lng: "",
	geohash: "",
	label: ""
};

export const parse_location_gcs_form_keys = (value: string): keyof LocationGcsFormFields | undefined => {
    switch (value) {
        case "lat":
		case "lng":
		case "geohash":
		case "label":
            return value;
        default:
            return undefined;
    };
};

export const parse_location_gcs_form_field_types = (value: string): "string" | "number" => {
    switch (value) {
        case "geohash":
		case "label":
			return "string";
		case "lat":
		case "lng":
			return "number";
		default:
            throw new Error("Error: parse_location_gcs_transform did not match.");
    };
};

export const location_gcs_sql = `CREATE TABLE IF NOT EXISTS location_gcs (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
    created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
    lat FLOAT NOT NULL,
	lng FLOAT NOT NULL,
	geohash CHAR(12) NOT NULL UNIQUE,
	label TEXT,
	CONSTRAINT unique_location_gcs UNIQUE (geohash)
);`;

export const NostrNoteSchema = z.object({
    ev_id: z.string({ message: "model.nostr_note.schema.ev_id.required" }),
	ev_created_at: z.number({ message: "model.nostr_note.schema.ev_created_at.required" }),
	ev_content: z.string({ message: "model.nostr_note.schema.ev_content.required" }),
	ev_tags: z.string({ message: "model.nostr_note.schema.ev_tags.required" })
});

export type NostrNoteFields = z.infer<typeof NostrNoteSchema>;
export type NostrNoteFormFields = ({
    [K in keyof z.infer<typeof NostrNoteSchema>]: string;
});
export type NostrNote = ({ id: string; created_at: string; } & NostrNoteFields);
export type INostrNoteSort = (IModelsSortCreatedAt);
export type INostrNoteQueryBindValuesKey = ("id");
export type INostrNoteQueryBindValuesTuple = [INostrNoteQueryBindValuesKey, IModelsQueryBindValue];
export type INostrNoteQueryBindValues = ({ id: IModelsQueryBindValue });
export type INostrNoteGetList = { list: ["all"], sort?: INostrNoteSort };
export type INostrNoteGet = (INostrNoteQueryBindValues | INostrNoteGetList);
export type INostrNoteUpdate = { on: INostrNoteQueryBindValues, fields: NostrNoteFormFields };

export const nostr_note_sort: Record<INostrNoteSort, string> = {
    newest: "created_at DESC",
    oldest: "created_at ASC",
};

export function parse_nostr_note(obj: any): NostrNote | undefined {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const { id, created_at, ev_id, ev_created_at, ev_content, ev_tags } = obj;
    if ((typeof id !== "string" || !id) || (typeof created_at !== "string" || !created_at) || (typeof ev_id !== "string" || !ev_id) || (typeof ev_created_at !== "number") || (typeof ev_content !== "string" || !ev_content) || (typeof ev_tags !== "string" || !ev_tags)) return undefined;
    return { id, created_at, ev_id, ev_created_at, ev_content, ev_tags, };
};

export const parse_nostr_notes = ({ values }: { values?: any[] }): NostrNote[] | undefined => {
    if (!Array.isArray(values) || !values.length) return undefined;
    const list: NostrNote[] = [];
    for (const obj of values) {
        const o = parse_nostr_note(obj);
        if (o) list.push(o);
    };
    return list.length ? list : undefined;
};

export const nostr_note_form_fields: Record<keyof NostrNoteFormFields, IModelsForm> = {
    ev_id: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    },
	ev_created_at: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    },
	ev_content: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    },
	ev_tags: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    }
};

export const nostr_note_form_vals: Record<keyof NostrNoteFormFields, string> = {
    ev_id: "",
	ev_created_at: "",
	ev_content: "",
	ev_tags: ""
};

export const parse_nostr_note_form_keys = (value: string): keyof NostrNoteFormFields | undefined => {
    switch (value) {
        case "ev_id":
		case "ev_created_at":
		case "ev_content":
		case "ev_tags":
            return value;
        default:
            return undefined;
    };
};

export const parse_nostr_note_form_field_types = (value: string): "string" | "number" => {
    switch (value) {
        case "ev_id":
		case "ev_content":
		case "ev_tags":
			return "string";
		case "ev_created_at":
			return "number";
		default:
            throw new Error("Error: parse_nostr_note_transform did not match.");
    };
};

export const nostr_note_sql = `CREATE TABLE IF NOT EXISTS nostr_note (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
    created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
    ev_id TEXT,
	ev_created_at REAL,
	ev_content TEXT,
	ev_tags TEXT,
	CONSTRAINT unique_nostr_note UNIQUE (ev_id)
);`;

export const models_initial_upgrade = [
	`PRAGMA foreign_keys = ON;`,
	location_gcs_sql,
	nostr_note_sql,
];