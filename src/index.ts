import { addComponent, addEntity, createWorld, IWorld } from "bitecs";
import { Position, Display, Movement, Player, Input } from "./components";
import { GameLoop } from "./pipelines";
import "./styles.css";

const world = createWorld();
world.name = "MyWorld";
world.time = {
  delta: 0,
  elapsed: 0,
  then: performance.now()
};
world.charCode = 0;

var c = document.getElementById("canvas");
world.canvas = c.getContext("2d");

const GRID_WIDTH: number = 10;
const GRID_HEIGHT: number = 10;

const player_eid = addEntity(world);
const inputManager_eid = addEntity(world);

for (let x = 0; x < GRID_WIDTH; x += 1) {
  for (let y = 0; y < GRID_HEIGHT; y += 1) {
    const grid_eid = addEntity(world);
    addComponent(world, Position, grid_eid);
    addComponent(world, Display, grid_eid);
    Position.x[grid_eid] = x;
    Position.y[grid_eid] = y;
    Display.char[grid_eid] = 2;
    if (x === 0 || y === 0 || x === GRID_WIDTH - 1 || y === GRID_HEIGHT - 1) {
      Display.char[grid_eid] = 1;
    }
  }
}

addComponent(world, Position, player_eid);
addComponent(world, Display, player_eid);
addComponent(world, Movement, player_eid);
addComponent(world, Player, player_eid);

addComponent(world, Input, inputManager_eid);

Position.x[player_eid] = 0;
Position.y[player_eid] = 9;
Display.char[player_eid] = 0;

// renderSystem(world);

if (document.onkeypress === null) {
  console.log("ADD FUNCTION LISTENER");
  document.onkeypress = (e) => {
    e = e || window.event;
    var charCode = typeof e.which === "number" ? e.which : e.keyCode;
    if (charCode) {
      console.log("Character typed: " + String.fromCharCode(charCode));
      world.charCode = charCode;
      GameLoop(world);
    }
  };
}

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>`;
