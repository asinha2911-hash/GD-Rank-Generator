import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const rankCanvas = document.getElementById("rankCanvas");
const ctx = rankCanvas.getContext("2d");
const spaceCanvas = document.getElementById("spaceCanvas");

const ui = {
  rankName: document.getElementById("rankName"),
  extraText: document.getElementById("extraText"),
  preset: document.getElementById("preset"),
  crystalType: document.getElementById("crystalType"),
  crystalLayout: document.getElementById("crystalLayout"),
  ornament: document.getElementById("ornament"),
  crystalCount: document.getElementById("crystalCount"),
  titleSize: document.getElementById("titleSize"),
  glow: document.getElementById("glow"),
  bloom: document.getElementById("bloom"),
  haze: document.getElementById("haze"),
  particles: document.getElementById("particles")
};

const outputPairs = [
  ["crystalCount", "crystalCountOutput"],
  ["titleSize", "titleSizeOutput"],
  ["glow", "glowOutput"],
  ["bloom", "bloomOutput"],
  ["haze", "hazeOutput"],
  ["particles", "particleOutput"]
];

const presets = {
  amethyst: { primary: "#a95fff", glow: "#f1cdff", dark: "#150521" },
  bloodstone: { primary: "#dd2739", glow: "#ffbbb4", dark: "#270307" },
  sapphire: { primary: "#2b85ff", glow: "#c3e5ff", dark: "#03142f" },
  gold: { primary: "#ecae28", glow: "#fff1aa", dark: "#2a1a00" },
  demon: { primary: "#ff541b", glow: "#ffe2bc", dark: "#2b0803" }
};

let animationEnabled = true;
let stars = [];
let scene;
let camera;
let renderer;
let composer;
let bloomPass;
let shaderMaterial;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function rgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function rgba(hex, alpha) {
  const color = rgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function updateOutputs() {
  outputPairs.forEach(([input, output]) => {
    document.getElementById(output).textContent = ui[input].value;
  });
}

function createStars() {
  stars = Array.from({ length: 280 }, () => ({
    x: random(0, 1800),
    y: random(0, 480),
    size: random(0.4, 3.2),
    speed: random(0.08, 0.55),
    phase: random(0, Math.PI * 2)
  }));
}

function polygon(points, fill, stroke = null, width = 1) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach((point) => ctx.lineTo(point[0], point[1]));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

function drawCrystal(x, y, size, type, primary, glow, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 0.001 + x) * 0.1);
  ctx.shadowBlur = size * 0.85;
  ctx.shadowColor = rgba(primary, 0.9);

  if (type === "orb") {
    const material = ctx.createRadialGradient(-size * 0.25, -size * 0.3, 2, 0, 0, size);
    material.addColorStop(0, "#ffffff");
    material.addColorStop(0.15, glow);
    material.addColorStop(0.52, primary);
    material.addColorStop(1, "#12001e");

    ctx.fillStyle = material;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (type === "shard") {
    polygon([[0, -size * 1.4], [size * 0.5, size], [0, size * 1.35], [-size * 0.5, size]], primary, glow, 2);
    polygon([[0, -size * 1.4], [0, size * 1.35], [-size * 0.5, size]], glow);
    ctx.restore();
    return;
  }

  const outer = [
    [0, -size], [size * 0.7, -size * 0.2], [size * 0.6, size * 0.5],
    [size * 0.25, size], [0, size * 1.18], [-size * 0.25, size],
    [-size * 0.6, size * 0.5], [-size * 0.7, -size * 0.2]
  ];

  polygon(outer, "#160522", rgba(glow, 0.9), 2);
  polygon([[0, -size], [size * 0.7, -size * 0.2], [0, 0]], primary);
  polygon([[0, -size], [0, 0], [-size * 0.7, -size * 0.2]], "#f5d6ff");
  polygon([[-size * 0.7, -size * 0.2], [0, 0], [-size * 0.6, size * 0.5]], "#541382");
  polygon([[0, 0], [size * 0.7, -size * 0.2], [size * 0.6, size * 0.5]], "#7f24bc");
  polygon([[-size * 0.6, size * 0.5], [0, 0], [-size * 0.25, size]], "#30074e");
  polygon([[0, 0], [size * 0.6, size * 0.5], [size * 0.25, size]], "#47106d");
  polygon([[-size * 0.25, size], [0, 0], [0, size * 1.18]], "#200336");
  polygon([[0, 0], [size * 0.25, size], [0, size * 1.18]], "#350658");

  ctx.restore();
}

function crystalLayout(layout, count) {
  const positions = [];

  if (layout === "sides") {
    for (let index = 0; index < count; index++) {
      positions.push({
        x: index % 2 ? random(1420, 1720) : random(80, 380),
        y: random(85, 400),
        size: random(24, 82)
      });
    }
  }

  if (layout === "corners") {
    const corners = [[120, 100], [1680, 100], [120, 380], [1680, 380]];
    for (let index = 0; index < count; index++) {
      const corner = corners[index % 4];
      positions.push({ x: corner[0] + random(-55, 55), y: corner[1] + random(-45, 45), size: random(25, 72) });
    }
  }

  if (layout === "ring") {
    for (let index = 0; index < count; index++) {
      const angle = (Math.PI * 2 * index) / Math.max(count, 1);
      positions.push({ x: 900 + Math.cos(angle) * 570, y: 240 + Math.sin(angle) * 170, size: random(23, 63) });
    }
  }

  return positions;
}

function drawOrnament(type, primary, glow, time) {
  if (type === "none") return;

  ctx.save();
  ctx.translate(900, 220);
  ctx.globalAlpha = 0.34;
  ctx.shadowBlur = 55;
  ctx.shadowColor = primary;
  ctx.fillStyle = rgba(primary, 0.5);
  ctx.strokeStyle = glow;
  ctx.lineWidth = 7;

  if (type === "crown") {
    polygon([[-165, 85], [-130, -62], [-58, 12], [0, -118], [58, 12], [130, -62], [165, 85]], rgba(primary, 0.45), glow, 7);
    ctx.fillRect(-170, 85, 340, 32);
  }

  if (type === "wings") {
    for (const direction of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(direction * 150, -125, direction * 315, -52);
      ctx.quadraticCurveTo(direction * 175, 35, 0, 34);
      ctx.fill();
      ctx.stroke();
    }
  }

  if (type === "star") {
    ctx.rotate(time * 0.00015);
    ctx.beginPath();
    for (let index = 0; index < 12; index++) {
      const angle = (Math.PI * 2 * index) / 12;
      const length = index % 2 ? 34 : 138;
      ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawRank(time) {
  const preset = presets[ui.preset.value];
  const title = ui.rankName.value.trim().toUpperCase() || "AMETHYST";
  const subtitle = ui.extraText.value.trim().toUpperCase() || "TIER XX-PEAK";
  const glowStrength = Number(ui.glow.value) / 100;
  const bloom = Number(ui.bloom.value);
  const haze = Number(ui.haze.value) / 100;

  ctx.clearRect(0, 0, 1800, 480);

  for (let index = 0; index < 5; index++) {
    const x = 180 + index * 360;
    const y = 90 + (index % 2) * 290;
    const cloud = ctx.createRadialGradient(x, y, 0, x, y, 300);
    cloud.addColorStop(0, rgba(preset.primary, haze * 0.18));
    cloud.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = cloud;
    ctx.fillRect(0, 0, 1800, 480);
  }

  stars.slice(0, Number(ui.particles.value)).forEach((star) => {
    const y = (star.y + time * star.speed * 0.02) % 480;
    const alpha = 0.35 + Math.sin(time * 0.002 + star.phase) * 0.3;

    ctx.shadowBlur = star.size * 3;
    ctx.shadowColor = preset.glow;
    ctx.fillStyle = rgba(preset.glow, alpha);
    ctx.beginPath();
    ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.save();
  ctx.shadowBlur = bloom;
  ctx.shadowColor = preset.primary;
  ctx.strokeStyle = rgba(preset.glow, 0.78);
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 1760, 440);
  ctx.restore();

  drawOrnament(ui.ornament.value, preset.primary, preset.glow, time);

  crystalLayout(ui.crystalLayout.value, Number(ui.crystalCount.value)).forEach((crystal) => {
    drawCrystal(crystal.x, crystal.y, crystal.size, ui.crystalType.value, preset.primary, preset.glow, time);
  });

  let fontSize = Number(ui.titleSize.value);
  while (fontSize > 50) {
    ctx.font = `900 ${fontSize}px "Cinzel Decorative"`;
    if (ctx.measureText(title).width < 1080) break;
    fontSize -= 2;
  }

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px "Cinzel Decorative"`;
  ctx.shadowBlur = bloom;
  ctx.shadowColor = rgba(preset.glow, glowStrength);
  ctx.lineWidth = 17;
  ctx.strokeStyle = rgba(preset.primary, 0.9);
  ctx.strokeText(title, 900, 265);

  ctx.shadowBlur = 0;
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#190326";
  ctx.strokeText(title, 900, 265);

  const metal = ctx.createLinearGradient(0, 170, 0, 350);
  metal.addColorStop(0, "#ffffff");
  metal.addColorStop(0.18, preset.glow);
  metal.addColorStop(0.5, preset.primary);
  metal.addColorStop(0.76, "#ffeaff");
  metal.addColorStop(1, "#50107b");

  ctx.fillStyle = metal;
  ctx.fillText(title, 900, 265);

  ctx.font = "800 20px Inter";
  ctx.fillStyle = rgba(preset.glow, 0.95);
  ctx.fillText(subtitle, 900, 360);
  ctx.restore();
}

function setupWebGL() {
  renderer = new THREE.WebGLRenderer({ canvas: spaceCanvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      colorA: { value: new THREE.Color("#18052b") },
      colorB: { value: new THREE.Color("#050109") },
      haze: { value: 0.6 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float time;
      uniform float haze;
      uniform vec3 colorA;
      uniform vec3 colorB;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = vUv;
        float wave = sin(uv.x * 7.0 + time * 0.25) * 0.08;
        float cloud = noise(uv * 9.0 + wave + time * 0.02);
        float nebula = smoothstep(0.36, 0.78, cloud) * haze;
        vec3 color = mix(colorB, colorA, nebula);
        color += vec3(0.15, 0.04, 0.25) * sin(uv.y * 8.0 + time * 0.3) * haze;
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.35, 0.55, 0.12);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());

  resizeWebGL();
}

function resizeWebGL() {
  const width = spaceCanvas.clientWidth;
  const height = spaceCanvas.clientHeight;

  renderer.setSize(width, height, false);
  composer.setSize(width, height);
}

function render(time = 0) {
  if (animationEnabled) {
    const preset = presets[ui.preset.value];

    shaderMaterial.uniforms.time.value = time * 0.001;
    shaderMaterial.uniforms.colorA.value.set(preset.primary);
    shaderMaterial.uniforms.colorB.value.set(preset.dark);
    shaderMaterial.uniforms.haze.value = Number(ui.haze.value) / 100;

    bloomPass.strength = Number(ui.bloom.value) / 42;
    bloomPass.radius = Number(ui.bloom.value) / 100;

    composer.render();
    drawRank(time);
  }

  requestAnimationFrame(render);
}

Object.values(ui).forEach((element) => {
  element.addEventListener("input", () => {
    updateOutputs();
    drawRank(performance.now());
  });
});

document.getElementById("randomizeButton").addEventListener("click", () => {
  createStars();
  drawRank(performance.now());
});

document.getElementById("animationButton").addEventListener("click", (event) => {
  animationEnabled = !animationEnabled;
  event.target.textContent = animationEnabled ? "Pause animation" : "Start animation";
});

document.getElementById("downloadButton").addEventListener("click", () => {
  const output = document.createElement("canvas");
  output.width = 1800;
  output.height = 480;

  const outputCtx = output.getContext("2d");
  outputCtx.drawImage(spaceCanvas, 0, 0, 1800, 480);
  outputCtx.drawImage(rankCanvas, 0, 0);

  const link = document.createElement("a");
  link.download = `${ui.rankName.value.trim() || "rank"}-rank.png`;
  link.href = output.toDataURL("image/png");
  link.click();
});

window.addEventListener("resize", resizeWebGL);

createStars();
updateOutputs();
setupWebGL();
document.fonts.ready.then(() => {
  drawRank(0);
  requestAnimationFrame(render);
});