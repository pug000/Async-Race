const getCars = async (
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

export default getCars;
