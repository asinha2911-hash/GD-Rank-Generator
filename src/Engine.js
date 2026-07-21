import * as THREE from "three";


export default class Engine {

    constructor(){

        this.scene = new THREE.Scene();


        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });


        this.renderer.setPixelRatio(
            window.devicePixelRatio
        );


        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        document.body.appendChild(
            this.renderer.domElement
        );


        window.addEventListener(
            "resize",
            () => this.resize()
        );

    }


    resize(){

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }


    render(camera){

        this.renderer.render(
            this.scene,
            camera
        );

    }

}