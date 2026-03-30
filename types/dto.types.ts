// Data Transfer Objects

import { InvoiceStatus } from "@prisma/client";

export type UserDTO = {
	id: string;
	email: string;
	name: string | null;
	avatarUrl: string | null;
};

export type InvoiceDTO = {
	id: string;
	number: number;
	amount: number;
	status: InvoiceStatus;
	dueDate: Date;
	clientId: string;
	createdAt: Date;
};

export type ClientDTO = {
	id: string;
	name: string;
	email: string | null;
	avatarUrl: string | null;
	createdAt: Date;
	company: string | null;
	phone: string | null;
};
