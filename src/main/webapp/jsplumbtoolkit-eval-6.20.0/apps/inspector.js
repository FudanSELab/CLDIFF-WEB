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
exports.ImageInspector = void 0;
var browser_ui_1 = require("@jsplumbtoolkit/browser-ui");
var inputs_1 = require("./model/inputs");
var filters_1 = require("./model/filters");
var transforms_1 = require("./model/transforms");
var basic_1 = require("./model/basic");
var monaco = require("monaco-editor");
var handlers = {
    input: inputs_1.INPUT_INSPECTORS,
    filter: filters_1.FILTER_INSPECTORS,
    transform: transforms_1.TRANSFORM_INSPECTORS,
    basic: basic_1.BASIC_INSPECTORS
};
var ImageInspector = /** @class */ (function (_super) {
    __extends(ImageInspector, _super);
    function ImageInspector(container, surface, model) {
        var _this = _super.call(this, {
            container: container,
            surface: surface,
            templateResolver: function (obj) {
                if ((0, browser_ui_1.isNode)(obj)) {
                    _this._renderNodeTemplate(obj, container);
                    // return this._renderNodeTemplate(obj)
                }
                return '';
            },
            cacheTemplates: false,
            renderEmptyContainer: function () { return "<h1>SELECT SOMETHING INNIT</h1>"; },
            refresh: function (obj, cb) { return null; }
        }) || this;
        _this.model = model;
        return _this;
    }
    ImageInspector.prototype._renderNodeTemplate = function (obj, container) {
        console.log(obj.data.id);
        // const code = window.map.get(obj.data.id).data['code'];
        console.log(container);
        console.log(obj.data.code);
        var editor2 = monaco.editor.create(container, {
            value: obj.data.code,
            language: 'java',
            autoIndent: 'advanced',
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            overviewRulerBorder: false
        });
        console.log('render node template');
        // entrance for right bar
        // console.log(obj)
        var _a = obj.type.split("."), set = _a[0], type = _a[1];
        try {
            // console.log(handlers[set][type].template(obj))
            // return handlers[set][type].template(obj)
            return "<div/>";
        }
        catch (e) {
            return "<div/>";
        }
    };
    return ImageInspector;
}(browser_ui_1.VanillaInspector));
exports.ImageInspector = ImageInspector;
