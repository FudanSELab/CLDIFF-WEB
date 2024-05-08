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
exports.Processor = void 0;
var browser_ui_1 = require("@jsplumbtoolkit/browser-ui");
/**
 * This is the processor for the image pipeline. It listens to various events on the Toolkit and either runs the whole
 * pipeline or just some node and its descendants, as necessary.
 */
var Processor = /** @class */ (function () {
    function Processor(toolkit, model, onComplete, onError) {
        var _this = this;
        this._loading = false;
        this.toolkit = toolkit;
        this.model = model;
        this.onComplete = onComplete;
        this.onError = onError;
        // set loading flag at load start so we dont run until loading is finished
        this.toolkit.bind(browser_ui_1.EVENT_DATA_LOAD_START, function () { return _this._loading = true; });
        // at load end, run the processor, with `force` - assume all vertices dirty.
        this.toolkit.bind(browser_ui_1.EVENT_DATA_LOAD_END, function () {
            _this._loading = false;
            // and run the processor
            _this.run(true);
        });
        /**
         * When a new node gets added (outside of a load), mark the node dirty. The next time the processor is run and this new node
         * has any connections, it will be executed.
         */
        this.toolkit.bind(browser_ui_1.EVENT_NODE_ADDED, function (p) {
            _this._markDirty(p.node);
        });
        /**
         * For all updates except left/top updates (coming from a drag), run the processor on change.
         */
        this.toolkit.bind(browser_ui_1.EVENT_NODE_UPDATED, function (p) {
            // ignore node positioning updates
            if (!p.updates.left) {
                _this._markDirty(p.vertex);
            }
        });
        /**
         * When an edge is added, find the target of the edge, set its value from the source, and mark it for processing. Then run the processor.
         */
        this.toolkit.bind(browser_ui_1.EVENT_EDGE_ADDED, function (p) {
            var edge = p.edge;
            edge.target.getParent().data[edge.target.id] = edge.source.getParent().data[edge.source.id];
            edge.target.getParent().dirty = true;
            _this.run();
        });
        /**
         * When an edge is removed, find the target of the edge and remove the value that the previous edge was supplying, then mark the target node
         * for processing and run the processor.
         */
        this.toolkit.bind(browser_ui_1.EVENT_EDGE_REMOVED, function (p) {
            var edge = p.edge;
            edge.target.getParent().data[edge.target.id] = null;
            edge.target.getParent().dirty = true;
            _this.run();
        });
    }
    /**
     * Run the processor, and invoke the onComplete handler afterwards.
     * @param force
     */
    Processor.prototype.run = function (force) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.execute(force).then(this.onComplete);
                }
                catch (e) {
                    this.onError(e);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * For a given node, mark everything downstream for processing.
     * @param obj
     * @param touched
     * @private
     */
    Processor.prototype._clearDownstream = function (obj, touched) {
        var _this = this;
        if (touched === void 0) { touched = {}; }
        if (!touched[obj.id]) {
            touched[obj.id] = true;
            obj.dirty = true;
            var outputs = obj.getPorts().filter(function (p) { return p.data.output === true; });
            outputs.forEach(function (output) {
                output.edges.forEach(function (edge) {
                    edge.target.getParent().data[edge.target.id] = null;
                    edge.target.getParent().dirty = true;
                    _this._clearDownstream(edge.target.getParent(), touched);
                });
            });
        }
    };
    /**
     * Mark a node for processing: clear everything downstream, compute the node, and if a value was returned, propagate to children.
     * @param obj
     * @private
     */
    Processor.prototype._markDirty = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var modelObject, result, outputs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._clearDownstream(obj);
                        modelObject = this.model.nodeTypes[obj.type];
                        return [4 /*yield*/, modelObject.compute(obj)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            obj.dirty = false;
                            outputs = obj.getPorts().filter(function (p) { return p.data.output === true; });
                            outputs.forEach(function (output) {
                                output.edges.forEach(function (edge) {
                                    edge.target.getParent().data[edge.target.id] = edge.source.getParent().data[edge.source.id];
                                    edge.target.getParent().dirty = true;
                                });
                            });
                        }
                        this.run();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Run the processor.
     * @param force
     */
    Processor.prototype.execute = function (force) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var queue = [];
                        var unprocessed = _this.toolkit.getNodes().slice();
                        var processed = {};
                        if (force) {
                            unprocessed.forEach(function (up) { return up.dirty = true; });
                        }
                        var _onePass = function () { return __awaiter(_this, void 0, void 0, function () {
                            var cleanRun, i, candidate, modelObject, result, outputs;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        cleanRun = true;
                                        if (!(unprocessed.length === 0)) return [3 /*break*/, 1];
                                        resolve(true);
                                        return [3 /*break*/, 5];
                                    case 1:
                                        queue.length = 0;
                                        queue.push.apply(queue, unprocessed);
                                        unprocessed.length = 0;
                                        i = 0;
                                        _a.label = 2;
                                    case 2:
                                        if (!(i < queue.length)) return [3 /*break*/, 5];
                                        candidate = queue[i];
                                        modelObject = this.model.nodeTypes[candidate.type];
                                        if (!candidate.dirty) return [3 /*break*/, 4];
                                        return [4 /*yield*/, modelObject.compute(candidate)];
                                    case 3:
                                        result = _a.sent();
                                        outputs = candidate.getPorts().filter(function (p) { return p.data.output === true; });
                                        if (result) {
                                            processed[candidate.id] = candidate;
                                            cleanRun = false;
                                            candidate.dirty = false;
                                            outputs.forEach(function (output) {
                                                output.edges.forEach(function (edge) {
                                                    edge.target.getParent().data[edge.target.id] = edge.source.getParent().data[edge.source.id];
                                                    edge.target.getParent().dirty = true;
                                                });
                                            });
                                        }
                                        else {
                                            unprocessed.push(candidate);
                                            this._clearDownstream(candidate);
                                        }
                                        _a.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 2];
                                    case 5:
                                        if (!cleanRun) return [3 /*break*/, 6];
                                        resolve(true);
                                        return [3 /*break*/, 8];
                                    case 6: return [4 /*yield*/, _onePass()];
                                    case 7:
                                        _a.sent();
                                        _a.label = 8;
                                    case 8: return [2 /*return*/];
                                }
                            });
                        }); };
                        _onePass();
                    })];
            });
        });
    };
    return Processor;
}());
exports.Processor = Processor;
