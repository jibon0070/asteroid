import Entity from "./Entity.js";
import Ship from "./Ship.js";
import Input from "./Input.js";

export default class Game {
    private canvas: HTMLCanvasElement;
    private request_animation_listener!: number;
    private last_time: number = 0;
    ctx: CanvasRenderingContext2D;
    private entities: Entity[] = [];
    private ship!: Ship;
    game_width: number;
    game_height: number;

    constructor() {
        this.canvas = document.querySelector("canvas")!;
        //canvas full width and height
        this.canvas.width = this.game_width = window.innerWidth;
        this.canvas.height = this.game_height = window.innerHeight;
        this.ctx = this.canvas?.getContext("2d")!;
        new Input();
        this.play();
    }

    private play() {
        if (this.request_animation_listener) cancelAnimationFrame(this.request_animation_listener);
        this.entities = [];
        this.ship = new Ship(this);
        this.entities.push(this.ship);
        this.render(0);
    }

    private render(time: number) {
        //calculate delta time
        const delta_time = time - this.last_time;
        this.last_time = time;
        this.update(delta_time);
        this.draw();
        this.request_animation_listener = requestAnimationFrame(this.render.bind(this));
    }

    private update(delta_time: number) {
        for (const entity of this.entities) {
            entity.update?.(delta_time);
        }
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //paint black
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (const entity of this.entities) {
            entity.draw?.();
        }
    }
}