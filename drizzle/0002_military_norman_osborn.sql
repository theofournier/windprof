CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`prof_id` text NOT NULL,
	`user_id` text,
	`reporter_email` text NOT NULL,
	`reason` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`prof_id`) REFERENCES `prof_profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `reports_profId_idx` ON `reports` (`prof_id`);--> statement-breakpoint
CREATE INDEX `reports_status_idx` ON `reports` (`status`);