(function() {

    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var root = this;
    /**
     * Superclass for edge add/remove.
     */
    var EdgeAction = /** @class */ (function () {
        function EdgeAction(obj, toolkit, manager) {
            this.obj = obj;
            this.toolkit = toolkit;
            this.manager = manager;
            this.source = obj.source.getFullId();
            this.target = obj.target.getFullId();
            if (obj.source.objectType === "Port") {
                this.sourcePort = obj.source.id;
                this.source = obj.source.getNode().getFullId();
            }
            if (obj.target.objectType === "Port") {
                this.targetPort = obj.target.id;
                this.target = obj.target.getNode().getFullId();
            }
            this.edgeId = obj.getId();
        }
        EdgeAction.prototype.generateSourceId = function () {
            return this.sourcePort == null ? this.source : this.source + this.toolkit.getGraph().getPortSeparator() + this.sourcePort;
        };
        EdgeAction.prototype.generateTargetId = function () {
            return this.targetPort == null ? this.target : this.target + this.toolkit.getGraph().getPortSeparator() + this.targetPort;
        };
        EdgeAction.prototype._add = function () {
            // at this point, any EdgeActions in the stack whose edgeId is our previous edgeId need to be updated with this
            // new object...unfortunately. this object will itself be called back in the `edgeChange` method below to do an update.
            this.manager.edgeChange(this.edgeId, this.toolkit.connect({ source: this.generateSourceId(), target: this.generateTargetId(), data: this.obj.data }));
        };
        EdgeAction.prototype._remove = function () { this.toolkit.removeEdge(this.obj); };
        EdgeAction.prototype.edgeChange = function (newEdge) {
            this.obj = newEdge;
            this.edgeId = this.obj.getId();
        };
        return EdgeAction;
    }());
    var EdgeAddAction = /** @class */ (function (_super) {
        __extends(EdgeAddAction, _super);
        function EdgeAddAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EdgeAddAction.prototype.undo = function () { this._remove(); };
        EdgeAddAction.prototype.redo = function () { this._add(); };
        return EdgeAddAction;
    }(EdgeAction));
    var EdgeRemoveAction = /** @class */ (function (_super) {
        __extends(EdgeRemoveAction, _super);
        function EdgeRemoveAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EdgeRemoveAction.prototype.undo = function () { this._add(); };
        EdgeRemoveAction.prototype.redo = function () { this._remove(); };
        return EdgeRemoveAction;
    }(EdgeAction));
    var NodeGroupAction = /** @class */ (function () {
        function NodeGroupAction(obj, toolkit) {
            this.obj = obj;
            this.toolkit = toolkit;
        }
        NodeGroupAction.prototype._add = function () {
            if (this.obj.objectType === "Node") {
                this.obj = this.toolkit.addNode(this.obj.data);
            }
            else if (this.obj.objectType === "Group") {
                this.obj = this.toolkit.addGroup(this.obj.data);
            }
        };
        NodeGroupAction.prototype._remove = function () {
            this.toolkit.remove(this.obj);
        };
        NodeGroupAction.prototype.getTerminusId = function () { return this.obj.getFullId(); };
        return NodeGroupAction;
    }());
    var TerminusAddAction = /** @class */ (function (_super) {
        __extends(TerminusAddAction, _super);
        function TerminusAddAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TerminusAddAction.prototype.undo = function () { this._remove(); };
        TerminusAddAction.prototype.redo = function () { this._add(); };
        return TerminusAddAction;
    }(NodeGroupAction));
    var TerminusRemoveAction = /** @class */ (function (_super) {
        __extends(TerminusRemoveAction, _super);
        function TerminusRemoveAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TerminusRemoveAction.prototype.undo = function () { this._add(); };
        TerminusRemoveAction.prototype.redo = function () { this._remove(); };
        TerminusRemoveAction.prototype.isConnectedTo = function (edgeRemoveAction) {
            var tId = this.getTerminusId();
            return edgeRemoveAction.source === tId || edgeRemoveAction.target === tId;
        };
        return TerminusRemoveAction;
    }(NodeGroupAction));
    var PortAction = /** @class */ (function () {
        function PortAction(obj, parent, toolkit) {
            this.obj = obj;
            this.parent = parent;
            this.toolkit = toolkit;
        }
        PortAction.prototype._add = function () {
            this.toolkit.addPort(this.parent, this.obj.data);
        };
        PortAction.prototype._remove = function () {
            this.toolkit.removePort(this.parent, this.obj.id);
        };
        PortAction.prototype.getTerminusId = function () { return this.obj.getFullId(); };
        return PortAction;
    }());
    var PortAddAction = /** @class */ (function (_super) {
        __extends(PortAddAction, _super);
        function PortAddAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PortAddAction.prototype.undo = function () {
            this._remove();
        };
        PortAddAction.prototype.redo = function () {
            this._add();
        };
        return PortAddAction;
    }(PortAction));
    var PortRemoveAction = /** @class */ (function (_super) {
        __extends(PortRemoveAction, _super);
        function PortRemoveAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PortRemoveAction.prototype.undo = function () {
            this._add();
        };
        PortRemoveAction.prototype.redo = function () {
            this._remove();
        };
        PortRemoveAction.prototype.isConnectedTo = function (edgeRemoveAction) {
            var tId = this.getTerminusId();
            return edgeRemoveAction.generateSourceId() === tId || edgeRemoveAction.generateTargetId() === tId;
        };
        return PortRemoveAction;
    }(PortAction));
    /**
     * One update action for all types
     */
    var UpdateAction = /** @class */ (function () {
        function UpdateAction(obj, originalData, toolkit) {
            this.obj = obj;
            this.toolkit = toolkit;
            this.newData = jsPlumb.extend({}, obj.data);
            this.originalData = jsPlumb.extend({}, originalData);
        }
        UpdateAction.prototype._getMethod = function () {
            return "update" + this.obj.objectType;
        };
        UpdateAction.prototype.undo = function () {
            this.toolkit[this._getMethod()](this.obj, this.originalData);
        };
        UpdateAction.prototype.redo = function () {
            this.toolkit[this._getMethod()](this.obj, this.newData);
        };
        return UpdateAction;
    }());
    var MoveAction = /** @class */ (function () {
        function MoveAction(obj, originalPosition, pos, surface) {
            this.obj = obj;
            this.originalPosition = originalPosition;
            this.pos = pos;
            this.surface = surface;
        }
        MoveAction.prototype.redo = function () {
            this.surface.setPosition(this.obj, this.pos[0], this.pos[1]);
        };
        MoveAction.prototype.undo = function () {
            this.surface.setPosition(this.obj, this.originalPosition[0], this.originalPosition[1]);
        };
        return MoveAction;
    }());
    /**
     * Compounds a set of actions into one. An example of this is a node remove, in which all of its edges and ports are also
     * removed.
     */
    var CompoundAction = /** @class */ (function () {
        function CompoundAction(actions) {
            this.actions = actions;
            if (this.actions == null) {
                this.actions = [];
            }
        }
        CompoundAction.prototype.addAction = function (action) {
            this.actions.push(action);
        };
        CompoundAction.prototype.undo = function () {
            this.actions.slice().reverse().forEach(function (action) { return action.undo(); });
        };
        CompoundAction.prototype.redo = function () {
            this.actions.forEach(function (action) { return action.redo(); });
        };
        CompoundAction.prototype.edgeChange = function (previousId, newEdge) {
            this.actions.forEach(function (entry) {
                if (entry instanceof EdgeAction && entry.edgeId === previousId) {
                    entry.edgeChange(newEdge);
                }
            });
        };
        return CompoundAction;
    }());
    var MAXIMUM_SIZE = 50;
    var jsPlumbToolkitUndoRedo = /** @class */ (function () {
        function jsPlumbToolkitUndoRedo(params) {
            this.toolkit = params.toolkit;
            this.surface = params.surface;
            if (this.surface == null && this.toolkit == null) {
                throw new Error("You must provide at least `toolkit` for the Undo/redo manager.");
            }
            if (this.surface != null) {
                this.toolkit = this.surface.getToolkit();
            }
            this.suspend = false;
            this.undoStack = [];
            this.redoStack = [];
            this.compound = params.compound === true;
            this.maximumSize = params.maximumSize || MAXIMUM_SIZE;
            this.onChange = params.onChange;
            this._bindListeners();
        }
        /**
         * Perhaps compound the given remove action with any prior edge remove actions whose source or target is the focus of the terminus
         * remove. we search down the undo stack looking for EdgeRemoveActions that are for edges connected to the terminus that is being removed,
         * adding them to a list of candidates until we fail to match. If this list of candidates is of non zero length, we compound them all
         * into one action, prepending (this is important - the terminus has to exist before the edges on undo) the terminus remove action. we then
         * splice the undo stack to remove all the candidates we found, and return a compound action, which is added to the top of the undo stack.
         *
         * @param action
         * @returns {UndoRedoAction}
         * @private
         */
        jsPlumbToolkitUndoRedo.prototype._possiblyCompound = function (action) {
            if (this.compound) {
                var candidates = [], idx = this.undoStack.length - 1, result = action;
                while (idx > -1) {
                    var candidate = this.undoStack[idx];
                    if (candidate instanceof EdgeRemoveAction && action.isConnectedTo(candidate)) {
                        candidates.unshift(candidate);
                        idx--;
                    }
                    else {
                        break;
                    }
                }
                if (candidates.length > 0) {
                    candidates.push(action);
                    var ca = new CompoundAction(candidates);
                    this.undoStack.splice(idx + 1);
                    result = ca;
                }
                else {
                    result = action;
                }
                return result;
            }
            else {
                return action;
            }
        };
        /**
         * Add a terminus remove action - node or group. pulled into a common method since they both do the same thing, but also
         * terminus remove actions are a candidate for "compounding" with any prior edge remove events.
         * @param obj
         * @private
         */
        jsPlumbToolkitUndoRedo.prototype._addTerminusRemoveAction = function (obj) {
            this.command(this._possiblyCompound(new TerminusRemoveAction(obj, this.toolkit)));
        };
        jsPlumbToolkitUndoRedo.prototype._objectNotEmpty = function (d) {
            for (var k in d) {
                if (d.hasOwnProperty(k)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Bind listeners to the events in the Toolkit we are interested in.
         * @private
         */
        jsPlumbToolkitUndoRedo.prototype._bindListeners = function () {
            var _this = this;
            this.toolkit.bind("dataLoadStart", function () {
                _this.clear();
                _this.suspend = true;
            });
            this.toolkit.bind("dataLoadEnd", function () { _this.suspend = false; });
            this.toolkit.bind("nodeAdded", function (p) {
                _this.command(new TerminusAddAction(p.node, _this.toolkit));
            });
            this.toolkit.bind("nodeRemoved", function (p) {
                _this._addTerminusRemoveAction(p.node);
            });
            this.toolkit.bind("nodeUpdated", function (p) {
                if (_this._objectNotEmpty(p.updates)) {
                    _this.command(new UpdateAction(p.node, p.originalData, _this.toolkit));
                }
            });
            this.toolkit.bind("groupAdded", function (p) {
                _this.command(new TerminusAddAction(p.group, _this.toolkit));
            });
            this.toolkit.bind("groupRemoved", function (p) {
                _this._addTerminusRemoveAction(p.group);
            });
            this.toolkit.bind("groupUpdated", function (p) {
                if (_this._objectNotEmpty(p.updates)) {
                    _this.command(new UpdateAction(p.group, p.originalData, _this.toolkit));
                }
            });
            this.toolkit.bind("edgeAdded", function (p) {
                _this.command(new EdgeAddAction(p.edge, _this.toolkit, _this));
            });
            this.toolkit.bind("edgeRemoved", function (p) {
                _this.command(new EdgeRemoveAction(p.edge, _this.toolkit, _this));
            });
            this.toolkit.bind("edgeUpdated", function (p) {
                if (_this._objectNotEmpty(p.updates)) {
                    _this.command(new UpdateAction(p.edge, p.originalData, _this.toolkit));
                }
            });
            this.toolkit.bind("portAdded", function (p) {
                _this.command(new PortAddAction(p.port, p.node, _this.toolkit));
            });
            this.toolkit.bind("portRemoved", function (p) {
                _this.command(_this._possiblyCompound(new PortRemoveAction(p.port, p.node, _this.toolkit)));
            });
            this.toolkit.bind("portUpdated", function (p) {
                if (_this._objectNotEmpty(p.updates)) {
                    _this.command(new UpdateAction(p.port, p.originalData, _this.toolkit));
                }
            });
            if (this.surface != null) {
                this.surface.bind("nodeMoveEnd", function (p) {
                    if (p.originalPosition != null) {
                        _this.command(new MoveAction(p.node, p.originalPosition, p.pos, _this.surface));
                    }
                });
            }
        };
        /**
         * Fire the on change event, if there's a listener registered.
         * @private
         */
        jsPlumbToolkitUndoRedo.prototype._fireUpdate = function () {
            this.onChange && this.onChange(this, this.undoStack.length, this.redoStack.length);
        };
        /**
         * add a command to the undo stack, clearing the redo stack.
         * @param action
         */
        jsPlumbToolkitUndoRedo.prototype.command = function (action) {
            if (!this.suspend) {
                if (this.currentTransaction != null) {
                    this.currentTransaction.addAction(action);
                }
                else {
                    this.undoStack.push(action);
                    if (this.undoStack.length > this.maximumSize) {
                        //this.undoStack = this.undoStack.slice(this.undoStack.length - this.maximumSize)
                        this.undoStack.splice((this.undoStack.length - this.maximumSize - 1), this.undoStack.length - this.maximumSize);
                    }
                    this.redoStack.length = 0;
                    this._fireUpdate();
                }
            }
        };
        /**
         * Notification that some edge has been replaced with a copy. This occurs when an edge removed is undone or an edge add is
         * redone. we need to update all references to the previous edge with this new one, as the toolkit no longer knows about
         * the old edge. This is not a method that should be called from outside of the undo manager.
         * @param previousId
         * @param newEdge
         */
        jsPlumbToolkitUndoRedo.prototype.edgeChange = function (previousId, newEdge) {
            var _one = function (list) {
                list.forEach(function (entry) {
                    if (entry instanceof EdgeAction && entry.edgeId === previousId) {
                        entry.edgeChange(newEdge);
                    }
                    else if (entry instanceof CompoundAction) {
                        entry.edgeChange(previousId, newEdge);
                    }
                });
            };
            _one(this.undoStack);
            _one(this.redoStack);
        };
        /**
         * Execute undo on the last command in the undo stack, if it isn't empty.
         */
        jsPlumbToolkitUndoRedo.prototype.undo = function () {
            var cmd = this.undoStack.pop();
            if (cmd) {
                this.suspend = true;
                this.redoStack.push(cmd);
                cmd.undo();
                this.suspend = false;
                this._fireUpdate();
            }
        };
        /**
         * Re-execute the last command in the redo stack, if it isn't empty.
         */
        jsPlumbToolkitUndoRedo.prototype.redo = function () {
            var cmd = this.redoStack.pop();
            if (cmd) {
                this.suspend = true;
                this.undoStack.push(cmd);
                cmd.redo();
                this.suspend = false;
                this._fireUpdate();
            }
        };
        /**
         * Clears both stacks and fires an update event.
         */
        jsPlumbToolkitUndoRedo.prototype.clear = function () {
            this.undoStack.length = 0;
            this.redoStack.length = 0;
            this.currentTransaction = null;
            this._fireUpdate();
        };
        /**
         * Run a series of operations as a single transaction in the undo stack, meaning that they will all be undone/redone
         * at once.
         * @param fn
         */
        jsPlumbToolkitUndoRedo.prototype.transaction = function (fn) {
            if (this.currentTransaction != null) {
                throw new Error("Cannot start a new transaction while one is active");
            }
            else {
                this.currentTransaction = new CompoundAction();
                fn();
                var ct = this.currentTransaction;
                this.currentTransaction = null;
                this.command(ct);
            }
        };
        return jsPlumbToolkitUndoRedo;
    }());


    root.jsPlumbToolkitUndoRedo = jsPlumbToolkitUndoRedo;
    if (typeof exports !== "undefined") {
        exports.jsPlumbToolkitUndoRedo = jsPlumbToolkitUndoRedo;
    }


}).call(typeof window !== 'undefined' ? window : this);