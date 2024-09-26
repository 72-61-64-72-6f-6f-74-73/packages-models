import { regex } from "@radroots/utils";
import { z } from "zod";
import type { IModelsForm, IModelsQueryBindValue, IModelsQueryValue, IModelsSortCreatedAt } from "../types";

export const NostrProfileSchema = z.object({
	public_key: z.string({ message: "model.nostr_profile.schema.public_key.required" }).length(64, { message: "model.nostr_profile.schema.public_key.length" }),
});

export const NostrProfileMetadataSchema = z.object({
    name: z.string().optional(),
	display_name: z.string().optional(),
	about: z.string().optional(),
	website: z.string().url().optional(),
	picture: z.string().url().optional(),
	banner: z.string().url().optional(),
	nip05: z.string().email().optional(),
	lud06: z.string().optional(),
	lud16: z.string().optional()
});

export type NostrProfileMetadata = z.infer<typeof NostrProfileMetadataSchema>;
export type NostrProfileFields = z.infer<typeof NostrProfileSchema> & NostrProfileMetadata;
export type NostrProfileFormFields = { [K in keyof NostrProfileFields]: string; };
export type NostrProfile = { id: string; created_at: string; } & NostrProfileFields;

export type INostrProfileSort = IModelsSortCreatedAt;
export type INostrProfileQueryBindValuesKey = "public_key" | "nip05";
export type INostrProfileQueryBindValuesTuple = [INostrProfileQueryBindValuesKey, IModelsQueryBindValue];
export type INostrProfileQueryBindValues = { public_key: IModelsQueryBindValue } | { nip05: IModelsQueryBindValue };
export type INostrProfileGetList = { list: ["all"], sort?: INostrProfileSort };
export type INostrProfileGet = INostrProfileQueryBindValues | INostrProfileGetList;
export type INostrProfileUpdate = { on: INostrProfileQueryBindValues, fields: NostrProfileFormFields };

export const nostr_profile_sort: Record<INostrProfileSort, string> = {
	newest: "created_at DESC",
	oldest: "created_at ASC",
};

export function parse_nostr_profile(obj: any): NostrProfile | undefined {
	if (typeof obj !== 'object' || !obj) return undefined;
	const { id, created_at, public_key } = obj;
	if ((typeof public_key !== "string" || !public_key)) return undefined;
	return {
		id,
		created_at,
		public_key,
		name: typeof obj.name === "string" ? obj.name : undefined,
		display_name: typeof obj.display_name === "string" ? obj.display_name : undefined,
		about: typeof obj.about === "string" ? obj.about : undefined,
		website: typeof obj.website === "string" ? obj.website : undefined,
		picture: typeof obj.picture === "string" ? obj.picture : undefined,
		banner: typeof obj.banner === "string" ? obj.banner : undefined,
		nip05: typeof obj.nip05 === "string" ? obj.nip05 : undefined,
		lud06: typeof obj.lud06 === "string" ? obj.lud06 : undefined,
		lud16: typeof obj.lud16 === "string" ? obj.lud16 : undefined
	};
};

export const parse_nostr_profile_list = ({ values }: { values?: any[] }): NostrProfile[] | undefined => {
	if (!Array.isArray(values) || !values.length) return undefined;
	const list: NostrProfile[] = [];
	for (const obj of values) {
		const o = parse_nostr_profile(obj);
		if (o) list.push(o);
	};
	return list.length ? list : undefined;
};

export const nostr_profile_form_fields: Record<keyof NostrProfileFormFields, IModelsForm> = {
	public_key: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
	},
	name: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	display_name: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	about: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	website: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	picture: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	banner: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	nip05: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	lud06: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	lud16: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
};

export const nostr_profile_form_vals: Record<keyof NostrProfileFormFields, string> = {
	public_key: "",
	name: "",
	display_name: "",
	about: "",
	website: "",
	picture: "",
	banner: "",
	nip05: "",
	lud06: "",
	lud16: "",
};

export const parse_nostr_profile_form_keys = (value: string): keyof NostrProfileFormFields | "" => {
	switch (value) {
		case "public_key":
		case "name":
		case "display_name":
		case "about":
		case "website":
		case "picture":
		case "banner":
		case "nip05":
		case "lud06":
		case "lud16":
			return value;
		default:
			return "";
	};
};

export const parse_nostr_profile_form_fields = ([k, v]: [string, string]): [string, IModelsQueryValue] => {
	switch (k) {
		case "public_key":
		case "name":
		case "display_name":
		case "about":
		case "website":
		case "picture":
		case "banner":
		case "nip05":
		case "lud06":
		case "lud16":
			return [k, String(v)];
		default:
			throw new Error("Error: parse_nostr_profile_form_fields did not match.");
	};
};

export const nostr_profile_table = `CREATE TABLE IF NOT EXISTS nostr_profile (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
	created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
	public_key CHAR(64) NOT NULL CHECK(length(public_key) = 64),
	name TEXT,
	display_name TEXT,
	about TEXT,
	website TEXT,
	picture TEXT,
	banner TEXT,
	nip05 TEXT,
	lud06 TEXT,
	lud16 TEXT
);`;