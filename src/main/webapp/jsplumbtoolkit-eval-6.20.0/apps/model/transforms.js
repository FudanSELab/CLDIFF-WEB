"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSFORM_INSPECTORS = exports.TRANSFORM_THRESHOLD = exports.TRANSFORM_OVERLAY = exports.TRANSFORM_RESIZE = exports.TRANSFORM_CROP = exports.TRANSFORM_CLIP = exports.TRANSFORM_BLEND = exports.TRANSFORM_MIRROR = void 0;
var canvas_image_processing_1 = require("@jsplumb/canvas-image-processing");
var definitions_1 = require("../definitions");
var COMPOSITE_OPERATIONS = ["color",
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.mirrorImage)(data["in:image"], data["axis"] || canvas_image_processing_1.AXIS_X)];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image1"] == null || data["in:image2"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.blendImages)(data["in:image1"], data["in:image2"], data["operation"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null || data["in:mask"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.clipImage)(data["in:image"], data["in:mask"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, w, h, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                w = data["in:width"] || data.width;
                                h = data["in:height"] || data.height;
                                // convert the image
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.resizeImage)(data["in:image"], w, h)];
                            case 2:
                                // convert the image
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, w, h, x, y, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                w = data["in:width"] || data.width;
                                h = data["in:height"] || data.height;
                                x = data["in:x"] || data.x;
                                y = data["in:y"] || data.y;
                                // convert the image
                                debugger;
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.cropImage)(data["in:image"], x, y, w, h)];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, x, y, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null || data["in:overlay"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                x = data["in:x"] || data.x;
                                y = data["in:y"] || data.y;
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.overlayImage)(data["in:image"], data["in:overlay"], x, y)];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, threshold, value, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                threshold = data["in:threshold"] || data.threshold;
                                value = data["in:value"] || data.value;
                                // convert the image
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.imageThreshold)(data["in:image"], threshold, value)];
                            case 2:
                                // convert the image
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        }
    ]
};
exports.TRANSFORM_INSPECTORS = (_a = {},
    _a[exports.TRANSFORM_MIRROR] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"".concat(definitions_1.ATTRIBUTE_LABEL, "\" jtk-focus placeholder=\"enter label\"/></label>\n            <label>Axis:<select jtk-att=\"axis\"><option value=\"x\">X</option><option value=\"y\">Y</option><option value=\"x_y\">X and Y</option></select></label>"); }
    },
    _a[exports.TRANSFORM_BLEND] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"".concat(definitions_1.ATTRIBUTE_LABEL, "\" jtk-focus placeholder=\"enter label\"/></label>\n            <label>Mode:<select jtk-att=\"operation\">").concat(COMPOSITE_OPERATIONS.map(function (c) { return "<option value=\"" + c + "\">" + c + "</option>"; }).join(""), "</select></label>"); }
    },
    _a[exports.TRANSFORM_CLIP] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"".concat(definitions_1.ATTRIBUTE_LABEL, "\" jtk-focus placeholder=\"enter label\"/></label>"); }
    },
    _a[exports.TRANSFORM_RESIZE] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"".concat(definitions_1.ATTRIBUTE_LABEL, "\" placeholder=\"enter label\"/></label>\n            <label>Width:<input type=\"text\" jtk-att=\"").concat(definitions_1.ATTRIBUTE_WIDTH, "\" jtk-focus/></label>\n            <label>Height:<input type=\"text\" jtk-att=\"").concat(definitions_1.ATTRIBUTE_HEIGHT, "\"/></label>"); }
    },
    _a[exports.TRANSFORM_CROP] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"".concat(definitions_1.ATTRIBUTE_LABEL, "\" placeholder=\"enter label\"/></label>\n            <label>X:<input type=\"text\" jtk-att=\"x\" jtk-focus/></label>\n            <label>Y:<input type=\"text\" jtk-att=\"y\"/></label>\n            <label>Width:<input type=\"text\" jtk-att=\"").concat(definitions_1.ATTRIBUTE_WIDTH, "\"/></label>\n            <label>Height:<input type=\"text\" jtk-att=\"").concat(definitions_1.ATTRIBUTE_HEIGHT, "\"/></label>"); }
    },
    _a[exports.TRANSFORM_OVERLAY] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"".concat(definitions_1.ATTRIBUTE_LABEL, "\" placeholder=\"enter label\"/></label>\n            <label>X:<input type=\"text\" jtk-att=\"x\" jtk-focus/></label>\n            <label>Y:<input type=\"text\" jtk-att=\"y\"/></label>"); }
    },
    _a[exports.TRANSFORM_THRESHOLD] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"".concat(definitions_1.ATTRIBUTE_LABEL, "\" placeholder=\"enter label\"/></label>\n            <label>Threshold:<input type=\"text\" jtk-att=\"threshold\" jtk-focus/></label>\n            <label>Value:<input type=\"text\" jtk-att=\"value\"/></label>"); }
    },
    _a);
