export interface CarData {
  name: string,
  color: string,
  id: number,
}

export interface Methods {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
}

export interface Resource {
  garage: 'garage',
  winners: 'winners',
}
