const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const WIDTH = 960;
const HEIGHT = 540;
const FPS = 30;
const DURATION_SEC = 20;
const TOTAL_FRAMES = FPS * DURATION_SEC;

const outputPath = path.join(__dirname, '../public/tost_snow_leopard_night_camera.mp4');

// Ensure output dir exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Generating ${TOTAL_FRAMES} frames of Snow Leopard Night Thermal Camera Video (${WIDTH}x${HEIGHT} @ ${FPS}fps)...`);

const ffmpeg = spawn('ffmpeg', [
  '-y',
  '-f', 'image2pipe',
  '-vcodec', 'ppm',
  '-r', `${FPS}`,
  '-i', '-',
  '-c:v', 'libx264',
  '-profile:v', 'main',
  '-pix_fmt', 'yuv420p',
  '-crf', '22',
  '-preset', 'fast',
  '-movflags', '+faststart',
  outputPath
]);

ffmpeg.stderr.on('data', (data) => {
  // ffmpeg progress
});

ffmpeg.on('close', (code) => {
  console.log(`FFmpeg process exited with code ${code}. Saved to ${outputPath}`);
});

// Precompute static terrain heights & rock textures for Tost ridge
const terrain = new Float32Array(WIDTH * HEIGHT);
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    // Diagonal ridge lines (similar to Tost geological fault lines)
    const diag1 = (x * 0.65 + y * 0.8) * 0.03;
    const diag2 = (x * 0.35 - y * 0.5) * 0.05;
    const rockyNoise =
      Math.sin(diag1) * 25 +
      Math.cos(diag2) * 20 +
      Math.sin((x + y * 2) * 0.1) * 8 +
      Math.cos((x * 2 - y) * 0.15) * 5 +
      Math.sin(x * 0.015) * 35;
    
    // Sloped elevation brightness from top-left to bottom-right
    const slope = (y / HEIGHT) * 60 + ((WIDTH - x) / WIDTH) * 40;
    
    // Rock texture micro-crags
    const microCrag = Math.sin(x * 0.2 + Math.cos(y * 0.2)) * 6;
    
    terrain[y * WIDTH + x] = Math.max(10, Math.min(180, slope + rockyNoise + microCrag + 40));
  }
}

// PPM buffer
const ppmHeader = Buffer.from(`P6\n${WIDTH} ${HEIGHT}\n255\n`);
const frameBuffer = Buffer.alloc(WIDTH * HEIGHT * 3);

function drawCircle(centerX, centerY, radius, intensity, softness = 0.5) {
  const minX = Math.max(0, Math.floor(centerX - radius));
  const maxX = Math.min(WIDTH - 1, Math.ceil(centerX + radius));
  const minY = Math.max(0, Math.floor(centerY - radius));
  const maxY = Math.min(HEIGHT - 1, Math.ceil(centerY + radius));
  const r2 = radius * radius;

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const d2 = dx * dx + dy * dy;
      if (d2 <= r2) {
        const distRatio = Math.sqrt(d2) / radius;
        const falloff = Math.pow(1 - distRatio, softness);
        const idx = (y * WIDTH + x) * 3;
        const val = Math.min(255, frameBuffer[idx] + intensity * falloff);
        frameBuffer[idx] = val;
        frameBuffer[idx + 1] = val;
        frameBuffer[idx + 2] = val;
      }
    }
  }
}

function drawCapsule(x1, y1, x2, y2, radius, intensity) {
  const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / (radius * 0.5)) + 1;
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const cx = x1 + (x2 - x1) * t;
    const cy = y1 + (y2 - y1) * t;
    drawCircle(cx, cy, radius, intensity, 0.6);
  }
}

for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
  const t = frame / FPS; // seconds in video
  
  // Progress along the path [0 -> 1]
  const pathProgress = (t / DURATION_SEC) % 1.0;
  
  // Path trajectory across Tost mountain ridge (similar to uploaded drone/IR video)
  // Starts on upper right ridge, walks down-left across rocky slope, turns towards bottom center
  let leoX, leoY, leoAngle;
  if (pathProgress < 0.5) {
    const p = pathProgress / 0.5;
    leoX = 680 - p * 280 + Math.sin(p * Math.PI * 3) * 15;
    leoY = 320 - p * 120 + Math.cos(p * Math.PI * 2) * 10;
    leoAngle = Math.PI * 0.85 + Math.sin(p * Math.PI * 4) * 0.15;
  } else {
    const p = (pathProgress - 0.5) / 0.5;
    leoX = 400 + p * 220 + Math.sin(p * Math.PI * 3) * 20;
    leoY = 200 + p * 150 + Math.cos(p * Math.PI * 2) * 12;
    leoAngle = -Math.PI * 0.15 + Math.sin(p * Math.PI * 4) * 0.15;
  }

  // Walking gait cycle (4-beat quadruped locomotion)
  const gaitSpeed = 5.5; // strides per second
  const stridePhase = t * gaitSpeed * Math.PI * 2;
  
  // Scale of leopard (matches camera distance in IR thermal footage)
  const scale = 1.1 + (leoY / HEIGHT) * 0.3;

  // Initialize frame with background thermal rocks & sensor noise
  for (let i = 0; i < WIDTH * HEIGHT; i++) {
    const px3 = i * 3;
    // Terrain base value
    const baseVal = terrain[i];
    // Dynamic sensor grain noise
    const sensorNoise = (Math.random() - 0.5) * 8;
    const thermalPixel = Math.max(8, Math.min(220, Math.round(baseVal + sensorNoise)));
    
    frameBuffer[px3] = thermalPixel;
    frameBuffer[px3 + 1] = thermalPixel;
    frameBuffer[px3 + 2] = thermalPixel;
  }

  // --- DRAW THERMAL GLOWING SNOW LEOPARD ---
  // In infrared/thermal vision (White-Hot), the warm leopard body is bright white (245-255)
  // with a soft thermal emissivity halo.

  const cosA = Math.cos(leoAngle);
  const sinA = Math.sin(leoAngle);

  // Helper to rotate points relative to leopard center
  const toGlobal = (localX, localY) => {
    return {
      x: leoX + (localX * cosA - localY * sinA) * scale,
      y: leoY + (localX * sinA + localY * cosA) * scale,
    };
  };

  // Body thermal torso
  const chest = toGlobal(12, 0);
  const pelvis = toGlobal(-14, 0);
  const neck = toGlobal(24, -4);
  const head = toGlobal(32, -8);
  const nose = toGlobal(38, -8);

  // Legs gait offsets
  const flLegOffset = Math.sin(stridePhase) * 10;
  const frLegOffset = Math.sin(stridePhase + Math.PI) * 10;
  const hlLegOffset = Math.sin(stridePhase + Math.PI * 0.75) * 10;
  const hrLegOffset = Math.sin(stridePhase + Math.PI * 1.75) * 10;

  // Leg joints
  const flFoot = toGlobal(16 + flLegOffset, 16);
  const frFoot = toGlobal(8 + frLegOffset, 14);
  const hlFoot = toGlobal(-10 + hlLegOffset, 16);
  const hrFoot = toGlobal(-18 + hrLegOffset, 14);

  // Long thick furry counter-balancing tail (curves and sways)
  const tailBase = toGlobal(-20, -2);
  const tailMid = toGlobal(-32 + Math.sin(t * 3.5) * 5, -12 + Math.cos(t * 3) * 6);
  const tailTip = toGlobal(-44 + Math.sin(t * 3.5 + 1) * 8, -20 + Math.cos(t * 3 + 1) * 8);

  // Draw thermal outer halo (soft body heat aura)
  drawCapsule(pelvis.x, pelvis.y, chest.x, chest.y, 18 * scale, 70);
  drawCapsule(chest.x, chest.y, head.x, head.y, 14 * scale, 80);

  // Draw core hot body (white hot 245-255)
  drawCapsule(pelvis.x, pelvis.y, chest.x, chest.y, 10 * scale, 220);
  drawCapsule(chest.x, chest.y, neck.x, neck.y, 8 * scale, 230);
  drawCircle(head.x, head.y, 8 * scale, 245, 0.4);
  drawCircle(nose.x, nose.y, 4 * scale, 210, 0.4);

  // Ears
  const ear1 = toGlobal(30, -15);
  const ear2 = toGlobal(25, -16);
  drawCircle(ear1.x, ear1.y, 3 * scale, 220, 0.3);
  drawCircle(ear2.x, ear2.y, 3 * scale, 200, 0.3);

  // Limbs
  drawCapsule(chest.x, chest.y, flFoot.x, flFoot.y, 4.5 * scale, 210);
  drawCapsule(chest.x, chest.y, frFoot.x, frFoot.y, 4.5 * scale, 190);
  drawCapsule(pelvis.x, pelvis.y, hlFoot.x, hlFoot.y, 5 * scale, 215);
  drawCapsule(pelvis.x, pelvis.y, hrFoot.x, hrFoot.y, 5 * scale, 195);

  // Tail
  drawCapsule(tailBase.x, tailBase.y, tailMid.x, tailMid.y, 5.5 * scale, 200);
  drawCapsule(tailMid.x, tailMid.y, tailTip.x, tailTip.y, 4.5 * scale, 180);

  // Vignette and scanline effect
  for (let y = 0; y < HEIGHT; y++) {
    const scanlineDim = (y % 2 === 0) ? 0.94 : 1.0;
    const dy = (y - HEIGHT / 2) / (HEIGHT / 2);
    for (let x = 0; x < WIDTH; x++) {
      const dx = (x - WIDTH / 2) / (WIDTH / 2);
      const vign = Math.max(0.65, 1 - (dx * dx + dy * dy) * 0.25);
      const idx = (y * WIDTH + x) * 3;
      const factor = vign * scanlineDim;
      frameBuffer[idx] = Math.round(frameBuffer[idx] * factor);
      frameBuffer[idx + 1] = Math.round(frameBuffer[idx + 1] * factor);
      frameBuffer[idx + 2] = Math.round(frameBuffer[idx + 2] * factor);
    }
  }

  // Write header and pixel buffer to ffmpeg
  ffmpeg.stdin.write(ppmHeader);
  ffmpeg.stdin.write(frameBuffer);

  if (frame % 90 === 0) {
    console.log(`Rendered frame ${frame}/${TOTAL_FRAMES} (${Math.round((frame / TOTAL_FRAMES) * 100)}%)`);
  }
}

ffmpeg.stdin.end();
