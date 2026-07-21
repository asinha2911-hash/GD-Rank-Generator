import "./style.css";


import Engine from "./Engine.js";
import Camera from "./Camera.js";
import SceneManager from "./SceneManager.js";


console.log(
    "Bloodstone Engine started!"
);



const engine =
    new Engine();


const camera =
    new Camera();


const scene =
    new SceneManager(
        engine.scene
    );



function animate(){

    requestAnimationFrame(
        animate
    );


    scene.update();


    engine.render(
        camera.get()
    );

}


animate();