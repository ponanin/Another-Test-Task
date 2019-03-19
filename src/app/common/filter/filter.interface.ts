export interface IFilterParams {
  title: string;
  type: number;
  data: Array<IFilterParam>;
}

export interface IFilterState {
  title: string;
  type: number;
  data: Array<any>;
}

export interface IFilterParam {
  searchValue: any;
  title: string;
}
