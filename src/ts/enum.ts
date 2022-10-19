enum Endpoints {
  garage = 'garage/',
  winners = 'winners/',
  engine = 'engine/',
}

enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE',
}

enum StatusEngine {
  started = 'started',
  drive = 'drive',
  stopped = 'stopped',
}

export { Endpoints, Methods, StatusEngine };
