"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessorNode = exports.CANVAS_SIZE = exports.ATTRIBUTE_LABEL = exports.ATTRIBUTE_HEIGHT = exports.ATTRIBUTE_WIDTH = exports.TYPE_SOURCE = exports.TYPE_DISPLAY = void 0;
var browser_ui_1 = require("@jsplumbtoolkit/browser-ui");
exports.TYPE_DISPLAY = "display";
exports.TYPE_SOURCE = "source";
exports.ATTRIBUTE_WIDTH = "width";
exports.ATTRIBUTE_HEIGHT = "height";
exports.ATTRIBUTE_LABEL = "label";
// change node size here 
exports.CANVAS_SIZE = { w: 400, h: 200 };
var ImageProcessorNode = /** @class */ (function (_super) {
    __extends(ImageProcessorNode, _super);
    function ImageProcessorNode(graph, data, idFunction) {
        console.log('aabbbb');
        return _super.call(this, graph, data, idFunction) || this; // Call the parent class constructor
    }
    return ImageProcessorNode;
}(browser_ui_1.Node));
exports.ImageProcessorNode = ImageProcessorNode;
