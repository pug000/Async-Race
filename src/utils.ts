import { CarData, TableHeadTh } from 'ts/interfaces';

import { getStatusDrive } from './api';
import carBrandName from './layout/carBrandName';
import carModelName from './layout/carModelName';

const hexadecimalFormat = 16777215;

const limitCarsPerPage = 7;

const limitWinnersPerPage = 10;

const defaultCar: CarData = {
  name: '',
  color: '#ffffff',
  id: 0,
};

const initialTableHeadThs: TableHeadTh[] = [
  { id: 1, text: 'Number', isClickable: false },
  { id: 2, text: 'Car', isClickable: false },
  { id: 3, text: 'Name', isClickable: false },
  {
    id: 4,
    text: 'Wins',
    type: 'wins',
    isASC: false,
    isDESC: false,
    isClickable: true,
  },
  {
    id: 5,
    text: 'Best time (s)',
    type: 'time',
    isASC: false,
    isDESC: false,
    isClickable: true,
  },
];

const getRandomValue = (item: string[]) =>
  Math.floor(Math.random() * item.length);

const generateRandomColor = () =>
  `#${Math.floor(Math.random() * hexadecimalFormat).toString(16)}`;

const getRandomName = () =>
  `${carBrandName[getRandomValue(carBrandName)]} ${
    carModelName[getRandomValue(carModelName)]
  }`;

const generateRandomCars = () =>
  new Array(100).fill(null).map(() => ({
    name: getRandomName(),
    color: generateRandomColor(),
  }));

const getTotalCount = (totalCount: number, limit: number) =>
  Math.ceil(totalCount / limit);

const getDuration = (velocity: number, distance: number) =>
  Number(distance / velocity);

const startAnimation = async (
  id: number,
  index: number,
  duration: number,
  driving: (progress: number, id: number) => void,
  ref: Record<number, number>
) => {
  const start = performance.now();
  const map = ref;
  const animate = (time: number) => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    driving(timeFraction, index);
    if (timeFraction < 1) {
      map[id] = requestAnimationFrame(animate);
    }
  };
  map[id] = requestAnimationFrame(animate);
  const { success }: { success: boolean } = await getStatusDrive(id);
  if (!success) {
    cancelAnimationFrame(map[id]);
  }
  return success;
};

export {
  limitCarsPerPage,
  limitWinnersPerPage,
  defaultCar,
  initialTableHeadThs,
  generateRandomCars,
  getTotalCount,
  getDuration,
  startAnimation,
};
