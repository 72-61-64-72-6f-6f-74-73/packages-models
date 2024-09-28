import { z } from "zod";

export type ModelsUniqueConstraintMessages =
    | "*-location-gcs-geohash-unique"
	| "*-nostr-relay-url-unique"

export const MassUnitSchema = z.union([
	z.literal("kg"),
	z.literal("lb"),
	z.literal("g"),
]);

export const mass_units: MassUnit[] = ["kg", "lb", "g"] as const;

export type MassUnit = z.infer<typeof MassUnitSchema>;

export function parse_mass_unit(val: string): MassUnit {
	switch (val) {
		case "kg":
		case "lb":
		case "g":
			return val;
	default:
			return "kg";
	};
};