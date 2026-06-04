CREATE TABLE `prof_photos` (
	`id` text PRIMARY KEY NOT NULL,
	`prof_id` text NOT NULL,
	`key` text NOT NULL,
	`url` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`prof_id`) REFERENCES `prof_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `prof_photos_profId_idx` ON `prof_photos` (`prof_id`);