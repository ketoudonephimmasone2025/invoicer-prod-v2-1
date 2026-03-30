import { InvoiceWithClient } from "./invoices.types";

export enum KpiTitle {
	INVOICES = "INVOICES",
	REVENUE = "REVENUE",
	PENDING = "PENDING",
	OVERDUE = "OVERDUE",
	CLIENTS = "CLIENTS",
	PAID = "PAID",
	SENT = "SENT",
	DRAFT = "DRAFT",
}

export type DashboardResponse = {
	totalInvoices: number;
	clientsCount: number;
	revenue: number;
	pending: number;
	overdue: number;
	latestInvoices: InvoiceWithClient[];
};
