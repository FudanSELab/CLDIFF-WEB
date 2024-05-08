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
import { canvasToImage, createCanvas } from "./canvas-util";
import { GLOBAL_COMPOSITE_DESTINATION_IN, GLOBAL_COMPOSITE_MULTIPLY, TAG_CANVAS, TWO_D } from "./definitions";
function _simpleFilter(filter, qualifier, defaultValue, image, amount) {
  amount = amount || defaultValue;
  const c1 = document.createElement(TAG_CANVAS);
  c1.width = image.naturalWidth;
  c1.height = image.naturalHeight;
  const ctx1 = c1.getContext("2d");
  ctx1.filter = `${filter}(${amount}${qualifier})`;
  ctx1.drawImage(image, 0, 0, c1.width, c1.height);
  return canvasToImage(c1);
}
export const filterInvert = _simpleFilter.bind(null, "invert", "%", 100);
export const filterSepia = _simpleFilter.bind(null, "sepia", "%", 100);
export const filterGrayScale = _simpleFilter.bind(null, "grayscale", "%", 100);
export const filterSaturate = _simpleFilter.bind(null, "saturate", "%", 50);
export const filterOpacity = _simpleFilter.bind(null, "opacity", "%", 50);
export const filterBlur = _simpleFilter.bind(null, "blur", "px", 10);
export const filterHueRotate = _simpleFilter.bind(null, "hue-rotate", "deg", 90);
export const filterContrast = _simpleFilter.bind(null, "contrast", "%", 200);
export const filterBrightness = _simpleFilter.bind(null, "brightness", "%", 200);
export function filterTint(image, color) {
  return __async(this, null, function* () {
    const fg = createCanvas(image);
    const fgx = fg.getContext(TWO_D);
    fgx.drawImage(image, 0, 0);
    fgx.fillStyle = color;
    fgx.globalCompositeOperation = GLOBAL_COMPOSITE_MULTIPLY;
    fgx.fillRect(0, 0, fg.width, fg.height);
    fgx.globalAlpha = 0.5;
    fgx.globalCompositeOperation = GLOBAL_COMPOSITE_DESTINATION_IN;
    fgx.drawImage(image, 0, 0);
    return canvasToImage(fg);
  });
}
