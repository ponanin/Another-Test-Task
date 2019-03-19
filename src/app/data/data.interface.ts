import { Statuses, StatusWorker } from './data.enum';

export interface IRelation {
  id: number;
  name: string;
}

export interface IData {
  id: number;
  name: string;
  description: string;
}

export interface IFirstData extends IData {
  relateItems: Array<IRelation>;
  status: Statuses;
}

export interface ICard {
  phone: string;
  email: string;
}

export interface ISecondData extends IData {
  surname: string;
  card: ICard;
  status: Array<StatusWorker>;
}
