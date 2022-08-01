import { getStatusDrive } from './api';
import { SetState } from './ts/types';

const generateRandomName = () => Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 7);

const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const generateRandomCars = () => new Array(100).fill(null).map(() => (
  {
    name: generateRandomName(),
    color: generateRandomColor(),
  }
));

export const getTotalCount = (totalCount: number, limit = 7) => Math.ceil(totalCount / limit);

export const getDuration = (
  velocity: number,
  distance: number,
) => Number((distance / velocity));

export const useAnimationFrame = async (
  resource: string,
  method: string,
  id: number,
  duration: number,
  driving: (progress: number, id: number) => void,
  setState: SetState<Record<number, number> | null>,
) => {
  const start = performance.now();
  const map: Record<number, number> = {};

  const animate = (time: number) => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }

    driving(timeFraction, id);

    if (timeFraction < 1) {
      map[id] = requestAnimationFrame(animate);
    }
  };

  setState(() => map);

  requestAnimationFrame(animate);

  const { success } = await getStatusDrive(resource, id, 'drive', method);

  if (success !== 200) {
    cancelAnimationFrame(map[id]);
  }
};
