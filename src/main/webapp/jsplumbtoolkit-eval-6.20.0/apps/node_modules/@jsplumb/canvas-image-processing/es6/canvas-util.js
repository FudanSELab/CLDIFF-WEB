var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { TAG_CANVAS, TWO_D } from "./definitions";
export function canvasToImage(canvas, type, quality) {
  return __async(this, null, function* () {
    return new Promise(function(resolve, reject) {
      const d = canvas.toDataURL(type, quality);
      const oo = new Image();
      oo.onload = function() {
        resolve(oo);
      };
      oo.src = d;
    });
  });
}
export function setCanvasImageFromURL(canvas, url, width, height) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
      const ctx = canvas.getContext(TWO_D);
      ctx.save();
      if (width != null && height != null) {
        canvas.width = width;
        canvas.height = height;
        setCanvasImageFromImage(canvas, width, height, img);
      } else {
        ctx.drawImage(img, 0, 0);
      }
      ctx.restore();
      resolve(true);
    };
    img.src = url;
  });
}
export function setCanvasImageFromImage(canvas, width, height, img, bgFill) {
  let success = false;
  const ctx = canvas.getContext("2d");
  ctx.save();
  if (img != null) {
    ctx.fillStyle = bgFill || "white";
    ctx.fillRect(0, 0, width, height);
    const scaleX = width / img.width;
    const scaleY = height / img.height;
    const minScale = Math.min(scaleX, scaleY);
    ctx.scale(minScale, minScale);
    const y = (height - minScale * img.height) / 2;
    const x = (width - minScale * img.width) / 2;
    ctx.drawImage(img, x / minScale, y / minScale);
    success = true;
  }
  ctx.restore();
  return success;
}
export function drawScaledImage(canvas, img) {
  const ctx = canvas.getContext("2d");
  const scaleX = canvas.width / img.width;
  const scaleY = canvas.height / img.height;
  const minScale = Math.min(scaleX, scaleY);
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.scale(minScale, minScale);
  const y = (canvas.height - minScale * img.height) / 2;
  const x = (canvas.width - minScale * img.width) / 2;
  ctx.drawImage(img, x / minScale, y / minScale);
  ctx.restore();
}
export function createCanvas(img) {
  const w = img ? img.naturalWidth : 600, h = img ? img.naturalHeight : 600, fg = document.createElement(TAG_CANVAS);
  fg.width = w;
  fg.height = h;
  return fg;
}
