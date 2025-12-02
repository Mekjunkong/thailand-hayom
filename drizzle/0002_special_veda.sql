CREATE TABLE `quizPerformance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`phraseId` int NOT NULL,
	`correct` int NOT NULL DEFAULT 0,
	`incorrect` int NOT NULL DEFAULT 0,
	`lastReviewed` timestamp NOT NULL DEFAULT (now()),
	`nextReview` timestamp NOT NULL DEFAULT (now()),
	`easinessFactor` int NOT NULL DEFAULT 250,
	`interval` int NOT NULL DEFAULT 1,
	`repetitions` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quizPerformance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `quizPerformance` ADD CONSTRAINT `quizPerformance_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;