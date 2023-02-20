import { defineComponent, Types } from "bitecs";

const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 };
const Cell = { fgColor: Types.f32, bgColor: Types.f32, char: Types.f32 };

export const Input = defineComponent({ key: Types.ui8 });
export const Player = defineComponent();
export const Position = defineComponent(Vector3);
export const Display = defineComponent(Cell);
export const Movement = defineComponent({
  direction: Types.ui8,
  speed: Types.ui8
});

export enum Direction {
  None,
  Left,
  Right,
  Up,
  Down
}
