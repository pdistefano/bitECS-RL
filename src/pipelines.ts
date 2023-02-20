import { pipe } from "bitecs";
import { movementSystem, renderSystem, timeSystem } from "./systems";

export const GameLoop = pipe(movementSystem, renderSystem, timeSystem);
