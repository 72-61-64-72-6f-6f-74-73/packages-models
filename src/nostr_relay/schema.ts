import { regex } from "@radroots/utils";
import { z } from "zod";
import type { IModelsForm, IModelsQueryBindValue, IModelsQueryValue, IModelsSortCreatedAt } from "../types";

export const NostrRelaySchema = z.object({
	url: z.string({ message: "model.nostr_relay.schema.url.required" }).url().regex(/^(ws|wss):\/\//),
	name: z.string().optional(),
	description: z.string().optional(),
	pubkey: z.string().optional(),
	contact: z.string().optional(),
	supported_nips: z.string().optional(),
	software: z.string().optional(),
	version: z.string().optional(),
	data: z.string().optional(),
});

export const NostrRelayUpdateSchema = z.object({
	url: z.string({ message: "model.nostr_relay.schema.url.required" }).url().regex(/^(ws|wss):\/\//).optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	pubkey: z.string().optional(),
	contact: z.string().optional(),
	supported_nips: z.string().optional(),
	software: z.string().optional(),
	version: z.string().optional(),
	data: z.string().optional(),
});

export type NostrRelayFields = z.infer<typeof NostrRelaySchema>;
export type NostrRelayFormFields = { [K in keyof NostrRelayFields]: string; };
export type NostrRelay = { id: string; created_at: string; } & NostrRelayFields;

export type INostrRelaySort = IModelsSortCreatedAt;
export type INostrRelayQueryBindValuesKey = "id" | "url";
export type INostrRelayQueryBindValuesTuple = [INostrRelayQueryBindValuesKey, IModelsQueryBindValue];
export type INostrRelayQueryBindValues = { id: IModelsQueryBindValue } | { url: IModelsQueryBindValue };
export type INostrRelayGetList = { list: ["all"] | ["on_key", { public_key: string;  }] | ["off_key", { public_key: string;  }], sort?: INostrRelaySort };
export type INostrRelayGet = INostrRelayQueryBindValues | INostrRelayGetList;
export type INostrRelayUpdate = { on: INostrRelayQueryBindValues, fields: Partial<NostrRelayFormFields>; };

export const nostr_relay_sort: Record<INostrRelaySort, string> = {
	newest: "created_at DESC",
	oldest: "created_at ASC",
};

export function parse_nostr_relay(obj: any): NostrRelay | undefined {
	if (typeof obj !== 'object' || !obj) return undefined;
	const { id, created_at, url } = obj;
	if ((typeof url !== "string" || !url)) return undefined;
	return {
		id,
		created_at,
		url,
		name: typeof obj.name === "string" ? obj.name : undefined,
		description: typeof obj.description === "string" ? obj.description : undefined,
		pubkey: typeof obj.pubkey === "string" ? obj.pubkey : undefined,
		contact: typeof obj.contact === "string" ? obj.contact : undefined,
		supported_nips: typeof obj.supported_nips === "string" ? obj.supported_nips : undefined,
		software: typeof obj.software === "string" ? obj.software : undefined,
		version: typeof obj.version === "string" ? obj.version : undefined,
		data: typeof obj.data === "string" ? obj.data : undefined
	};
};

export const parse_nostr_relay_list = ({ values }: { values?: any[] }): NostrRelay[] | undefined => {
	if (!Array.isArray(values) || !values.length) return undefined;
	const list: NostrRelay[] = [];
	for (const obj of values) {
		const o = parse_nostr_relay(obj);
		if (o) list.push(o);
	};
	return list.length ? list : undefined;
};

export const nostr_relay_form_fields: Record<keyof NostrRelayFormFields, IModelsForm> = {
	url: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
	},
	name: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	description: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	pubkey: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	contact: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	supported_nips: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	software: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	version: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	data: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
};

export const nostr_relay_form_vals: Record<keyof NostrRelayFormFields, string> = {
	url: "",
	name: "",
	description: "",
	pubkey: "",
	contact: "",
	supported_nips: "",
	software: "",
	version: "",
	data: "",
};

export const parse_nostr_relay_form_keys = (value: string): keyof NostrRelayFormFields | "" => {
	switch (value) {
		case "url":
		case "name":
		case "description":
		case "pubkey":
		case "contact":
		case "supported_nips":
		case "software":
		case "version":
		case "data":
			return value;
		default:
			return "";
	};
};

export const parse_nostr_relay_form_fields = ([k, v]: [string, string]): [string, IModelsQueryValue] => {
	switch (k) {
		case "url":
		case "name":
		case "description":
		case "pubkey":
		case "contact":
		case "supported_nips":
		case "software":
		case "version":
		case "data":
			return [k, String(v)];
		default:
			throw new Error("Error: parse_nostr_relay_form_fields did not match.");
	};
};

export const nostr_relay_table = `CREATE TABLE IF NOT EXISTS nostr_relay (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
	created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
	url TEXT NOT NULL UNIQUE,
	name TEXT,
	description TEXT,
	pubkey TEXT,
	contact TEXT,
	supported_nips TEXT,
	software TEXT,
	version TEXT,
	data TEXT
);`;