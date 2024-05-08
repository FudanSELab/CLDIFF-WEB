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
import {
  AXIS_X,
  AXIS_Y,
  GLOBAL_COMPOSITE_MULTIPLY,
  GLOBAL_COMPOSITE_SOURCE_IN,
  TAG_CANVAS
} from "./definitions";
import { canvasToImage, setCanvasImageFromImage } from "./canvas-util";
export function mirrorImage(img, axis) {
  return __async(this, null, function* () {
    const outputImage = document.createElement(TAG_CANVAS);
    outputImage.width = img.naturalWidth;
    outputImage.height = img.naturalHeight;
    const ctx = outputImage.getContext("2d");
    const dx = axis === AXIS_Y ? 1 : -1, x = axis === AXIS_Y ? 0 : -outputImage.width;
    const dy = axis === AXIS_X ? 1 : -1, y = axis === AXIS_X ? 0 : -outputImage.height;
    ctx.scale(dx, dy);
    ctx.drawImage(img, x, y);
    return canvasToImage(outputImage);
  });
}
export function imageThreshold(image, threshold, value = 255) {
  return __async(this, null, function* () {
    const outputImage = document.createElement(TAG_CANVAS);
    const ctx1 = outputImage.getContext("2d");
    outputImage.width = image.naturalWidth;
    outputImage.height = image.naturalHeight;
    ctx1.drawImage(image, 0, 0);
    const data1 = ctx1.getImageData(0, 0, image.width, image.height);
    for (let i = 0; i < data1.data.length; i += 4) {
      const red = data1.data[i];
      const green = data1.data[i + 1];
      const blue = data1.data[i + 2];
      data1.data[i] = red >= threshold ? value : 0;
      data1.data[i + 1] = green >= threshold ? value : 0;
      data1.data[i + 2] = blue >= threshold ? value : 0;
    }
    ctx1.putImageData(data1, 0, 0);
    return canvasToImage(outputImage);
  });
}
export function cropImage(image, x, y, w, h) {
  return __async(this, null, function* () {
    const c1 = document.createElement(TAG_CANVAS);
    c1.width = w;
    c1.height = h;
    const ctx1 = c1.getContext("2d");
    ctx1.drawImage(image, x, y, w, h, 0, 0, w, h);
    return canvasToImage(c1);
  });
}
export function overlayImage(image1, image2, x, y) {
  return __async(this, null, function* () {
    const c1 = document.createElement(TAG_CANVAS);
    c1.width = image1.naturalWidth;
    c1.height = image1.naturalHeight;
    const ctx1 = c1.getContext("2d");
    ctx1.drawImage(image1, 0, 0, c1.width, c1.height);
    ctx1.drawImage(image2, x || 0, y || 0, image2.naturalWidth, image2.naturalHeight);
    return canvasToImage(c1);
  });
}
export function clipImage(image, mask) {
  return __async(this, null, function* () {
    const c1 = document.createElement(TAG_CANVAS);
    const ctx1 = c1.getContext("2d");
    c1.width = image.naturalWidth;
    c1.height = image.naturalHeight;
    ctx1.drawImage(mask, 0, 0);
    ctx1.globalCompositeOperation = GLOBAL_COMPOSITE_SOURCE_IN;
    ctx1.drawImage(image, 0, 0);
    return canvasToImage(c1);
  });
}
export function blendImages(image1, image2, blendMode) {
  return __async(this, null, function* () {
    const c1 = document.createElement(TAG_CANVAS);
    c1.width = image1.naturalWidth;
    c1.height = image1.naturalHeight;
    const ctx1 = c1.getContext("2d");
    ctx1.drawImage(image1, 0, 0, c1.width, c1.height);
    ctx1.globalCompositeOperation = blendMode || GLOBAL_COMPOSITE_MULTIPLY;
    ctx1.drawImage(image2, 0, 0, c1.width, c1.height);
    return canvasToImage(c1);
  });
}
export function resizeImage(image, width, height) {
  return __async(this, null, function* () {
    const c1 = document.createElement(TAG_CANVAS);
    setCanvasImageFromImage(c1, width, height, image);
    return canvasToImage(c1);
  });
}
