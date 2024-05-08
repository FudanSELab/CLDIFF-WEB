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
import { ATTRIBUTE_CROSS_ORIGIN, EVENT_LOAD, TAG_CANVAS, TWO_D, VALUE_ANONYMOUS } from "./definitions";
export function readImageFromFile(file) {
  return __async(this, null, function* () {
    const reader = new FileReader();
    const img = new Image();
    return new Promise(function(resolve, reject) {
      reader.onload = /* @__PURE__ */ function(aImg) {
        return function(e) {
          aImg.onload = function() {
            resolve(aImg);
          };
          aImg.src = e.target.result;
        };
      }(img);
      reader.readAsDataURL(file);
    });
  });
}
export function imageToDataURL(img) {
  const canvas = document.createElement(TAG_CANVAS);
  canvas.width = img.width;
  canvas.height = img.height;
  img.setAttribute(ATTRIBUTE_CROSS_ORIGIN, VALUE_ANONYMOUS);
  canvas.getContext(TWO_D).drawImage(img, 0, 0);
  return canvas.toDataURL();
}
export function imageURIToDataURL(URI) {
  return __async(this, null, function* () {
    return new Promise(function(resolve, reject) {
      if (URI == null) {
        return reject();
      }
      const canvas = document.createElement(TAG_CANVAS), context = canvas.getContext(TWO_D), image = new Image();
      image.setAttribute(ATTRIBUTE_CROSS_ORIGIN, VALUE_ANONYMOUS);
      image.addEventListener(EVENT_LOAD, function() {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL());
      }, false);
      image.src = URI;
    });
  });
}
export function imageURLToImage(URI) {
  return __async(this, null, function* () {
    return new Promise(function(resolve, reject) {
      if (URI == null) {
        reject();
      } else {
        const image = new Image();
        image.setAttribute(ATTRIBUTE_CROSS_ORIGIN, VALUE_ANONYMOUS);
        image.addEventListener("load", function() {
          resolve(image);
        }, false);
        image.src = URI;
      }
    });
  });
}
