import Canvas from "./engine/Canvas.js";
import Composer from "./engine/Composer.js";
import Renderer from "./engine/Renderer.js";

import StarField from "./components/StarField.js";
import RankCrystal from "./components/RankCrystal.js";
import RankFrame from "./components/RankFrame.js";
import RankText from "./components/RankText.js";
import Particles from "./components/Particles.js";
import Decorations from "./components/Decorations.js";


const canvas=new Canvas();

const composer=new Composer();


composer.add(new StarField());

composer.add(
new RankCrystal({
color:"#990000"
})
);


composer.add(
new RankFrame()
);


composer.add(
new Decorations()
);


composer.add(
new Particles()
);


composer.add(
new RankText("BLOODSTONE")
);



const renderer=new Renderer(
canvas,
composer
);


renderer.start();
