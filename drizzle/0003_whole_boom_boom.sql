CREATE TABLE `forumCategories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`nameHe` varchar(100),
	`description` text,
	`descriptionHe` text,
	`icon` varchar(50),
	`slug` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `forumCategories_id` PRIMARY KEY(`id`),
	CONSTRAINT `forumCategories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `forumComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`likes` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `forumComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forumLikes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`postId` int,
	`commentId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `forumLikes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forumPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`categoryId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`titleHe` varchar(255),
	`content` text NOT NULL,
	`contentHe` text,
	`language` varchar(10) DEFAULT 'en',
	`likes` int DEFAULT 0,
	`views` int DEFAULT 0,
	`isPinned` int DEFAULT 0,
	`isLocked` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `forumPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `forumComments` ADD CONSTRAINT `forumComments_postId_forumPosts_id_fk` FOREIGN KEY (`postId`) REFERENCES `forumPosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forumComments` ADD CONSTRAINT `forumComments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forumLikes` ADD CONSTRAINT `forumLikes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forumLikes` ADD CONSTRAINT `forumLikes_postId_forumPosts_id_fk` FOREIGN KEY (`postId`) REFERENCES `forumPosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forumLikes` ADD CONSTRAINT `forumLikes_commentId_forumComments_id_fk` FOREIGN KEY (`commentId`) REFERENCES `forumComments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forumPosts` ADD CONSTRAINT `forumPosts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forumPosts` ADD CONSTRAINT `forumPosts_categoryId_forumCategories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `forumCategories`(`id`) ON DELETE no action ON UPDATE no action;