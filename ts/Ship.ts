import Entity from "./Entity.js";
import Game from "./Game.js";
import Vector from "./Vector.js";
import Input from "./Input.js";

export default class Ship implements Entity {
    position = new Vector(this.game.game_width / 2, this.game.game_height / 2);
    size = new Vector(100, 100);
    private angel: number = 90;
    private TURN_SPEED = .3;
    private velocity = new Vector(0, 0);
    private THRUST: number = .1;
    private FRICTION: number = .1;

    constructor(private game: Game) {
    }

    draw() {
        //center of the ship
        this.game.ctx.fillStyle = "red";
        this.game.ctx.fillRect(this.position.x, this.position.y, 1, 1)

        this.game.ctx.strokeStyle = "white";
        this.game.ctx.beginPath();
        //top of the ship
        this.game.ctx.moveTo(this.position.x + Math.cos(this.deg_to_rad(this.angel)) * this.size.x / 2, this.position.y - this.size.y * Math.sin(this.deg_to_rad(this.angel)) / 2);
        //bottom left of the ship
        this.game.ctx.lineTo(this.position.x + Math.cos(this.deg_to_rad(this.angel + 120)) * this.size.x / 2, this.position.y - this.size.y * Math.sin(this.deg_to_rad(this.angel + 120)) / 2);
        //bottom right of the ship
        this.game.ctx.lineTo(this.position.x + Math.cos(this.deg_to_rad(this.angel + 120 + 120)) * this.size.x / 2, this.position.y - this.size.y * Math.sin(this.deg_to_rad(this.angel + 120 + 120)) / 2,);
        this.game.ctx.closePath();
        this.game.ctx.stroke();
    }

    update(delta_time: number) {
        this.move(delta_time)
    }

    private deg_to_rad(angel: number) {
        return angel / 180 * Math.PI;
    }

    private move(delta_time: number) {
        //rotate left
        if (Input.LEFT_ARROW) this.angel += this.TURN_SPEED * delta_time;
        //rotate right
        if (Input.RIGHT_ARROW) this.angel -= this.TURN_SPEED * delta_time;

        //thrust
        if (Input.UP_ARROW) {
            this.velocity.x += this.THRUST * Math.cos(this.deg_to_rad(this.angel))
            this.velocity.y -= this.THRUST * Math.sin(this.deg_to_rad(this.angel))
        }
        else{
            this.velocity.x -= this.FRICTION * this.velocity.x
            this.velocity.y -= this.FRICTION * this.velocity.y
        }

        //move
        this.position.x += this.velocity.x * delta_time;
        this.position.y += this.velocity.y * delta_time;
    }
}