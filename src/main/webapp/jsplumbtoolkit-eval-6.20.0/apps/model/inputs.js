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
exports.INPUT_INSPECTORS = exports.INPUT_TYPES = void 0;
function verifyValue(node) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (node.data.value == null) {
                node.data["out:value"] = null;
                return [2 /*return*/, false];
            }
            else {
                node.data["out:value"] = node.data.value;
                return [2 /*return*/, true];
            }
            return [2 /*return*/];
        });
    });
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
        template: function (n) { return "\n            <label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\"/></label>\n            <label>Text:<input type=\"text\" jtk-att=\"value\" placeholder=\"enter text value\" jtk-focus/></label>\n"; }
    },
    "boolean": {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\"/></label>\n            <label>Value:<input type=\"checkbox\" jtk-att=\"value\" /></label>"; }
    },
    "color": {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\"/></label>\n            <label>Color:<input type=\"color\" jtk-att=\"value\" /></label>"; }
    },
    "number": {
        template: function (n) { return "<label>Label:<input type=\"text\" jtk-att=\"label\"  placeholder=\"enter label\"/></label>\n            <label>Number:<input type=\"text\" jtk-att=\"value\"  jtk-focus/></label>"; }
    }
};
