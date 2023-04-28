export default class Input {
    static LEFT_ARROW = false;
    static RIGHT_ARROW: boolean = false;
    static UP_ARROW: boolean = false;
    constructor() {
        window.addEventListener("keydown", e => {
            // console.log(e.key);
            if (e.key === "ArrowLeft") {
                Input.LEFT_ARROW = true;
            }else if (e.key === "ArrowRight") {
                Input.RIGHT_ARROW = true;
            }else if (e.key === "ArrowUp") {
                Input.UP_ARROW = true;
            }
        });
        window.addEventListener("keyup", e => {
            if (e.key === "ArrowLeft") {
                Input.LEFT_ARROW = false;
            }else if (e.key === "ArrowRight") {
                Input.RIGHT_ARROW = false;
            }else if (e.key === "ArrowUp") {
                Input.UP_ARROW = false;
            }
        });
    }
};