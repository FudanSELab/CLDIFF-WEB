"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var browser_ui_1 = require("@jsplumbtoolkit/browser-ui");
var filters_1 = require("./model/filters");
var transforms_1 = require("./model/transforms");
var math_1 = require("./model/math");
var inputs_1 = require("./model/inputs");
var basic_1 = require("./model/basic");
var definitions_1 = require("./definitions");
/**
    This file contains the code that generates the templates for each node type. Most of the nodes are of the same form in this
 app, with the exception of the source/display nodes, which have a canvas and some other controls.
 */
var header = "<div class=\"jtk-imp-$set-$type jtk-imp-$set\">\n            <div data-header data-$set-bg>{{label}}<div class=\"jtk-imp-delete-node\"></div></div>\n            <div class=\"jtk-imp-ports\">";
function processSet(set, uiDefinitions, processors, nodeTypes, inject) {
    var setId = set.set;
    set.types.forEach(function (type) {
        var key = "".concat(set.set, ".").concat(type.id);
        nodeTypes[key] = type;
        var h = header.replace(/\$type/g, type.id).replace(/\$set/g, setId);
        var inputPorts = "<div class=\"jtk-imp-inputs\">";
        console.log(type.inputs);
        type.inputs.forEach(function (tin) {
            inputPorts += "<div class=\"jtk-in\">\n                    <div class=\"jtk-imp-ep\" data-jtk-target=\"true\" data-jtk-port=\"in:".concat(tin.id, "\" data-jtk-port-type=\"target\" data-jtk-scope=\"").concat(tin.type, "\"/>\n                    <span>").concat(tin.label, "</span>\n                    </div>");
        });
        inputPorts += "</div>";
        var outputPorts = "<div class=\"jtk-imp-outputs\">";
        type.outputs.forEach(function (tin) {
            outputPorts += "<div class=\"jtk-out\">\n                    <div class=\"jtk-imp-ep\" data-jtk-source=\"true\" data-jtk-port=\"out:".concat(tin.id, "\" data-jtk-port-type=\"source\" data-jtk-scope=\"").concat(tin.type, "\"/>\n                    <span>").concat(tin.label, "</span>\n                    </div>");
        });
        outputPorts += "</div>";
        var injection = inject ? inject(set, type) : "";
        uiDefinitions[key] = {
            template: h + inputPorts + outputPorts + '</div>' + injection + "</div>",
            parent: browser_ui_1.DEFAULT
        };
        processors[key] = type.compute || (function () { return {}; });
    });
}
var downloadIcon = "<svg:svg width=\"24\" height=\"24\" viewBox=\"0 0 48 48\">\n    <svg:path d=\"M38 18h-8v-12h-12v12h-8l14 14 14-14zm-28 18v4h28v-4h-28z\"/>\n    <svg:path d=\"M0 0h48v48h-48z\" fill=\"none\"/>\n</svg:svg>";
var uploadIcon = "<svg:svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n    <svg:path d=\"M18.9,18.5H4.8c-0.6,0-1.1-0.5-1.1-1.1V8.5h5.6c3.1,0,6.3,0,9.4,0c0.1,0,0.5,0,0.9,0.4c0.2,0.2,0.4,0.5,0.4,0.9v7.6C20.1,18,19.6,18.5,18.9,18.5z\" fill=\"none\" stroke=\"black\" stroke-miterlimit=\"10\" stroke-width=\"1.5\"/>\n    <svg:path d=\"M12.9,8.5c-3.1,0-6.2,0.1-9.3,0.1v-3c0-0.6,0.5-1,1-1l4.4,0C10.3,5.9,11.6,7.2,12.9,8.5z\" fill=\"none\" stroke=\"black\"  stroke-miterlimit=\"10\" stroke-width=\"1.5\"/>\n</svg:svg>";
function initialize(toolkit) {
    var _a, _b;
    var nodeTypes = {};
    var processors = {};
    var uiDefinitions = (_a = {},
        _a[browser_ui_1.DEFAULT] = {
            events: (_b = {},
                _b[browser_ui_1.EVENT_TAP] = function (p) { return toolkit.setSelection(p.obj); },
                _b)
        },
        _a);
    // overlay
    processSet(transforms_1.default, uiDefinitions, processors, nodeTypes, function (set, type) {
        return "<canvas width=\"".concat(definitions_1.CANVAS_SIZE.w, "\" height=\"").concat(definitions_1.CANVAS_SIZE.h, "\"/><div data-width=\"{{width}}\" data-height=\"{{height}}\" class=\"jtk-imp-dim\">{{width}}x{{height}}</div>");
    });
    processSet(filters_1.default, uiDefinitions, processors, nodeTypes, function (set, type) {
        return "<canvas width=\"".concat(definitions_1.CANVAS_SIZE.w, "\" height=\"").concat(definitions_1.CANVAS_SIZE.h, "\"/><div data-width=\"{{width}}\" data-height=\"{{height}}\" class=\"jtk-imp-dim\">{{width}}x{{height}}</div>");
    });
    // input.number
    processSet(inputs_1.INPUT_TYPES, uiDefinitions, processors, nodeTypes, function (set, type) {
        return "<canvas width=\"".concat(definitions_1.CANVAS_SIZE.w, "\" height=\"").concat(definitions_1.CANVAS_SIZE.h, "\"/><div data-width=\"{{width}}\" data-height=\"{{height}}\" class=\"jtk-imp-dim\">{{width}}x{{height}}</div>");
    });
    processSet(math_1.default, uiDefinitions, processors, nodeTypes, function (set, type) {
        return "<canvas width=\"".concat(definitions_1.CANVAS_SIZE.w, "\" height=\"").concat(definitions_1.CANVAS_SIZE.h, "\"/><div data-width=\"{{width}}\" data-height=\"{{height}}\" class=\"jtk-imp-dim\">{{width}}x{{height}}</div>");
    });
    // Source and display nodes have a canvas and image dimensions, and the display node has a download button.
    // comment
    processSet(basic_1.default, uiDefinitions, processors, nodeTypes, function (set, type) {
        // if (type.id === TYPE_SOURCE || type.id === TYPE_DISPLAY) {
        // const extraButtons = type.id === TYPE_DISPLAY ? `<a class="jtk-imp-download" title="Download image">${downloadIcon}</a>` : `<a class="jtk-imp-upload" title="Upload image">${uploadIcon}</a>`
        // return `<canvas width="${CANVAS_SIZE.w}" height="${CANVAS_SIZE.h}"/><div data-width="{{width}}" data-height="{{height}}" class="jtk-imp-dim">{{width}}x{{height}}</div>${extraButtons}`
        return "<canvas width=\"".concat(definitions_1.CANVAS_SIZE.w, "\" height=\"").concat(definitions_1.CANVAS_SIZE.h, "\"/><div data-width=\"{{width}}\" data-height=\"{{height}}\" class=\"jtk-imp-dim\">{{width}}x{{height}}</div>");
        // } else {
        // return ""
        // }
    });
    return { uiDefinitions: uiDefinitions, processors: processors, nodeTypes: nodeTypes };
}
exports.initialize = initialize;
