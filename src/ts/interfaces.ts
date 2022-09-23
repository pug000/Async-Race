interface CarData {
  name: string,
  color: string,
  id: number,
}

interface Button {
  id: number,
  text: string,
  isDisabled?: boolean,
}

interface ResponseCarData {
  data: CarData[],
  count: number | null,
}

interface ResponseWinner extends Omit<ResponseCarData, 'data'> {
  data: Winner[],
}

interface Engine {
  velocity: number,
  distance: number,
}

interface Winner extends CarData {
  wins: number,
  time: number,
}

interface Api {
  [key: string]: string,
}

interface TableHeadTh {
  id: number,
  text: string,
  isASC?: boolean,
  isDESC?: boolean,
}

interface SortBy {
  type: string,
  order: string,
}

export type {
  CarData,
  Button,
  ResponseCarData,
  ResponseWinner,
  Engine,
  Winner,
  Api,
  TableHeadTh,
  SortBy
};
