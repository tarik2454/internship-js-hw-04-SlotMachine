/**
 * Generates simple WAV sound effects for the slot machine game.
 * Run: node scripts/generate-sounds.mjs
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "sounds");

function createWavBuffer(sampleRate, durationSec, generator) {
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.max(-1, Math.min(1, generator(t, durationSec)));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  return buffer;
}

function spin(t, dur) {
  const freq = 200 + 600 * (t / dur);
  const env = Math.min(t * 10, 1) * Math.max(0, 1 - t / dur);
  return Math.sin(2 * Math.PI * freq * t) * env * 0.4 +
    Math.sin(2 * Math.PI * freq * 1.5 * t) * env * 0.15;
}

function reelStop(t) {
  const thud = Math.sin(2 * Math.PI * 150 * t) * Math.exp(-t * 40);
  const click = Math.sin(2 * Math.PI * 2000 * t) * Math.exp(-t * 120);
  return thud * 0.5 + click * 0.3;
}

function win(t, dur) {
  const noteIdx = Math.floor(t * 8) % 4;
  const notes = [523.25, 659.25, 783.99, 1046.50];
  const freq = notes[noteIdx];
  const localT = (t * 8) % 1;
  const env = Math.min(localT * 20, 1) * Math.max(0, 1 - localT * 1.2);
  const masterEnv = Math.min(t * 5, 1) * Math.max(0, 1 - (t / dur) * 0.3);
  return (Math.sin(2 * Math.PI * freq * t) * 0.4 +
    Math.sin(2 * Math.PI * freq * 2 * t) * 0.15) * env * masterEnv;
}

function jackpot(t, dur) {
  const noteIdx = Math.floor(t * 6) % 8;
  const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51, 1567.98];
  const freq = notes[noteIdx];
  const localT = (t * 6) % 1;
  const env = Math.min(localT * 20, 1) * Math.max(0, 1 - localT * 1.1);
  const masterEnv = Math.min(t * 3, 1) * Math.max(0, 1 - (t / dur) * 0.2);
  return (Math.sin(2 * Math.PI * freq * t) * 0.35 +
    Math.sin(2 * Math.PI * freq * 2 * t) * 0.2 +
    Math.sin(2 * Math.PI * freq * 3 * t) * 0.1) * env * masterEnv;
}

function lose(t, dur) {
  const freq = 400 - 250 * (t / dur);
  const env = Math.max(0, 1 - t / dur);
  return Math.sin(2 * Math.PI * freq * t) * env * 0.35;
}

function click(t) {
  const env = Math.exp(-t * 80);
  return (Math.sin(2 * Math.PI * 800 * t) * 0.3 +
    (Math.random() * 2 - 1) * 0.2) * env;
}

const rate = 44100;
const sounds = [
  { name: "spin", duration: 2.0, fn: spin },
  { name: "reel-stop", duration: 0.2, fn: reelStop },
  { name: "win", duration: 1.5, fn: win },
  { name: "jackpot", duration: 2.5, fn: jackpot },
  { name: "lose", duration: 1.0, fn: lose },
  { name: "click", duration: 0.06, fn: click },
];

for (const { name, duration, fn } of sounds) {
  const buf = createWavBuffer(rate, duration, fn);
  const path = join(outDir, `${name}.wav`);
  writeFileSync(path, buf);
  console.log(`Generated: ${path}`);
}

console.log("\nAll sounds generated successfully!");
