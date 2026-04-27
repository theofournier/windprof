CREATE TABLE `comment` (
	`id` text PRIMARY KEY NOT NULL,
	`comment` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`priority` integer DEFAULT 1 NOT NULL
);
