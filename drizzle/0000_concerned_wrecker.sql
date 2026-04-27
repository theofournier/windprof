CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `accounts_userId_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`impersonated_by` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);--> statement-breakpoint
CREATE INDEX `sessions_userId_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`role` text,
	`banned` integer DEFAULT false,
	`ban_reason` text,
	`ban_expires` integer,
	`type` text DEFAULT 'rider'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `verifications` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `verifications_identifier_idx` ON `verifications` (`identifier`);--> statement-breakpoint
CREATE TABLE `prof_certifications` (
	`id` text PRIMARY KEY NOT NULL,
	`prof_id` text NOT NULL,
	`type` text NOT NULL,
	`year` integer,
	`file_name` text,
	`file_url` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`prof_id`) REFERENCES `prof_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `prof_certifications_profId_idx` ON `prof_certifications` (`prof_id`);--> statement-breakpoint
CREATE TABLE `prof_prices` (
	`id` text PRIMARY KEY NOT NULL,
	`prof_id` text NOT NULL,
	`description` text NOT NULL,
	`duration` text,
	`price_eur` integer NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`prof_id`) REFERENCES `prof_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `prof_prices_profId_idx` ON `prof_prices` (`prof_id`);--> statement-breakpoint
CREATE TABLE `prof_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`bio` text,
	`photo_url` text,
	`is_verified` integer DEFAULT false NOT NULL,
	`is_published` integer DEFAULT false NOT NULL,
	`city` text NOT NULL,
	`region` text,
	`phone` text,
	`contact_email` text,
	`contact_visibility` text DEFAULT 'phone_email',
	`response_time` text,
	`websites` text,
	`equipment_provided` integer DEFAULT false NOT NULL,
	`equipment_note` text,
	`languages` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prof_profiles_user_id_unique` ON `prof_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `prof_sports` (
	`id` text PRIMARY KEY NOT NULL,
	`prof_id` text NOT NULL,
	`sport` text NOT NULL,
	`accepted_levels` text,
	FOREIGN KEY (`prof_id`) REFERENCES `prof_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `prof_sports_profId_idx` ON `prof_sports` (`prof_id`);--> statement-breakpoint
CREATE TABLE `prof_spots` (
	`id` text PRIMARY KEY NOT NULL,
	`prof_id` text NOT NULL,
	`name` text NOT NULL,
	`is_primary` integer DEFAULT false NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`prof_id`) REFERENCES `prof_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `prof_spots_profId_idx` ON `prof_spots` (`prof_id`);--> statement-breakpoint
CREATE TABLE `rider_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`photo_url` text,
	`birth_year` integer,
	`city` text NOT NULL,
	`bio` text,
	`max_distance_km` integer,
	`equipment_preference` text,
	`goals` text,
	`format_preferences` text,
	`availability_days` text,
	`availability_slots` text,
	`budget_ranges` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rider_profiles_user_id_unique` ON `rider_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `rider_sports` (
	`id` text PRIMARY KEY NOT NULL,
	`rider_id` text NOT NULL,
	`sport` text NOT NULL,
	`level` text,
	FOREIGN KEY (`rider_id`) REFERENCES `rider_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `rider_sports_riderId_idx` ON `rider_sports` (`rider_id`);--> statement-breakpoint
CREATE TABLE `rider_spots` (
	`id` text PRIMARY KEY NOT NULL,
	`rider_id` text NOT NULL,
	`name` text NOT NULL,
	`is_preferred` integer DEFAULT false NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`rider_id`) REFERENCES `rider_profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `rider_spots_riderId_idx` ON `rider_spots` (`rider_id`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`prof_id` text NOT NULL,
	`rider_id` text,
	`rider_name` text,
	`rider_level` text,
	`rating` integer NOT NULL,
	`body` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`prof_id`) REFERENCES `prof_profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`rider_id`) REFERENCES `rider_profiles`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `reviews_profId_idx` ON `reviews` (`prof_id`);--> statement-breakpoint
CREATE INDEX `reviews_riderId_idx` ON `reviews` (`rider_id`);