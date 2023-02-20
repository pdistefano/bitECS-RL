import { IWorld } from "bitecs";
import { movingQuery, playerQuery, renderableQuery } from "./queries";
import { Position, Display, Movement, Direction, Input } from "./components";
import { CHARACTERS, INPUT_DIRECTION } from "./maps";
import { GameLoop } from "./pipelines";

export const timeSystem = (world) => {
  const { time } = world;
  const now = performance.now();
  const delta = now - time.then;
  time.delta = delta;
  time.elapsed += delta;
  time.then = now;
  return world;
};

export const movementSystem = (world: IWorld) => {
  const movingEntities = movingQuery(world);
  for (let i = 0; i < movingEntities.length; i++) {
    const eid = movingEntities[i];

    const direction: Direction =
      INPUT_DIRECTION[String.fromCharCode(world.charCode)];
    const speed = 1;

    let dX = 0;
    let dY = 0;

    switch (direction) {
      case Direction.Down:
        dX = 0;
        dY = speed;
        break;

      case Direction.Up:
        dX = 0;
        dY = -speed;
        break;

      case Direction.Left:
        dX = -speed;
        dY = 0;
        break;

      case Direction.Right:
        dX = speed;
        dY = 0;
        break;
    }

    Position.x[eid] += dX;
    Position.y[eid] += dY;

    console.log(dX, dY);
  }

  return world;
};

export const renderSystem = (world: IWorld) => {
  const renderableEntities = renderableQuery(world);

  const canvasContext: CanvasRenderingContext2D = world.canvas;
  let scale: number = 10;
  canvasContext.clearRect(0, 0, 32 * scale, 24 * scale);

  console.log("renderableEntities.length :: " + renderableEntities.length);

  for (let i = 0; i < renderableEntities.length; i++) {
    const eid = renderableEntities[i];

    const posX: number = Position.x[eid];
    const posY: number = Position.y[eid];
    const char: string = CHARACTERS[Display.char[eid]];

    switch (char) {
      case ".":
        canvasContext.fillStyle = "#dddddd";
        break;

      case "@":
        canvasContext.fillStyle = "#0000ff";
        break;

      case "#":
        canvasContext.fillStyle = "#000000";
        break;

      default:
        canvasContext.fillStyle = "#ff00ff";
        break;
    }
    canvasContext.fillRect(posX * scale, posY * scale, 1 * scale, 1 * scale);

    // document.getElementById(
    //   "app"
    // ).innerHTML += `Draw ${char} at pos (${posX}, ${posY})`;
  }

  return world;
};

export const turnSystem = (world: IWorld) => {
  console.warn("NEXT TURN");
  return world;
};
