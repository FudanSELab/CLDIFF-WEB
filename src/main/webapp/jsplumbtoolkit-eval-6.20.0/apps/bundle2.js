var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("model/filters", ["require", "exports", "@jsplumb/canvas-image-processing"], function (require, exports, canvas_image_processing_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FILTER_INSPECTORS = void 0;
    const filters = {
        set: "filter",
        name: "Filter",
        types: [
            {
                id: "greyscale",
                name: "Greyscale",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 100 }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterGrayScale)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "blur",
                name: "Blur",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "radius", label: "Radius", type: "number", defaultValue: 10 }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        const c = data["in:radius"] || data["radius"];
                        data["out:image"] = await (0, canvas_image_processing_1.filterBlur)(data["in:image"], c);
                        return true;
                    }
                }
            },
            {
                id: "invert",
                name: "Invert",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 100 }
                ],
                outputs: [{ id: "image", label: "Image", type: "image" }],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterInvert)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "sepia",
                name: "Sepia",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 100 }
                ],
                outputs: [{ id: "image", label: "Image", type: "image" }],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterSepia)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "saturate",
                name: "Saturate",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 100 }
                ],
                outputs: [{ id: "image", label: "Image", type: "image" }],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterSaturate)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "opacity",
                name: "Opacity",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 50 }
                ],
                outputs: [{ id: "image", label: "Image", type: "image" }],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterOpacity)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "contrast",
                name: "Contrast",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 200 }
                ],
                outputs: [{ id: "image", label: "Image", type: "image" }],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterContrast)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "brightness",
                name: "Brightness",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 200 }
                ],
                outputs: [{ id: "image", label: "Image", type: "image" }],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterBrightness)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "hue-rotate",
                name: "Hue rotate",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "amount", label: "Amount", type: "number", defaultValue: 90 }
                ],
                outputs: [{ id: "image", label: "Image", type: "image" }],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_1.filterHueRotate)(data["in:image"], data["in:amount"] || data["amount"]);
                        return true;
                    }
                }
            },
            {
                id: "tint",
                name: "Tint",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "color", label: "Color", type: "color", defaultValue: "#F47710" }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        const c = data["in:color"] || data["color"];
                        data["out:image"] = await (0, canvas_image_processing_1.filterTint)(data["in:image"], c);
                        return true;
                    }
                }
            }
        ]
    };
    exports.FILTER_INSPECTORS = {};
    filters.types.forEach(type => {
        const dataField = type.inputs[1], inputType = dataField.type === "color" ? "color" : "text";
        exports.FILTER_INSPECTORS[type.id] = {
            template: (n) => `<label>Label:<input type="text" jtk-att="label"  placeholder="enter label" jtk-focus/></label>
            <label>${dataField.label}:<input type="${inputType}" jtk-att="${dataField.id}" placeholder="enter ${dataField.id}"/></label>`
        };
    });
    exports.default = filters;
});
define("definitions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CANVAS_SIZE = exports.ATTRIBUTE_LABEL = exports.ATTRIBUTE_HEIGHT = exports.ATTRIBUTE_WIDTH = exports.TYPE_SOURCE = exports.TYPE_DISPLAY = void 0;
    exports.TYPE_DISPLAY = "display";
    exports.TYPE_SOURCE = "source";
    exports.ATTRIBUTE_WIDTH = "width";
    exports.ATTRIBUTE_HEIGHT = "height";
    exports.ATTRIBUTE_LABEL = "label";
    exports.CANVAS_SIZE = { w: 200, h: 200 };
});
define("model/transforms", ["require", "exports", "@jsplumb/canvas-image-processing", "definitions"], function (require, exports, canvas_image_processing_2, definitions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TRANSFORM_INSPECTORS = exports.TRANSFORM_THRESHOLD = exports.TRANSFORM_OVERLAY = exports.TRANSFORM_RESIZE = exports.TRANSFORM_CROP = exports.TRANSFORM_CLIP = exports.TRANSFORM_BLEND = exports.TRANSFORM_MIRROR = void 0;
    const COMPOSITE_OPERATIONS = ["color",
        "color-burn", "color-dodge", "darken", "destination-atop",
        "destination-in", "destination-out", "destination-over",
        "difference",
        "exclusion", "hard-light", "hue", "lighten", "lighter", "luminosity",
        "multiply", "overlay", "saturation", "screen", "soft-light", "source-atop",
        "source-in", "source-out", "source-over", "xor"];
    exports.TRANSFORM_MIRROR = "mirror";
    exports.TRANSFORM_BLEND = "blend";
    exports.TRANSFORM_CLIP = "clip";
    exports.TRANSFORM_CROP = "crop";
    exports.TRANSFORM_RESIZE = "resize";
    exports.TRANSFORM_OVERLAY = "overlay";
    exports.TRANSFORM_THRESHOLD = "threshold";
    exports.default = {
        set: "transform",
        name: "Transform",
        types: [
            {
                id: exports.TRANSFORM_MIRROR,
                name: "Mirror",
                inputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_2.mirrorImage)(data["in:image"], data["axis"] || canvas_image_processing_2.AXIS_X);
                        return true;
                    }
                }
            },
            {
                id: exports.TRANSFORM_BLEND,
                name: "Blend",
                inputs: [
                    { id: "image1", label: "Image", type: "image" },
                    { id: "image2", label: "Image", type: "image" }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image1"] == null || data["in:image2"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_2.blendImages)(data["in:image1"], data["in:image2"], data["operation"]);
                        return true;
                    }
                }
            },
            {
                id: exports.TRANSFORM_CLIP,
                name: "Clip",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "mask", label: "Mask", type: "image" }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null || data["in:mask"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        data["out:image"] = await (0, canvas_image_processing_2.clipImage)(data["in:image"], data["in:mask"]);
                        return true;
                    }
                }
            },
            {
                id: exports.TRANSFORM_RESIZE,
                name: "Resize",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: definitions_1.ATTRIBUTE_WIDTH, label: "Width", type: "number", defaultValue: 150 },
                    { id: "height", label: "Height", type: "number", defaultValue: 150 }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        const w = data["in:width"] || data.width;
                        const h = data["in:height"] || data.height;
                        // convert the image
                        data["out:image"] = await (0, canvas_image_processing_2.resizeImage)(data["in:image"], w, h);
                        return true;
                    }
                }
            },
            {
                id: exports.TRANSFORM_CROP,
                name: "Crop",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "width", label: "Width", type: "number", defaultValue: 150 },
                    { id: "height", label: "Height", type: "number", defaultValue: 150 },
                    { id: "x", label: "X", type: "number", defaultValue: 0 },
                    { id: "y", label: "Y", type: "number", defaultValue: 0 }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        const w = data["in:width"] || data.width;
                        const h = data["in:height"] || data.height;
                        const x = data["in:x"] || data.x;
                        const y = data["in:y"] || data.y;
                        // convert the image
                        debugger;
                        data["out:image"] = await (0, canvas_image_processing_2.cropImage)(data["in:image"], x, y, w, h);
                        return true;
                    }
                }
            },
            {
                id: exports.TRANSFORM_OVERLAY,
                name: "Overlay",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "overlay", label: "Overlay", type: "image" },
                    { id: "x", label: "X", type: "number", defaultValue: 0 },
                    { id: "y", label: "Y", type: "number", defaultValue: 0 }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null || data["in:overlay"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        const x = data["in:x"] || data.x;
                        const y = data["in:y"] || data.y;
                        data["out:image"] = await (0, canvas_image_processing_2.overlayImage)(data["in:image"], data["in:overlay"], x, y);
                        return true;
                    }
                }
            },
            {
                id: exports.TRANSFORM_THRESHOLD,
                name: "Threshold",
                inputs: [
                    { id: "image", label: "Image", type: "image" },
                    { id: "threshold", label: "Threshold", type: "number", defaultValue: 127 },
                    { id: "value", label: "Value", type: "number", defaultValue: 255 }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        data["out:image"] = null;
                        return false;
                    }
                    else {
                        const threshold = data["in:threshold"] || data.threshold;
                        const value = data["in:value"] || data.value;
                        // convert the image
                        data["out:image"] = await (0, canvas_image_processing_2.imageThreshold)(data["in:image"], threshold, value);
                        return true;
                    }
                }
            }
        ]
    };
    exports.TRANSFORM_INSPECTORS = {
        [exports.TRANSFORM_MIRROR]: {
            template: (n) => `<label>Label:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_LABEL}" jtk-focus placeholder="enter label"/></label>
            <label>Axis:<select jtk-att="axis"><option value="x">X</option><option value="y">Y</option><option value="x_y">X and Y</option></select></label>`
        },
        [exports.TRANSFORM_BLEND]: {
            template: (n) => `<label>Label:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_LABEL}" jtk-focus placeholder="enter label"/></label>
            <label>Mode:<select jtk-att="operation">${COMPOSITE_OPERATIONS.map(c => "<option value=\"" + c + "\">" + c + "</option>").join("")}</select></label>`
        },
        [exports.TRANSFORM_CLIP]: {
            template: (n) => `<label>Label:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_LABEL}" jtk-focus placeholder="enter label"/></label>`
        },
        [exports.TRANSFORM_RESIZE]: {
            template: (n) => `<label>Label:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_LABEL}" placeholder="enter label"/></label>
            <label>Width:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_WIDTH}" jtk-focus/></label>
            <label>Height:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_HEIGHT}"/></label>`
        },
        [exports.TRANSFORM_CROP]: {
            template: (n) => `<label>Label:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_LABEL}" placeholder="enter label"/></label>
            <label>X:<input type="text" jtk-att="x" jtk-focus/></label>
            <label>Y:<input type="text" jtk-att="y"/></label>
            <label>Width:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_WIDTH}"/></label>
            <label>Height:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_HEIGHT}"/></label>`
        },
        [exports.TRANSFORM_OVERLAY]: {
            template: (n) => `<label>Label:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_LABEL}" placeholder="enter label"/></label>
            <label>X:<input type="text" jtk-att="x" jtk-focus/></label>
            <label>Y:<input type="text" jtk-att="y"/></label>`
        },
        [exports.TRANSFORM_THRESHOLD]: {
            template: (n) => `<label>Label:<input type="text" jtk-att="${definitions_1.ATTRIBUTE_LABEL}" placeholder="enter label"/></label>
            <label>Threshold:<input type="text" jtk-att="threshold" jtk-focus/></label>
            <label>Value:<input type="text" jtk-att="value"/></label>`
        }
    };
});
define("model/math", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function doMath(data, fn) {
        if (data["in:a"] == null || data["in:b"] == null) {
            data["out:result"] = null;
            return false;
        }
        else {
            try {
                data["out:result"] = fn(parseFloat(data["in:a"]), parseFloat(data["in:b"]));
                return true;
            }
            catch (e) {
                data["out:result"] = null;
                return false;
            }
        }
    }
    exports.default = {
        set: "math",
        name: "Math",
        types: [
            {
                id: "add",
                name: "Add",
                inputs: [
                    { id: "a", label: "A", type: "number" },
                    { id: "b", label: "B", type: "number" },
                ],
                outputs: [
                    { id: "result", label: "Result", type: "number" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    return doMath(data, (a, b) => a + b);
                }
            },
            {
                id: "subtract",
                name: "Subtract",
                inputs: [
                    { id: "a", label: "A", type: "number" },
                    { id: "b", label: "B", type: "number" },
                ],
                outputs: [
                    { id: "result", label: "Result", type: "number" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    return doMath(data, (a, b) => a - b);
                }
            },
            {
                id: "multiply",
                name: "Multiply",
                inputs: [
                    { id: "a", label: "A", type: "number" },
                    { id: "b", label: "B", type: "number" },
                ],
                outputs: [
                    { id: "result", label: "Result", type: "number" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    return doMath(data, (a, b) => a * b);
                }
            },
            {
                id: "divide",
                name: "Divide",
                inputs: [
                    { id: "a", label: "A", type: "number" },
                    { id: "b", label: "B", type: "number" },
                ],
                outputs: [
                    { id: "result", label: "Result", type: "number" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    return doMath(data, (a, b) => a / b);
                }
            }
        ]
    };
});
define("model/inputs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.INPUT_INSPECTORS = exports.INPUT_TYPES = void 0;
    async function verifyValue(node) {
        if (node.data.value == null) {
            node.data["out:value"] = null;
            return false;
        }
        else {
            node.data["out:value"] = node.data.value;
            return true;
        }
    }
    exports.INPUT_TYPES = {
        set: "input",
        name: "Input",
        types: [
            {
                id: "text",
                name: "Text",
                inputs: [],
                outputs: [
                    { id: "value", label: "Text", type: "string" }
                ],
                compute: verifyValue
            },
            {
                id: "boolean",
                name: "Boolean",
                inputs: [],
                outputs: [
                    { id: "value", label: "Boolean", type: "boolean" }
                ],
                compute: verifyValue
            },
            {
                id: "color",
                name: "Color",
                inputs: [],
                outputs: [
                    { id: "value", label: "Color", type: "color" }
                ],
                compute: verifyValue
            },
            {
                id: "number",
                name: "Number",
                inputs: [],
                outputs: [
                    { id: "value", label: "Number", type: "number" }
                ],
                compute: verifyValue
            }
        ]
    };
    exports.INPUT_INSPECTORS = {
        "text": {
            template: (n) => `
            <label>Label:<input type="text" jtk-att="label"  placeholder="enter label"/></label>
            <label>Text:<input type="text" jtk-att="value" placeholder="enter text value" jtk-focus/></label>
`
        },
        "boolean": {
            template: (n) => `<label>Label:<input type="text" jtk-att="label"  placeholder="enter label"/></label>
            <label>Value:<input type="checkbox" jtk-att="value" /></label>`
        },
        "color": {
            template: (n) => `<label>Label:<input type="text" jtk-att="label"  placeholder="enter label"/></label>
            <label>Color:<input type="color" jtk-att="value" /></label>`
        },
        "number": {
            template: (n) => `<label>Label:<input type="text" jtk-att="label"  placeholder="enter label"/></label>
            <label>Number:<input type="text" jtk-att="value"  jtk-focus/></label>`
        }
    };
});
define("model/basic", ["require", "exports", "@jsplumb/canvas-image-processing"], function (require, exports, canvas_image_processing_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BASIC_INSPECTORS = void 0;
    exports.default = {
        set: "basic",
        name: "Basic",
        types: [
            {
                id: "source",
                name: "Source",
                inputs: [
                    { id: "url", label: "Url", type: "string" }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    let inputUrl = data["in:url"];
                    if (inputUrl == null) {
                        let image = data["image"];
                        if (image == null) {
                            data["out:image"] = null;
                            data.width = null;
                            data.height = null;
                            return false;
                        }
                        else {
                            data["out:image"] = image;
                            data.width = image.naturalWidth;
                            data.height = image.naturalHeight;
                            return true;
                        }
                    }
                    else {
                        const img = await (0, canvas_image_processing_3.imageURLToImage)(inputUrl);
                        data["out:image"] = img;
                        data.width = img.naturalWidth;
                        data.height = img.naturalHeight;
                        return true;
                    }
                }
            },
            {
                id: "display",
                name: "Display",
                inputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                outputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    data["out:image"] = data["in:image"];
                    return data["in:image"] != null;
                }
            },
            {
                id: "properties",
                name: "Properties",
                inputs: [
                    { id: "image", label: "Image", type: "image" }
                ],
                outputs: [
                    { id: "width", label: "Width", type: "number" },
                    { id: "height", label: "Height", type: "number" }
                ],
                compute: async function (node) {
                    const data = node.data;
                    if (data["in:image"] == null) {
                        return false;
                    }
                    else {
                        data["out:width"] = data["in:image"].naturalWidth;
                        data["out:height"] = data["in:image"].naturalHeight;
                        return true;
                    }
                }
            }
        ]
    };
    exports.BASIC_INSPECTORS = {
        "source": {
            template: (n) => `<label>Label:<input type="text" jtk-att="label"  placeholder="enter label"/></label>`
        },
        "display": {
            template: (n) => `<label>Label:<input type="text" jtk-att="label"  placeholder="enter label"/></label>`
        },
        "properties": {
            template: (n) => `<label>Label:<input type="text" jtk-att="label"  placeholder="enter label"/></label>`
        }
    };
});
define("generate-templates", ["require", "exports", "@jsplumbtoolkit/browser-ui", "model/filters", "model/transforms", "model/math", "model/inputs", "model/basic", "definitions"], function (require, exports, browser_ui_1, filters_1, transforms_1, math_1, inputs_1, basic_1, definitions_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initialize = void 0;
    filters_1 = __importDefault(filters_1);
    transforms_1 = __importDefault(transforms_1);
    math_1 = __importDefault(math_1);
    basic_1 = __importDefault(basic_1);
    /**
        This file contains the code that generates the templates for each node type. Most of the nodes are of the same form in this
     app, with the exception of the source/display nodes, which have a canvas and some other controls.
     */
    const header = `<div class="jtk-imp-$set-$type jtk-imp-$set">
            <div data-header data-$set-bg>{{label}}<div class="jtk-imp-delete-node"></div></div>
            <div class="jtk-imp-ports">`;
    function processSet(set, uiDefinitions, processors, nodeTypes, inject) {
        const setId = set.set;
        set.types.forEach(type => {
            const key = `${set.set}.${type.id}`;
            nodeTypes[key] = type;
            const h = header.replace(/\$type/g, type.id).replace(/\$set/g, setId);
            let inputPorts = `<div class="jtk-imp-inputs">`;
            type.inputs.forEach(tin => {
                inputPorts += `<div class="jtk-in">
                    <div class="jtk-imp-ep" data-jtk-target="true" data-jtk-port="in:${tin.id}" data-jtk-port-type="target" data-jtk-scope="${tin.type}"/>
                    <span>${tin.label}</span>
                    </div>`;
            });
            inputPorts += "</div>";
            let outputPorts = `<div class="jtk-imp-outputs">`;
            type.outputs.forEach(tin => {
                outputPorts += `<div class="jtk-out">
                    <div class="jtk-imp-ep" data-jtk-source="true" data-jtk-port="out:${tin.id}" data-jtk-port-type="source" data-jtk-scope="${tin.type}"/>
                    <span>${tin.label}</span>
                    </div>`;
            });
            outputPorts += "</div>";
            const injection = inject ? inject(set, type) : "";
            uiDefinitions[key] = {
                template: h + inputPorts + outputPorts + '</div>' + injection + "</div>",
                parent: browser_ui_1.DEFAULT
            };
            processors[key] = type.compute || (() => { return {}; });
        });
    }
    const downloadIcon = `<svg:svg width="24" height="24" viewBox="0 0 48 48">
    <svg:path d="M38 18h-8v-12h-12v12h-8l14 14 14-14zm-28 18v4h28v-4h-28z"/>
    <svg:path d="M0 0h48v48h-48z" fill="none"/>
</svg:svg>`;
    const uploadIcon = `<svg:svg viewBox="0 0 24 24" width="24" height="24">
    <svg:path d="M18.9,18.5H4.8c-0.6,0-1.1-0.5-1.1-1.1V8.5h5.6c3.1,0,6.3,0,9.4,0c0.1,0,0.5,0,0.9,0.4c0.2,0.2,0.4,0.5,0.4,0.9v7.6C20.1,18,19.6,18.5,18.9,18.5z" fill="none" stroke="black" stroke-miterlimit="10" stroke-width="1.5"/>
    <svg:path d="M12.9,8.5c-3.1,0-6.2,0.1-9.3,0.1v-3c0-0.6,0.5-1,1-1l4.4,0C10.3,5.9,11.6,7.2,12.9,8.5z" fill="none" stroke="black"  stroke-miterlimit="10" stroke-width="1.5"/>
</svg:svg>`;
    function initialize(toolkit) {
        const nodeTypes = {};
        const processors = {};
        const uiDefinitions = {
            [browser_ui_1.DEFAULT]: {
                events: {
                    [browser_ui_1.EVENT_TAP]: (p) => toolkit.setSelection(p.obj)
                }
            }
        };
        processSet(transforms_1.default, uiDefinitions, processors, nodeTypes);
        processSet(filters_1.default, uiDefinitions, processors, nodeTypes);
        processSet(inputs_1.INPUT_TYPES, uiDefinitions, processors, nodeTypes);
        processSet(math_1.default, uiDefinitions, processors, nodeTypes);
        // Source and display nodes have a canvas and image dimensions, and the display node has a download button.
        processSet(basic_1.default, uiDefinitions, processors, nodeTypes, (set, type) => {
            if (type.id === definitions_2.TYPE_SOURCE || type.id === definitions_2.TYPE_DISPLAY) {
                const extraButtons = type.id === definitions_2.TYPE_DISPLAY ? `<a class="jtk-imp-download" title="Download image">${downloadIcon}</a>` : `<a class="jtk-imp-upload" title="Upload image">${uploadIcon}</a>`;
                return `<canvas width="${definitions_2.CANVAS_SIZE.w}" height="${definitions_2.CANVAS_SIZE.h}"/><div data-width="{{width}}" data-height="{{height}}" class="jtk-imp-dim">{{width}}x{{height}}</div>${extraButtons}`;
            }
            else {
                return "";
            }
        });
        return { uiDefinitions, processors, nodeTypes };
    }
    exports.initialize = initialize;
});
define("process", ["require", "exports", "@jsplumbtoolkit/browser-ui"], function (require, exports, browser_ui_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Processor = void 0;
    /**
     * This is the processor for the image pipeline. It listens to various events on the Toolkit and either runs the whole
     * pipeline or just some node and its descendants, as necessary.
     */
    class Processor {
        toolkit;
        model;
        onComplete;
        onError;
        _loading = false;
        constructor(toolkit, model, onComplete, onError) {
            this.toolkit = toolkit;
            this.model = model;
            this.onComplete = onComplete;
            this.onError = onError;
            // set loading flag at load start so we dont run until loading is finished
            this.toolkit.bind(browser_ui_2.EVENT_DATA_LOAD_START, () => this._loading = true);
            // at load end, run the processor, with `force` - assume all vertices dirty.
            this.toolkit.bind(browser_ui_2.EVENT_DATA_LOAD_END, () => {
                this._loading = false;
                // and run the processor
                this.run(true);
            });
            /**
             * When a new node gets added (outside of a load), mark the node dirty. The next time the processor is run and this new node
             * has any connections, it will be executed.
             */
            this.toolkit.bind(browser_ui_2.EVENT_NODE_ADDED, (p) => {
                this._markDirty(p.node);
            });
            /**
             * For all updates except left/top updates (coming from a drag), run the processor on change.
             */
            this.toolkit.bind(browser_ui_2.EVENT_NODE_UPDATED, (p) => {
                // ignore node positioning updates
                if (!p.updates.left) {
                    this._markDirty(p.vertex);
                }
            });
            /**
             * When an edge is added, find the target of the edge, set its value from the source, and mark it for processing. Then run the processor.
             */
            this.toolkit.bind(browser_ui_2.EVENT_EDGE_ADDED, (p) => {
                const edge = p.edge;
                edge.target.getParent().data[edge.target.id] = edge.source.getParent().data[edge.source.id];
                edge.target.getParent().dirty = true;
                this.run();
            });
            /**
             * When an edge is removed, find the target of the edge and remove the value that the previous edge was supplying, then mark the target node
             * for processing and run the processor.
             */
            this.toolkit.bind(browser_ui_2.EVENT_EDGE_REMOVED, (p) => {
                const edge = p.edge;
                edge.target.getParent().data[edge.target.id] = null;
                edge.target.getParent().dirty = true;
                this.run();
            });
        }
        /**
         * Run the processor, and invoke the onComplete handler afterwards.
         * @param force
         */
        async run(force) {
            try {
                this.execute(force).then(this.onComplete);
            }
            catch (e) {
                this.onError(e);
            }
        }
        /**
         * For a given node, mark everything downstream for processing.
         * @param obj
         * @param touched
         * @private
         */
        _clearDownstream(obj, touched = {}) {
            if (!touched[obj.id]) {
                touched[obj.id] = true;
                obj.dirty = true;
                const outputs = obj.getPorts().filter(p => p.data.output === true);
                outputs.forEach(output => {
                    output.edges.forEach(edge => {
                        edge.target.getParent().data[edge.target.id] = null;
                        edge.target.getParent().dirty = true;
                        this._clearDownstream(edge.target.getParent(), touched);
                    });
                });
            }
        }
        /**
         * Mark a node for processing: clear everything downstream, compute the node, and if a value was returned, propagate to children.
         * @param obj
         * @private
         */
        async _markDirty(obj) {
            this._clearDownstream(obj);
            const modelObject = this.model.nodeTypes[obj.type];
            const result = await modelObject.compute(obj);
            if (result) {
                obj.dirty = false;
                const outputs = obj.getPorts().filter(p => p.data.output === true);
                outputs.forEach(output => {
                    output.edges.forEach(edge => {
                        edge.target.getParent().data[edge.target.id] = edge.source.getParent().data[edge.source.id];
                        edge.target.getParent().dirty = true;
                    });
                });
            }
            this.run();
        }
        /**
         * Run the processor.
         * @param force
         */
        async execute(force) {
            return new Promise((resolve, reject) => {
                const queue = [];
                const unprocessed = this.toolkit.getNodes().slice();
                const processed = {};
                if (force) {
                    unprocessed.forEach(up => up.dirty = true);
                }
                const _onePass = async () => {
                    let cleanRun = true;
                    if (unprocessed.length === 0) {
                        resolve(true);
                    }
                    else {
                        queue.length = 0;
                        queue.push(...unprocessed);
                        unprocessed.length = 0;
                        for (let i = 0; i < queue.length; i++) {
                            const candidate = queue[i];
                            const modelObject = this.model.nodeTypes[candidate.type];
                            if (candidate.dirty) {
                                const result = await modelObject.compute(candidate);
                                const outputs = candidate.getPorts().filter(p => p.data.output === true);
                                if (result) {
                                    processed[candidate.id] = candidate;
                                    cleanRun = false;
                                    candidate.dirty = false;
                                    outputs.forEach(output => {
                                        output.edges.forEach(edge => {
                                            edge.target.getParent().data[edge.target.id] = edge.source.getParent().data[edge.source.id];
                                            edge.target.getParent().dirty = true;
                                        });
                                    });
                                }
                                else {
                                    unprocessed.push(candidate);
                                    this._clearDownstream(candidate);
                                }
                            }
                        }
                    }
                    if (cleanRun) {
                        resolve(true);
                    }
                    else {
                        await _onePass();
                    }
                };
                _onePass();
            });
        }
    }
    exports.Processor = Processor;
});
define("palette", ["require", "exports", "@jsplumbtoolkit/browser-ui", "model/filters", "model/transforms", "model/math", "model/inputs", "model/basic"], function (require, exports, browser_ui_3, filters_2, transforms_2, math_2, inputs_2, basic_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Palette = void 0;
    filters_2 = __importDefault(filters_2);
    transforms_2 = __importDefault(transforms_2);
    math_2 = __importDefault(math_2);
    basic_2 = __importDefault(basic_2);
    const paletteSectionTemplate = `<div class="palette-section">
                <div class="palette-header" data-$set-bg>{{name}}</div>
                <div class="palette-section-entries">
                    <r-each in="types" key="id">
                        <div data-type="$set.{{id}}">{{name}}</div>
                    </r-each>
                </div>
            </div>`;
    function drawPalette(container) {
        const renderer = new browser_ui_3.BrowserUiRecado({
            templateResolver: (setId) => {
                return paletteSectionTemplate.replace(/\$set/g, setId);
            }
        });
        const b = renderer.template("basic", basic_2.default);
        container.appendChild(b);
        const f = renderer.template("filter", filters_2.default);
        container.appendChild(f);
        const t = renderer.template("transform", transforms_2.default);
        container.appendChild(t);
        const ip = renderer.template("input", inputs_2.INPUT_TYPES);
        container.appendChild(ip);
        const m = renderer.template("math", math_2.default);
        container.appendChild(m);
    }
    /**
     * Manages drag/drop of new nodes. This class draws out the palette from the lists of filters, transforms, inputs and math ops, using
     * a `BrowserUiRecado` instance, which is the Toolkit's default template renderer.
     */
    class Palette {
        constructor(surface, model) {
            const container = document.getElementById("palette");
            drawPalette(container);
            new browser_ui_3.SurfaceDropManager({
                surface,
                source: container,
                selector: "[data-type]",
                dataGenerator: (el) => {
                    // when the user begins a drag, generate an appropriate dataset from the model.
                    const type = el.getAttribute("data-type");
                    const modelObject = model.nodeTypes[type];
                    const out = {
                        type,
                        id: (0, browser_ui_3.uuid)(),
                        label: modelObject.name
                    };
                    modelObject.inputs.forEach(input => {
                        if (input.defaultValue != null) {
                            out[input.id] = input.defaultValue;
                        }
                    });
                    return out;
                },
                // when a new node has been dragged on, select it.
                onVertexAdded: (v) => surface.toolkitInstance.setSelection(v)
            });
        }
    }
    exports.Palette = Palette;
});
define("inspector", ["require", "exports", "@jsplumbtoolkit/browser-ui", "model/inputs", "model/filters", "model/transforms", "model/basic"], function (require, exports, browser_ui_4, inputs_3, filters_3, transforms_3, basic_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageInspector = void 0;
    const handlers = {
        input: inputs_3.INPUT_INSPECTORS,
        filter: filters_3.FILTER_INSPECTORS,
        transform: transforms_3.TRANSFORM_INSPECTORS,
        basic: basic_3.BASIC_INSPECTORS
    };
    class ImageInspector extends browser_ui_4.VanillaInspector {
        model;
        constructor(container, surface, model) {
            super({
                container,
                surface,
                templateResolver: (obj) => {
                    if ((0, browser_ui_4.isNode)(obj)) {
                        return this._renderNodeTemplate(obj);
                    }
                    return '';
                },
                cacheTemplates: false,
                renderEmptyContainer: () => `<h1>SELECT SOMETHING INNIT</h1>`,
                refresh: (obj, cb) => null
            });
            this.model = model;
        }
        _renderNodeTemplate(obj) {
            const [set, type] = obj.type.split(".");
            try {
                return handlers[set][type].template(obj);
            }
            catch (e) {
                return `<div/>`;
            }
        }
    }
    exports.ImageInspector = ImageInspector;
});
define("native-drop-handler", ["require", "exports", "@jsplumbtoolkit/browser-ui", "@jsplumb/canvas-image-processing"], function (require, exports, browser_ui_5, canvas_image_processing_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NativeImageDropHandler = exports.NativeDropHandler = void 0;
    const CLASS_HOVER_DEFAULT = "jtk-native-drop-hover";
    const EVENT_DRAG_ENTER = "dragenter";
    const EVENT_DRAG_LEAVE = "dragleave";
    const EVENT_DRAG_OVER = "dragover";
    const EVENT_DROP = "drop";
    class NativeDropHandler {
        hoverClasses;
        surface;
        eventManager;
        constructor(options) {
            this.eventManager = new browser_ui_5.EventManager();
            this.surface = options.surface;
            this.hoverClasses = [CLASS_HOVER_DEFAULT];
            if (options.hoverClass) {
                this.hoverClasses.push(options.hoverClass);
            }
            const element = options.element || this.surface.getContainer().parentElement;
            const _addClass = (e) => {
                (0, browser_ui_5.consume)(e);
                e.target.classList.add(...this.hoverClasses);
            };
            const enterOptions = [element, EVENT_DRAG_ENTER];
            if (options.selector) {
                enterOptions.push(options.selector);
            }
            enterOptions.push(_addClass);
            this.eventManager.on.apply(this.eventManager, enterOptions);
            const _removeClass = (e) => {
                (0, browser_ui_5.consume)(e);
                e.target.classList.remove(...this.hoverClasses);
            };
            const leaveOptions = [element, EVENT_DRAG_LEAVE];
            if (options.selector) {
                leaveOptions.push(options.selector);
            }
            leaveOptions.push(_removeClass);
            this.eventManager.on.apply(this.eventManager, leaveOptions);
            const _setDropEffect = (e) => {
                (0, browser_ui_5.consume)(e);
                e.dataTransfer.dropEffect = 'copy';
            };
            const copyOptions = [element, EVENT_DRAG_OVER];
            if (options.selector) {
                copyOptions.push(options.selector);
            }
            copyOptions.push(_setDropEffect);
            this.eventManager.on.apply(this.eventManager, copyOptions);
            const dropOptions = [element, EVENT_DROP];
            if (options.selector) {
                dropOptions.push(options.selector);
            }
            dropOptions.push((e) => {
                if (!e.cancelBubble && !e.defaultPrevented) {
                    (0, browser_ui_5.consume)(e);
                    e.target.classList.remove(...this.hoverClasses);
                    options.onDrop(e, e.target, this.surface.getObjectInfo(e.target));
                }
            });
            this.eventManager.on.apply(this.eventManager, dropOptions);
        }
    }
    exports.NativeDropHandler = NativeDropHandler;
    class NativeImageDropHandler {
        handler;
        eventManager;
        constructor(options) {
            this.handler = new NativeDropHandler({
                surface: options.surface,
                element: options.element,
                selector: options.selector,
                hoverClass: options.hoverClass,
                onDrop: (e, el, info) => {
                    const dt = e.dataTransfer;
                    const files = dt.files;
                    const url = e.dataTransfer.getData('text/plain');
                    if (url) {
                        const img = new Image();
                        img.onload = function () {
                            options.imageDropped(e, img, el, info);
                        };
                        img.src = url;
                    }
                    else {
                        if (files[0].type.match(/image.*/)) {
                            (0, canvas_image_processing_4.readImageFromFile)(files[0]).then((img) => {
                                options.imageDropped(e, img, el, info);
                            });
                        }
                    }
                }
            });
        }
    }
    exports.NativeImageDropHandler = NativeImageDropHandler;
});
define("app", ["require", "exports", "@jsplumbtoolkit/browser-ui", "generate-templates", "process", "palette", "@jsplumb/canvas-image-processing", "definitions", "inspector", "native-drop-handler"], function (require, exports, browser_ui_6, generate_templates_1, process_1, palette_1, canvas_image_processing_5, definitions_3, inspector_1, native_drop_handler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, browser_ui_6.ready)(() => {
        let model;
        // Get a new Toolkit instance
        const toolkit = (0, browser_ui_6.newInstance)({
            beforeConnect: (source, target) => {
                return target.objectType === browser_ui_6.Port.objectType && source.objectType === browser_ui_6.Port.objectType && source.getParent().id !== target.getParent().id;
            },
            portExtractor: (data) => {
                const t = model.nodeTypes[data.type];
                if (t == null) {
                    return [];
                }
                else {
                    const p = t.inputs.map((i) => Object.assign({}, i, { id: `in:${i.id}`, input: true }));
                    p.push(...t.outputs.map((i) => Object.assign({}, i, { id: `out:${i.id}`, output: true })));
                    return p;
                }
            }
        });
        model = (0, generate_templates_1.initialize)(toolkit);
        // Get the DOM element to render into
        const container = document.getElementById("container");
        const miniview = document.getElementById("miniview");
        const processor = new process_1.Processor(toolkit, model, () => {
            toolkit.filter(o => o.type === "basic.display").eachNode((idx, dn) => {
                const el = surface.getRenderedElement(dn), canvas = el.querySelector("canvas"), a = el.querySelector(".jtk-imp-download");
                const hasImage = (0, canvas_image_processing_5.setCanvasImageFromImage)(canvas, definitions_3.CANVAS_SIZE.w, definitions_3.CANVAS_SIZE.h, dn.data["in:image"]);
                el.setAttribute("data-has-image", "" + hasImage);
                if (hasImage) {
                    a.href = (0, canvas_image_processing_5.imageToDataURL)(dn.data["in:image"]);
                    a.download = `${dn.data.label}.png`;
                }
                else {
                    const ctx = canvas.getContext("2d");
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            });
            toolkit.filter(o => o.type === "basic.source").eachNode((idx, dn) => {
                const canvas = surface.getRenderedElement(dn).querySelector("canvas");
                (0, canvas_image_processing_5.setCanvasImageFromImage)(canvas, definitions_3.CANVAS_SIZE.w, definitions_3.CANVAS_SIZE.h, dn.data["out:image"]);
            });
        }, () => {
            alert("ERROR ");
        });
        const view = {
            nodes: model.uiDefinitions,
            ports: {
                source: {
                    isSource: true,
                    maxConnections: -1,
                    anchor: browser_ui_6.AnchorLocations.Right
                },
                target: {
                    isTarget: true,
                    maxConnections: 1,
                    anchor: browser_ui_6.AnchorLocations.Left
                }
            },
            edges: {
                [browser_ui_6.DEFAULT]: {
                    overlays: [
                        {
                            type: browser_ui_6.LabelOverlay.type,
                            options: {
                                label: "x",
                                cssClass: "jtk-imp-overlay-delete",
                                events: {
                                    [browser_ui_6.EVENT_CLICK]: (p) => {
                                        toolkit.removeEdge(p.edge);
                                    }
                                }
                            }
                        },
                        {
                            type: browser_ui_6.PlainArrowOverlay.type,
                            options: {
                                location: 1,
                                width: 7,
                                length: 7
                            }
                        }
                    ],
                    events: {
                        [browser_ui_6.EVENT_DBL_CLICK]: (p) => toolkit.removeEdge(p.edge)
                    }
                }
            }
        };
        // Render to a Surface.
        const surface = toolkit.render(container, {
            layout: {
                type: browser_ui_6.AbsoluteLayout.type
            },
            plugins: [
                browser_ui_6.ActiveFilteringPlugin.type,
                {
                    type: browser_ui_6.MiniviewPlugin.type,
                    options: {
                        container: miniview,
                        typeFunction: (n) => n.type.split(/\./)[0]
                    }
                }
            ],
            defaults: {
                endpoint: {
                    type: browser_ui_6.BlankEndpoint.type,
                    options: {
                        cssClass: "jtk-imp-blank-ep"
                    }
                },
                connector: browser_ui_6.StateMachineConnector.type
            },
            events: {
                [browser_ui_6.EVENT_CANVAS_CLICK]: () => {
                    toolkit.clearSelection();
                }
            },
            view,
            magnetize: {
                afterDrag: true,
            },
            consumeRightClick: false,
            modelEvents: [
                {
                    event: browser_ui_6.EVENT_CLICK,
                    selector: ".jtk-imp-delete-node",
                    callback: (e, el, info) => {
                        toolkit.removeNode(info.obj);
                    }
                },
                {
                    event: browser_ui_6.EVENT_CLICK,
                    selector: ".jtk-imp-upload",
                    callback: (e, el, info) => {
                        let input = document.createElement('input');
                        input.type = 'file';
                        input.onchange = _ => {
                            let files = Array.from(input.files);
                            if (files.length > 0 && files[0].type.match(/image.*/)) {
                                (0, canvas_image_processing_5.readImageFromFile)(files[0]).then((img) => {
                                    toolkit.update(info.obj, {
                                        image: img,
                                        width: img.naturalWidth,
                                        height: img.naturalHeight
                                    });
                                });
                            }
                        };
                        input.click();
                    }
                }
            ],
            zoomToFit: true
        });
        /**
         * Attach a native image drop handler to the surface, targetting ".jtk-imp-basic-source canvas" -
         * that is, the canvas element of source nodes. When an image is dropped we
         * update the node - the processor will respond to the event and recalculate.
         */
        new native_drop_handler_1.NativeImageDropHandler({
            selector: ".jtk-imp-basic-source canvas",
            hoverClass: "jtk-imp-drop-target",
            surface,
            imageDropped: (e, img, el, info) => {
                toolkit.update(info.obj, {
                    image: img,
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            }
        });
        /**
         * Attach a native image drop handler to the surface's whitespace.
         * When a drop occurs on here we add a new node with that image in its data.
         * The processor will pick up the node added event and handle the new node.
         */
        new native_drop_handler_1.NativeImageDropHandler({
            hoverClass: "jtk-imp-drop-target",
            surface,
            imageDropped: (e, img, el, info) => {
                const evtLoc = surface.mapEventLocation(e);
                toolkit.addNode({
                    type: "basic.source",
                    label: "Source",
                    id: (0, browser_ui_6.uuid)(),
                    left: evtLoc.x,
                    top: evtLoc.y,
                    image: img,
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            }
        });
        new inspector_1.ImageInspector(document.getElementById("inspector"), surface, model);
        new browser_ui_6.ControlsComponent(document.getElementById("controls"), surface);
        new palette_1.Palette(surface, model);
        debugger;
        toolkit.load({
            url: './dataset.json',
            onload: () => {
                toolkit.filter(o => o.type === "basic.source").eachNode((idx, dn) => {
                    if (dn.data.url != null) {
                        const img = new Image();
                        img.onload = function () {
                            toolkit.update(dn, {
                                image: img,
                                width: img.naturalWidth,
                                height: img.naturalHeight
                            });
                        };
                        img.src = dn.data.url;
                    }
                });
            }
        });
    });
});
