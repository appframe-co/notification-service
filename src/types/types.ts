import { Application } from "express";
import { SortOrder } from "mongoose";

export type RoutesInput = {
  app: Application,
}

export type TErrorResponse = {
  error: string|null;
  description?: string;
  property?: string;
}

export type TAlertModel = {
  id: string;
  userId: string;
  message: string;
  createdAt: Date;
  read: boolean;
  subjectId: string;
  subjectType: string;
  projectId: string;
  structureId: string;
}

export type TAlert = {
  id: string;
  userId: string;
  message: string;
  createdAt: Date;
  read: boolean;
  subjectId: string;
  subjectType: string;
}

export type TParameters = {
  limit?: number;
  page?: number;
}

export type TSort = {[key: string]: SortOrder};