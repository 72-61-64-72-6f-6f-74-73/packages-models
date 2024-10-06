export const location_gcs_table_drop = `DROP TABLE IF EXISTS location_gcs;`
export const location_gcs_table = `CREATE TABLE IF NOT EXISTS location_gcs (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
	created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
	lat FLOAT NOT NULL,
	lng FLOAT NOT NULL,
	geohash CHAR(12) NOT NULL UNIQUE,
	label TEXT,
	gc_id TEXT,
	gc_name TEXT,
	gc_admin1_id TEXT,
	gc_admin1_name TEXT,
	gc_country_id TEXT,
	gc_country_name TEXT
);`;

export const trade_product_table_drop = `DROP TABLE IF EXISTS trade_product;`
export const trade_product_table = `CREATE TABLE IF NOT EXISTS trade_product (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
	created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
	key TEXT,
	title TEXT,
	summary TEXT,
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

export const nostr_profile_table_drop = `DROP TABLE IF EXISTS nostr_profile;`
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

export const nostr_relay_table_drop = `DROP TABLE IF EXISTS nostr_relay;`
export const nostr_relay_table = `CREATE TABLE IF NOT EXISTS nostr_relay (
	id CHAR(36) PRIMARY KEY NOT NULL UNIQUE CHECK(length(id) = 36),
	created_at DATETIME NOT NULL CHECK(length(created_at) = 24),
	url TEXT NOT NULL UNIQUE,
	relay_id TEXT,
	name TEXT,
	description TEXT,
	pubkey TEXT,
	contact TEXT,
	supported_nips TEXT,
	software TEXT,
	version TEXT,
	data TEXT
);`;

export const nostr_profile_relay_table_drop = `DROP TABLE IF EXISTS nostr_profile_relay;`
export const nostr_profile_relay_table = `CREATE TABLE IF NOT EXISTS nostr_profile_relay (
	tb_pr_rl_0 CHAR(36),
	tb_pr_rl_1 CHAR(36),
	FOREIGN KEY (tb_pr_rl_0) REFERENCES nostr_profile(id) ON DELETE CASCADE,
	FOREIGN KEY (tb_pr_rl_1) REFERENCES nostr_relay(id) ON DELETE CASCADE,
	PRIMARY KEY (tb_pr_rl_0, tb_pr_rl_1)
);`;