interface CarData {
  name: string;
  color: string;
  id: number;
}

interface ButtonState {
  id: number;
  text: string;
  isDisabled?: boolean;
}

interface Engine {
  velocity: number;
  distance: number;
}

interface Winner extends CarData {
  wins: number;
  time: number;
}

interface TableHeadTh {
  id: number;
  text: string;
  type?: string;
  isClickable: boolean;
  isASC?: boolean;
  isDESC?: boolean;
}

interface SortFields {
  type: string;
  order: string;
}

interface StyledActive {
  active: boolean;
}

interface InputType {
  $type: string;
}

interface ApiResponse<T> {
  data: T[];
  totalCount: number;
}

export type {
  CarData,
  ButtonState,
  Engine,
  Winner,
  TableHeadTh,
  SortFields,
  StyledActive,
  InputType,
  ApiResponse,
};
