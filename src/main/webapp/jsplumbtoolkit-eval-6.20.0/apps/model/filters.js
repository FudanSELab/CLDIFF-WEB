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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILTER_INSPECTORS = void 0;
var canvas_image_processing_1 = require("@jsplumb/canvas-image-processing");
var filters = {
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
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterGrayScale)(data["in:image"], data["in:amount"] || data["amount"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, c, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                c = data["in:radius"] || data["radius"];
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterBlur)(data["in:image"], c)];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        },
        {
            id: "invert",
            name: "Invert",
            inputs: [
                { id: "conl", label: "l", type: "string" }
                // { id:"amount", label:"Amount", type:"number"}
            ],
            outputs: [{ id: "conr", label: "r", type: "string" }],
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        data = node.data;
                        // if (data["in:image"] == null) {
                        //     data["out:image"] = null
                        return [2 /*return*/, false
                            // } else {
                            //     data["out:image"] = await filterInvert(data["in:image"], data["in:amount"] || data["amount"])
                            //     return true
                            // }
                        ];
                    });
                });
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
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterSepia)(data["in:image"], data["in:amount"] || data["amount"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterSaturate)(data["in:image"], data["in:amount"] || data["amount"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterOpacity)(data["in:image"], data["in:amount"] || data["amount"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterContrast)(data["in:image"], data["in:amount"] || data["amount"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterBrightness)(data["in:image"], data["in:amount"] || data["amount"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterHueRotate)(data["in:image"], data["in:amount"] || data["amount"])];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, c, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                data = node.data;
                                if (!(data["in:image"] == null)) return [3 /*break*/, 1];
                                data["out:image"] = null;
                                return [2 /*return*/, false];
                            case 1:
                                c = data["in:color"] || data["color"];
                                _a = data;
                                _b = "out:image";
                                return [4 /*yield*/, (0, canvas_image_processing_1.filterTint)(data["in:image"], c)];
                            case 2:
                                _a[_b] = _c.sent();
                                return [2 /*return*/, true];
                        }
                    });
                });
            }
        }
    ]
};
exports.FILTER_INSPECTORS = {};
filters.types.forEach(function (type) {
    var dataField = type.inputs[0], inputType = dataField.type === "color" ? "color" : "text";
    exports.FILTER_INSPECTORS[type.id] = {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\" jtk-focus/></label>\n            <label>".concat(dataField.label, ":<input type=\"").concat(inputType, "\" jtk-att=\"").concat(dataField.id, "\" placeholder=\"enter ").concat(dataField.id, "\"/></label>"); }
    };
});
exports.default = filters;
