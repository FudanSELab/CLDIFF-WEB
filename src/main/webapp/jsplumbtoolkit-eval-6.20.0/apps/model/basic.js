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
exports.BASIC_INSPECTORS = void 0;
var canvas_image_processing_1 = require("@jsplumb/canvas-image-processing");
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data, inputUrl, image, img;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                data = node.data;
                                inputUrl = data["in:url"];
                                if (!(inputUrl == null)) return [3 /*break*/, 1];
                                image = data["image"];
                                if (image == null) {
                                    data["out:image"] = null;
                                    data.width = null;
                                    data.height = null;
                                    return [2 /*return*/, false];
                                }
                                else {
                                    data["out:image"] = image;
                                    data.width = image.naturalWidth;
                                    data.height = image.naturalHeight;
                                    return [2 /*return*/, true];
                                }
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, (0, canvas_image_processing_1.imageURLToImage)(inputUrl)];
                            case 2:
                                img = _a.sent();
                                data["out:image"] = img;
                                data.width = img.naturalWidth;
                                data.height = img.naturalHeight;
                                return [2 /*return*/, true];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        data = node.data;
                        data["out:image"] = data["in:image"];
                        return [2 /*return*/, data["in:image"] != null];
                    });
                });
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
            compute: function (node) {
                return __awaiter(this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        data = node.data;
                        if (data["in:image"] == null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            data["out:width"] = data["in:image"].naturalWidth;
                            data["out:height"] = data["in:image"].naturalHeight;
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                    });
                });
            }
        }
    ]
};
exports.BASIC_INSPECTORS = {
    "source": {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\"/></label>"; }
    },
    "display": {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\"/></label>"; }
    },
    "properties": {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\"/></label>"; }
    }
};
