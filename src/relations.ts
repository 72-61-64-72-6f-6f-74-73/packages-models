export const nostr_profile_relay_table = `CREATE TABLE IF NOT EXISTS nostr_profile_relay (
	tb_kr_0 CHAR(36),
	tb_kr_1 CHAR(36),
	FOREIGN KEY (tb_kr_0) REFERENCES nostr_profile(id) ON DELETE CASCADE,
	FOREIGN KEY (tb_kr_1) REFERENCES nostr_relay(id) ON DELETE CASCADE,
	PRIMARY KEY (tb_kr_0, tb_kr_1)
);`;