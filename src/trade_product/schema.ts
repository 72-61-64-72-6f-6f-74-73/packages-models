import { z } from "zod";
import { regex } from "@radroots/utils";
import type { IModelsForm, IModelsQueryBindValue, IModelsSortCreatedAt } from "../types";
import { MassUnitSchema, parse_mass_unit } from "../utils";

export const TradeProductSchema = z.object({
	key: z.string({ message: "model.trade_product.schema.key.required" }),
	process: z.string().optional(),
	lot: z.string().min(1, { message: "model.trade_product.schema.lot.min" }).max(120, { message: "model.trade_product.schema.lot.max" }).optional(),
	profile: z.string().optional(),
	year: z.number({ message: "model.trade_product.schema.year.required" }).int().positive({ message: "model.trade_product.schema.year.positive" }),
	qty_amt: z.number({ message: "model.trade_product.schema.qty_amt.required" }).int().positive({ message: "model.trade_product.schema.qty_amt.positive" }),
	qty_unit: MassUnitSchema,
	qty_label: z.string({ message: "model.trade_product.schema.qty_label.required" }),
	qty_avail: z.number({ message: "model.trade_product.schema.qty_avail.required" }).int().positive({ message: "model.trade_product.schema.qty_avail.positive" }),
	price_amt: z.number({ message: "model.trade_product.schema.price_amt.required" }).positive({ message: "model.trade_product.schema.price_amt.positive" }),
	price_currency: z.string({ message: "model.trade_product.schema.price_currency.required" }).length(3, { message: "model.trade_product.schema.price_currency.length" }),
	price_qty_amt: z.number({ message: "model.trade_product.schema.price_qty_amt.required" }).int().positive({ message: "model.trade_product.schema.price_qty_amt.positive" }),
	price_qty_unit: MassUnitSchema,
	notes: z.string().optional(),
});

export type TradeProductFields = z.infer<typeof TradeProductSchema>;
export type TradeProductFormFields = { [K in keyof z.infer<typeof TradeProductSchema>]: string; };
export type TradeProduct = { id: string; created_at: string; key: string; process: string; lot: string; profile: string; year: number; qty_amt: number; qty_unit: string; qty_label: string; qty_avail: number; price_amt: number; price_currency: string; price_qty_amt: number; price_qty_unit: string; notes: string; } & TradeProductFields;

export type ITradeProductSort = IModelsSortCreatedAt;
export type ITradeProductQueryBindValuesKey = "id" | "url";
export type ITradeProductQueryBindValuesTuple = [ITradeProductQueryBindValuesKey, IModelsQueryBindValue];
export type ITradeProductQueryBindValues = { id: IModelsQueryBindValue } | { url: IModelsQueryBindValue };
export type ITradeProductGetList = { list: ["all"], sort?: ITradeProductSort };
export type ITradeProductGet = ITradeProductQueryBindValues | ITradeProductGetList;
export type ITradeProductUpdate = { on: ITradeProductQueryBindValues, fields: TradeProductFormFields };

export const trade_product_sort: Record<ITradeProductSort, string> = {
	newest: "created_at DESC",
	oldest: "created_at ASC",
};

export function parse_trade_product(obj: any): TradeProduct | undefined {
	if (typeof obj !== 'object' || !obj) return undefined;
	const { id, created_at, key, process, lot, profile, year, qty_amt, qty_unit, qty_label, qty_avail, price_amt, price_currency, price_qty_amt, price_qty_unit, notes } = obj;
	if ((typeof id !== "string" || !id) || (typeof created_at !== "string" || !created_at) || (typeof key !== "string" || !key) || (typeof year !== "number") || (typeof qty_amt !== "number") || (typeof qty_unit !== "string" || !qty_unit) || (typeof qty_label !== "string" || !qty_label) || (typeof qty_avail !== "number") || (typeof price_amt !== "number") || (typeof price_currency !== "string" || !price_currency) || (typeof price_qty_amt !== "number") || (typeof price_qty_unit !== "string" || !price_qty_unit)) return undefined;
	return { id, created_at, key, process, lot, profile, year, qty_amt, qty_unit: parse_mass_unit(qty_unit), qty_label, qty_avail, price_amt, price_currency, price_qty_amt, price_qty_unit: parse_mass_unit(price_qty_unit), notes };
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
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
	},
	process: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	lot: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	profile: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
	year: {
		validation: regex.num,
		charset: regex.num,
		optional: false,
	},
	qty_amt: {
		validation: regex.num,
		charset: regex.num,
		optional: false,
		default: 1,
	},
	qty_unit: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
		default: "kg",
	},
	qty_label: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
	},
	qty_avail: {
		validation: regex.num,
		charset: regex.num,
		optional: false,
	},
	price_amt: {
		validation: regex.price,
		charset: regex.price_charset,
		optional: false,
		default: 1,
	},
	price_currency: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
		default: "usd",
	},
	price_qty_amt: {
		validation: regex.num,
		charset: regex.num,
		optional: false,
		default: 1,
	},
	price_qty_unit: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: false,
		default: "kg",
	},
	notes: {
		validation: regex.alphanum,
		charset: regex.alphanum,
		optional: true,
	},
};

export const trade_product_form_vals: Record<keyof TradeProductFormFields, string> = {
	key: "",
	process: "",
	lot: "",
	profile: "",
	year: "",
	qty_amt: "",
	qty_unit: "",
	qty_label: "",
	qty_avail: "",
	price_amt: "",
	price_currency: "",
	price_qty_amt: "",
	price_qty_unit: "",
	notes: "",
};

export const parse_trade_product_form_keys = (value: string): keyof TradeProductFormFields | undefined => {
	switch (value) {
		case "key":
		case "process":
		case "lot":
		case "profile":
		case "year":
		case "qty_amt":
		case "qty_unit":
		case "qty_label":
		case "qty_avail":
		case "price_amt":
		case "price_currency":
		case "price_qty_amt":
		case "price_qty_unit":
		case "notes":
			return value;
		default:
			return undefined;
	};
};

export const parse_trade_product_form_field_types = (value: string): "string" | "number" => {
	switch (value) {
		case "key":
		case "process":
		case "lot":
		case "profile":
		case "qty_unit":
		case "qty_label":
		case "price_currency":
		case "price_qty_unit":
		case "notes":
			return "string";
		case "year":
		case "qty_amt":
		case "qty_avail":
		case "price_amt":
		case "price_qty_amt":
			return "number";
		default:
			throw new Error("Error: parse_trade_product_form_field_types did not match.");
	};
};

export const trade_product_table = `CREATE TABLE IF NOT EXISTS trade_product (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
	created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
	key TEXT,
	process TEXT,
	lot TEXT,
	profile TEXT,
	year INTEGER NOT NULL,
	qty_amt REAL,
	qty_unit CHAR(4) NOT NULL,
	qty_label TEXT,
	qty_avail INTEGER,
	price_amt REAL NOT NULL,
	price_currency CHAR(3) NOT NULL,
	price_qty_amt REAL,
	price_qty_unit CHAR(4) NOT NULL,
	notes TEXT
);`;