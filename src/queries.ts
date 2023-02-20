import { defineQuery } from "bitecs";
import { Position, Display, Movement, Player, Input } from "./components";

export const movingQuery = defineQuery([Position, Movement]);
export const renderableQuery = defineQuery([Position, Display]);
export const playerQuery = defineQuery([Player, Movement, Input]);
