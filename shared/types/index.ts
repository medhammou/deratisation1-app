/**
 * Types partagés entre le backend, l'application mobile et l'application web
 * Ces types assurent la cohérence des données à travers les différentes parties de l'application
 */

// Énumérations partagées
export enum UserRole {
  AGENT = 'agent',
  SUPERVISOR = 'supervisor',
  CLIENT = 'client',
  ADMIN = 'admin',
}

export enum StationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  REMOVED = 'removed',
  DAMAGED = 'damaged',
}

export enum ConsumptionLevel {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum IncidentType {
  NONE = 'none',
  STATION_DAMAGED = 'station_damaged',
  STATION_MOVED = 'station_moved',
  NON_TARGET_ANIMAL = 'non_target_animal',
  OTHER = 'other',
}

export enum PhotoType {
  STATION = 'station',
  INCIDENT = 'incident',
  CONSUMPTION = 'consumption',
  OTHER = 'other',
}

// Interfaces partagées
export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISite {
  id: string;
  name: string;
  address: string;
  description?: string;
  clientReference?: string;
  location?: ICoordinates;
  planImagePath?: string;
  isActive: boolean;
  client?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStation {
  id: string;
  identifier: string;
  location: ICoordinates;
  description?: string;
  planPositionX?: number;
  planPositionY?: number;
  status: StationStatus;
  removalReason?: string;
  siteId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIntervention {
  id: string;
  consumptionLevel: ConsumptionLevel;
  notes?: string;
  incidentType: IncidentType;
  incidentDescription?: string;
  baitReplaced: boolean;
  stationCleaned: boolean;
  agentId: string;
  stationId: string;
  isSynchronized: boolean;
  localCreatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPhoto {
  id: string;
  filePath: string;
  thumbnailPath?: string;
  type: PhotoType;
  description?: string;
  interventionId: string;
  isSynchronized: boolean;
  localCreatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les requêtes API
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
  expiresAt: number;
}

export interface ISyncRequest {
  lastSyncTimestamp: number;
  interventions: IIntervention[];
  photos: IPhoto[];
}

export interface ISyncResponse {
  sites: ISite[];
  stations: IStation[];
  interventions: IIntervention[];
  photos: IPhoto[];
  timestamp: number;
}
