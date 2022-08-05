export interface CarData {
  name: string,
  color: string,
  id: number,
}

export interface Button {
  id: number,
  text: string,
  isDisabled?: boolean,
}

export interface ResponseCarData {
  data: CarData[],
  count: number | null,
}

export interface ResponseWinner extends Omit<ResponseCarData, 'data'> {
  data: Winner[],
}

export interface Engine {
  velocity: number,
  distance: number,
}

export interface Winner extends CarData {
  wins: number,
  time: number,
}

export interface Api {
  [key: string]: string,
}

export interface TableHeadTh {
  id: number,
  text: string,
  isASC?: boolean,
  isDESC?: boolean,
}

export interface SortBy {
  type: string,
  order: string,
}
