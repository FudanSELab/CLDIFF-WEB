"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeImageDropHandler = exports.NativeDropHandler = void 0;
var browser_ui_1 = require("@jsplumbtoolkit/browser-ui");
var canvas_image_processing_1 = require("@jsplumb/canvas-image-processing");
var CLASS_HOVER_DEFAULT = "jtk-native-drop-hover";
var EVENT_DRAG_ENTER = "dragenter";
var EVENT_DRAG_LEAVE = "dragleave";
var EVENT_DRAG_OVER = "dragover";
var EVENT_DROP = "drop";
var NativeDropHandler = /** @class */ (function () {
    function NativeDropHandler(options) {
        var _this = this;
        this.eventManager = new browser_ui_1.EventManager();
        this.surface = options.surface;
        this.hoverClasses = [CLASS_HOVER_DEFAULT];
        if (options.hoverClass) {
            this.hoverClasses.push(options.hoverClass);
        }
        var element = options.element || this.surface.getContainer().parentElement;
        var _addClass = function (e) {
            var _a;
            (0, browser_ui_1.consume)(e);
            (_a = e.target.classList).add.apply(_a, _this.hoverClasses);
        };
        var enterOptions = [element, EVENT_DRAG_ENTER];
        if (options.selector) {
            enterOptions.push(options.selector);
        }
        enterOptions.push(_addClass);
        this.eventManager.on.apply(this.eventManager, enterOptions);
        var _removeClass = function (e) {
            var _a;
            (0, browser_ui_1.consume)(e);
            (_a = e.target.classList).remove.apply(_a, _this.hoverClasses);
        };
        var leaveOptions = [element, EVENT_DRAG_LEAVE];
        if (options.selector) {
            leaveOptions.push(options.selector);
        }
        leaveOptions.push(_removeClass);
        this.eventManager.on.apply(this.eventManager, leaveOptions);
        var _setDropEffect = function (e) {
            (0, browser_ui_1.consume)(e);
            e.dataTransfer.dropEffect = 'copy';
        };
        var copyOptions = [element, EVENT_DRAG_OVER];
        if (options.selector) {
            copyOptions.push(options.selector);
        }
        copyOptions.push(_setDropEffect);
        this.eventManager.on.apply(this.eventManager, copyOptions);
        var dropOptions = [element, EVENT_DROP];
        if (options.selector) {
            dropOptions.push(options.selector);
        }
        dropOptions.push(function (e) {
            var _a;
            if (!e.cancelBubble && !e.defaultPrevented) {
                (0, browser_ui_1.consume)(e);
                (_a = e.target.classList).remove.apply(_a, _this.hoverClasses);
                options.onDrop(e, e.target, _this.surface.getObjectInfo(e.target));
            }
        });
        this.eventManager.on.apply(this.eventManager, dropOptions);
    }
    return NativeDropHandler;
}());
exports.NativeDropHandler = NativeDropHandler;
var NativeImageDropHandler = /** @class */ (function () {
    function NativeImageDropHandler(options) {
        this.handler = new NativeDropHandler({
            surface: options.surface,
            element: options.element,
            selector: options.selector,
            hoverClass: options.hoverClass,
            onDrop: function (e, el, info) {
                var dt = e.dataTransfer;
                var files = dt.files;
                var url = e.dataTransfer.getData('text/plain');
                if (url) {
                    var img_1 = new Image();
                    img_1.onload = function () {
                        options.imageDropped(e, img_1, el, info);
                    };
                    img_1.src = url;
                }
                else {
                    if (files[0].type.match(/image.*/)) {
                        (0, canvas_image_processing_1.readImageFromFile)(files[0]).then(function (img) {
                            options.imageDropped(e, img, el, info);
                        });
                    }
                }
            }
        });
    }
    return NativeImageDropHandler;
}());
exports.NativeImageDropHandler = NativeImageDropHandler;
