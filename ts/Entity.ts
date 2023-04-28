import Vector from "./Vector";

export default interface Entity {
    update?(delta_time: number): void;

    draw?(): void;

    position?: Vector;
    size?: Vector;
}