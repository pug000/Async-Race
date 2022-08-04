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

export interface ResponseObject {
  data: CarData[],
  count: number | null,
}

export interface Engine {
  velocity: number,
  distance: number,
}

export interface Winner {
  name: string,
  id: number,
  wins: number,
  time: number,
}

export interface NewWinner extends Omit<Winner, 'wins'> {
  name: string,
}
