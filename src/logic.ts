const generateRandomName = () => Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 7);

const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const generateRandomCars = () => new Array(100).fill(null).map(() => (
  {
    name: generateRandomName(),
    color: generateRandomColor(),
  }
));
export default generateRandomCars;
