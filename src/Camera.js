import * as THREE from "three";


export default class Camera {


    constructor(){

        this.camera =
            new THREE.PerspectiveCamera(
                60,
                window.innerWidth /
                window.innerHeight,
                0.1,
                1000
            );


        this.camera.position.z = 5;

    }


    get(){

        return this.camera;

    }

}