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
    label: z.string({ message: "model.location_gcs.schema.label.required" })
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
    if ((typeof id !== "string" || !id) || (typeof created_at !== "string" || !created_at) || (typeof lat !== "number") || (typeof lng !== "number") || (typeof geohash !== "string" || !geohash) || (typeof label !== "string" || !label)) return undefined;
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
        validation: regex.alphanum,
        charset: regex.alphanum,
        optional: false,
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

export const TradeProductSchema = z.object({
    key: z.string({ message: "model.trade_product.schema.key.required" }),
    lot: z.string({ message: "model.trade_product.schema.lot.required" }).min(1, { message: "model.trade_product.schema.lot.min" }).max(120, { message: "model.trade_product.schema.lot.max" }),
    varietal: z.string({ message: "model.trade_product.schema.varietal.required" }),
    notes: z.string().optional()
});

export type TradeProductFields = z.infer<typeof TradeProductSchema>;
export type TradeProductFormFields = ({
    [K in keyof z.infer<typeof TradeProductSchema>]: string;
});
export type TradeProduct = ({ id: string; created_at: string; } & TradeProductFields);
export type ITradeProductSort = (IModelsSortCreatedAt);
export type ITradeProductQueryBindValuesKey = ("id" | "url");
export type ITradeProductQueryBindValuesTuple = [ITradeProductQueryBindValuesKey, IModelsQueryBindValue];
export type ITradeProductQueryBindValues = ({ id: IModelsQueryBindValue } | { url: IModelsQueryBindValue });
export type ITradeProductGetList = { list: ["all"], sort?: ITradeProductSort };
export type ITradeProductGet = (ITradeProductQueryBindValues | ITradeProductGetList);
export type ITradeProductUpdate = { on: ITradeProductQueryBindValues, fields: TradeProductFormFields };

export const trade_product_sort: Record<ITradeProductSort, string> = {
    newest: "created_at DESC",
    oldest: "created_at ASC",
};

export function parse_trade_product(obj: any): TradeProduct | undefined {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const { id, created_at, key, lot, varietal, notes } = obj;
    if ((typeof id !== "string" || !id) || (typeof created_at !== "string" || !created_at) || (typeof key !== "string" || !key) || (typeof lot !== "string" || !lot) || (typeof varietal !== "string" || !varietal)) return undefined;
    return { id, created_at, key, lot, varietal, notes, };
};

export const parse_trade_products = ({ values }: { values?: any[] }): TradeProduct[] | undefined => {
    if (!Array.isArray(values) || !values.length) return undefined;
    const list: TradeProduct[] = [];
    for (const obj of values) {
        const o = parse_trade_product(obj);
        if (o) list.push(o);
    };
    return list.length ? list : undefined;
};

export const trade_product_form_fields: Record<keyof TradeProductFormFields, IModelsForm> = {
    key: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: false,
    },
    lot: {
        validation: regex.alphanum,
        charset: regex.alphanum,
        optional: false,
    },
    varietal: {
        validation: regex.alphanum,
        charset: regex.alphanum,
        optional: false,
    },
    notes: {
        validation: regex.alpha,
        charset: regex.alpha,
        optional: true,
    }
};

export const trade_product_form_vals: Record<keyof TradeProductFormFields, string> = {
    key: "",
    lot: "",
    varietal: "",
    notes: ""
};

export const parse_trade_product_form_keys = (value: string): keyof TradeProductFormFields | undefined => {
    switch (value) {
        case "key":
        case "lot":
        case "varietal":
        case "notes":
            return value;
        default:
            return undefined;
    };
};

export const parse_trade_product_form_field_types = (value: string): "string" | "number" => {
    switch (value) {
        case "key":
        case "lot":
        case "varietal":
        case "notes":
            return "string";
        default:
            throw new Error("Error: parse_trade_product_transform did not match.");
    };
};

export const trade_product_sql = `CREATE TABLE IF NOT EXISTS trade_product (
    id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
    created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
    key TEXT,
    lot TEXT,
    varietal TEXT,
    notes TEXT,
    CONSTRAINT unique_trade_product UNIQUE (key, lot, varietal)
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

export const trade_product_location_sql = `CREATE TABLE IF NOT EXISTS trade_product_location (
    tb_tploc_0 CHAR(36),
    tb_tploc_1 CHAR(36),
    FOREIGN KEY (tb_tploc_0) REFERENCES trade_product(id) ON DELETE CASCADE,
    FOREIGN KEY (tb_tploc_1) REFERENCES location_gcs(id) ON DELETE CASCADE,
    PRIMARY KEY (tb_tploc_0, tb_tploc_1)
);`;

export const models_initial_upgrade = [
    `PRAGMA foreign_keys = ON;`,
    location_gcs_sql,
    trade_product_sql,
    nostr_note_sql,
    trade_product_location_sql
];