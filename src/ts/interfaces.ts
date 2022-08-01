export interface CarData {
  name: string,
  color: string,
  id: number,
}

export interface Button {
  id: number,
  text: string,
}

export interface ResponseObject {
  data: CarData[],
  count: number | null,
}

export interface Engine {
  velocity: number,
  distance: number,
}
