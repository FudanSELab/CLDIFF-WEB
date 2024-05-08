(() => {
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

  // src/definitions.ts
  var TAG_CANVAS = "canvas";
  var ATTRIBUTE_CROSS_ORIGIN = "crossorigin";
  var VALUE_ANONYMOUS = "anonymous";
  var TWO_D = "2d";
  var EVENT_LOAD = "load";
  var GLOBAL_COMPOSITE_MULTIPLY = "multiply";
  var GLOBAL_COMPOSITE_SOURCE_IN = "source-in";
  var GLOBAL_COMPOSITE_DESTINATION_IN = "destination-in";
  var AXIS_X = "x";
  var AXIS_Y = "y";
  var AXIS_X_AND_Y = "x_y";

  // src/canvas-util.ts
  function canvasToImage(canvas, type, quality) {
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
  function setCanvasImageFromURL(canvas, url, width, height) {
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
  function setCanvasImageFromImage(canvas, width, height, img, bgFill) {
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
  function drawScaledImage(canvas, img) {
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
  function createCanvas(img) {
    const w = img ? img.naturalWidth : 600, h = img ? img.naturalHeight : 600, fg = document.createElement(TAG_CANVAS);
    fg.width = w;
    fg.height = h;
    return fg;
  }

  // src/filter.ts
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
  var filterInvert = _simpleFilter.bind(null, "invert", "%", 100);
  var filterSepia = _simpleFilter.bind(null, "sepia", "%", 100);
  var filterGrayScale = _simpleFilter.bind(null, "grayscale", "%", 100);
  var filterSaturate = _simpleFilter.bind(null, "saturate", "%", 50);
  var filterOpacity = _simpleFilter.bind(null, "opacity", "%", 50);
  var filterBlur = _simpleFilter.bind(null, "blur", "px", 10);
  var filterHueRotate = _simpleFilter.bind(null, "hue-rotate", "deg", 90);
  var filterContrast = _simpleFilter.bind(null, "contrast", "%", 200);
  var filterBrightness = _simpleFilter.bind(null, "brightness", "%", 200);
  function filterTint(image, color) {
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

  // src/io.ts
  function readImageFromFile(file) {
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
  function imageToDataURL(img) {
    const canvas = document.createElement(TAG_CANVAS);
    canvas.width = img.width;
    canvas.height = img.height;
    img.setAttribute(ATTRIBUTE_CROSS_ORIGIN, VALUE_ANONYMOUS);
    canvas.getContext(TWO_D).drawImage(img, 0, 0);
    return canvas.toDataURL();
  }
  function imageURIToDataURL(URI) {
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
  function imageURLToImage(URI) {
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

  // src/transform.ts
  function mirrorImage(img, axis) {
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
  function imageThreshold(image, threshold, value = 255) {
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
  function cropImage(image, x, y, w, h) {
    return __async(this, null, function* () {
      const c1 = document.createElement(TAG_CANVAS);
      c1.width = w;
      c1.height = h;
      const ctx1 = c1.getContext("2d");
      ctx1.drawImage(image, x, y, w, h, 0, 0, w, h);
      return canvasToImage(c1);
    });
  }
  function overlayImage(image1, image2, x, y) {
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
  function clipImage(image, mask) {
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
  function blendImages(image1, image2, blendMode) {
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
  function resizeImage(image, width, height) {
    return __async(this, null, function* () {
      const c1 = document.createElement(TAG_CANVAS);
      setCanvasImageFromImage(c1, width, height, image);
      return canvasToImage(c1);
    });
  }
})();
