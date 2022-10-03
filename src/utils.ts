import {
  ButtonState,
  CarData
} from 'ts/interfaces';

import { getStatusDrive } from './api';
import carBrandName from './layout/carBrandName';
import carModelName from './layout/carModelName';

const defaultCar: CarData = {
  name: '',
  color: '#ffffff',
  id: 0,
};

const selectionButton: ButtonState[] = [
  { id: 1, text: 'Select' },
  { id: 2, text: 'Remove' },
];

const controlButtons: ButtonState[] = [
  { id: 1, text: 'Race', isDisabled: false },
  { id: 2, text: 'Reset', isDisabled: true },
  { id: 3, text: 'Generate Cars', isDisabled: false },
];

const getRandomValue = (item: string[]) => Math.floor(Math.random() * item.length);

const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const getRandomName = () => `${carBrandName[getRandomValue(carBrandName)]} ${carModelName[getRandomValue(carModelName)]}`;

const generateRandomCars = () => new Array(100).fill(null).map(() => (
  {
    name: getRandomName(),
    color: generateRandomColor(),
  }
));

const getTotalCount = (totalCount: number, limit: number) => Math.ceil(totalCount / limit);

const getDuration = (velocity: number, distance: number) => Number((distance / velocity));

const startAnimation = async (
  id: number,
  index: number,
  duration: number,
  driving: (progress: number, id: number) => void,
  ref: Record<number, number>,
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
  defaultCar,
  selectionButton,
  controlButtons,
  generateRandomCars,
  getTotalCount,
  getDuration,
  startAnimation
};
