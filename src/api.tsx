export const getCars = async (
  url: string,
  resource: string,
  method: string,
) => {
  try {
    const res = await fetch(`${url}/${resource}`, { method });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const removeCar = async (
  url: string,
  resource: string,
  method: string,
  id: number,
  removeCarFromGarage: (id: number) => void,
) => {
  try {
    const res = await fetch(`${url}/${resource}/${id}`, { method });
    const data = await res.json();
    removeCarFromGarage(id);
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};
