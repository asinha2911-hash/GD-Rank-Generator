import * as THREE from "three";


export default class SceneManager {


    constructor(scene){

        this.scene = scene;

        this.createCrystal();

        this.createLight();

    }



    createCrystal(){

        const geometry =
            new THREE.IcosahedronGeometry(
                1,
                2
            );


        const material =
            new THREE.MeshStandardMaterial({

                color: 0x22ff66,

                metalness: 0.8,

                roughness: 0.25

            });


        this.crystal =
            new THREE.Mesh(
                geometry,
                material
            );


        this.scene.add(
            this.crystal
        );

    }



    createLight(){

        const light =
            new THREE.PointLight(
                0xffffff,
                10,
                100
            );


        light.position.set(
            3,
            3,
            3
        );


        this.scene.add(light);


        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                0.5
            );


        this.scene.add(ambient);

    }



    update(){

        this.crystal.rotation.y += 0.01;

        this.crystal.rotation.x += 0.005;

    }

}