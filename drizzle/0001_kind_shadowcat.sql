CREATE TABLE `bookmarkedPhrases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`phraseIndex` int NOT NULL,
	`phraseText` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookmarkedPhrases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`sessionId` varchar(255) NOT NULL,
	`userMessage` text NOT NULL,
	`assistantMessage` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`stripeSessionId` varchar(255) NOT NULL,
	`stripePaymentIntentId` varchar(255),
	`productType` varchar(50) NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(10) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerName` text,
	`status` varchar(50) NOT NULL,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `purchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `purchases_stripeSessionId_unique` UNIQUE(`stripeSessionId`)
);
--> statement-breakpoint
CREATE TABLE `userProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`quizScore` int,
	`lastAccessedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `bookmarkedPhrases` ADD CONSTRAINT `bookmarkedPhrases_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chatLogs` ADD CONSTRAINT `chatLogs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userProgress` ADD CONSTRAINT `userProgress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;