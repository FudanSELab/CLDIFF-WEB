(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@jsplumbtoolkit/browser-ui'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', '@jsplumbtoolkit/browser-ui', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jsPlumbToolkitReact = {}, global.React, global.jsPlumbToolkit, global.ReactDOM));
})(this, (function (exports, React, browserUi, ReactDOM) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  var PROP_TOOLKIT = "toolkit";
  var PROP_SURFACE = "surface";
  var PROP_VERTEX = "vertex";
  var REQUIRED_PROPS = [PROP_TOOLKIT, PROP_SURFACE, PROP_VERTEX];
  /**
   * Base class for port/group/node components. Internal.
   * @internal
   */
  var BaseVertexComponent = /*#__PURE__*/function (_React$Component) {
    function BaseVertexComponent(props) {
      var _this;
      _classCallCheck(this, BaseVertexComponent);
      _this = _callSuper(this, BaseVertexComponent, [props]);
      _defineProperty(_this, "toolkit", void 0);
      _defineProperty(_this, "surface", void 0);
      _defineProperty(_this, "vertex", void 0);
      REQUIRED_PROPS.forEach(function (rp) {
        var v = props.ctx ? props.ctx[rp] : props[rp];
        if (v == null) {
          throw new Error("JSPLUMB: BaseVertexComponent missing required prop '" + rp + "'; either pass directly to the component or use the `ctx` object provided by the Toolkit");
        } else {
          _this[rp] = v;
        }
      });
      return _this;
    }

    // in some cases this seems like the right thing to do. And in others, it causes React to complain about unmounted components.
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.surface && this.vertex && this.surface.repaint(this.vertex);
    // }
    _inherits(BaseVertexComponent, _React$Component);
    return _createClass(BaseVertexComponent, [{
      key: "removeVertex",
      value: function removeVertex() {
        this.toolkit.remove(this.vertex);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.toolkit = null;
        this.surface = null;
        this.vertex = null;
      }
    }]);
  }(React__namespace.Component);

  /**
   * Base component that your node components can extend, to get access to a few helper methods.  It is not imperative
   * that you extend this component.
   */
  var BaseNodeComponent = /*#__PURE__*/function (_BaseVertexComponent) {
    function BaseNodeComponent(props) {
      var _this;
      _classCallCheck(this, BaseNodeComponent);
      _this = _callSuper(this, BaseNodeComponent, [props]);
      _defineProperty(_this, "node", void 0);
      _this.node = _this.vertex;
      return _this;
    }

    /**
     * Removes the node that this component represents.
     */
    _inherits(BaseNodeComponent, _BaseVertexComponent);
    return _createClass(BaseNodeComponent, [{
      key: "removeNode",
      value: function removeNode() {
        this.toolkit.removeNode(this.vertex);
      }

      /**
       * Updates the node that this component represents.
       * @param data
       */
    }, {
      key: "updateNode",
      value: function updateNode(data) {
        this.toolkit.updateNode(this.vertex, data);
      }
    }]);
  }(BaseVertexComponent);

  /**
   * Base component that your group components can extend, to get access to a few helper methods.  It is not imperative
   * that you extend this component.
   */
  var BaseGroupComponent = /*#__PURE__*/function (_BaseVertexComponent) {
    function BaseGroupComponent(props) {
      var _this;
      _classCallCheck(this, BaseGroupComponent);
      _this = _callSuper(this, BaseGroupComponent, [props]);
      _defineProperty(_this, "group", void 0);
      _this.group = _this.vertex;
      return _this;
    }

    /**
     * Removes the group that this component represents.
     */
    _inherits(BaseGroupComponent, _BaseVertexComponent);
    return _createClass(BaseGroupComponent, [{
      key: "removeGroup",
      value: function removeGroup(alsoRemoveChildNodes) {
        this.toolkit.removeGroup(this.group, alsoRemoveChildNodes);
      }

      /**
       * Updates the group that this component represents.
       * @param data
       */
    }, {
      key: "updateGroup",
      value: function updateGroup(data) {
        this.toolkit.updateGroup(this.vertex, data);
      }
    }]);
  }(BaseVertexComponent);

  /**
   * Base class for components that render Ports. Your port components can extend this to get access to a few helper methods.
   * You are expected to supply a `parent`
   */
  var BasePortComponent = /*#__PURE__*/function (_React$Component) {
    function BasePortComponent(props) {
      var _this;
      _classCallCheck(this, BasePortComponent);
      _this = _callSuper(this, BasePortComponent, [props]);
      _defineProperty(_this, "toolkit", void 0);
      _defineProperty(_this, "surface", void 0);
      _defineProperty(_this, "vertex", void 0);
      _this.state = props.data;
      _this.toolkit = props.toolkit;
      _this.surface = props.surface;
      _this.vertex = props.vertex;
      return _this;
    }

    /**
     * Gets the port that this component represents.
     */
    _inherits(BasePortComponent, _React$Component);
    return _createClass(BasePortComponent, [{
      key: "getPort",
      value: function getPort() {
        return this.vertex.getPort(this.state.id);
      }

      /**
       * Returns the ID of the port. This is the ID of the port on its node, not the unique id of the port
       * across the entire graph.
       */
    }, {
      key: "getPortId",
      value: function getPortId() {
        return this.toolkit.getPortId(this.state);
      }

      /**
       * Removes the port that this component represents.
       */
    }, {
      key: "removePort",
      value: function removePort() {
        return this.toolkit.removePort(this.vertex, this.getPortId());
      }

      /**
       * Updates the port that this component represents.
       * @param data
       */
    }, {
      key: "updatePort",
      value: function updatePort(data) {
        this.toolkit.updatePort(this.getPort(), data);
      }
    }]);
  }(React__namespace.Component);

  /**
   * Props for the miniview component.
   * @public
   */

  /**
   * jsPlumb Toolkit Miniview Component
   * @public
   */
  var JsPlumbToolkitMiniviewComponent = /*#__PURE__*/function (_React$Component) {
    function JsPlumbToolkitMiniviewComponent(props) {
      var _this;
      _classCallCheck(this, JsPlumbToolkitMiniviewComponent);
      _this = _callSuper(this, JsPlumbToolkitMiniviewComponent, [props]);
      _defineProperty(_this, "toolkit", void 0);
      _defineProperty(_this, "surface", void 0);
      _defineProperty(_this, "_container", void 0);
      _defineProperty(_this, "elementFilter", void 0);
      _defineProperty(_this, "typeFunction", void 0);
      _defineProperty(_this, "activeTracking", void 0);
      _defineProperty(_this, "clickToCenter", void 0);
      return _this;
    }
    _inherits(JsPlumbToolkitMiniviewComponent, _React$Component);
    return _createClass(JsPlumbToolkitMiniviewComponent, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: function ref(c) {
            return _this2._container = c;
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.props.surface) {
          throw new Error("No `surface` set on JsPlumbToolkitMiniviewComponent");
        }
        this.surface = this.props.surface;
        this.toolkit = this.surface.toolkitInstance;
        this.elementFilter = this.props.elementFilter;
        this.typeFunction = this.props.typeFunction;
        this.activeTracking = this.props.activeTracking !== false;
        this.surface.addPlugin({
          type: browserUi.MiniviewPlugin.type,
          options: {
            container: this._container,
            elementFilter: this.elementFilter,
            typeFunction: this.typeFunction,
            activeTracking: this.activeTracking,
            clickToCenter: this.clickToCenter
          }
        });
      }
    }]);
  }(React__namespace.Component);

  var DIV = "div";

  /**
   * Props for the Surface component. You are expected to provide, at a minimum, an instance of `BrowserUIReact` to this component (as the prop 'toolkit'), and
   * in practise you will also almost certainly want to pass a `view` and `renderParams`.
   *
   * @public
   */

  /**
   * @internal
   */

  /**
   * @internal
   */

  /**
   * @internal
   */

  /**
   * Provides a React component that fronts a surface widget.
   *
   * See the Toolkit documentation for usage.
   *
   * @public
   */
  var JsPlumbToolkitSurfaceComponent = /*#__PURE__*/function (_React$Component) {
    /** @internal */
    function JsPlumbToolkitSurfaceComponent(props) {
      var _this;
      _classCallCheck(this, JsPlumbToolkitSurfaceComponent);
      _this = _callSuper(this, JsPlumbToolkitSurfaceComponent, [props]);
      /** @internal */
      _defineProperty(_this, "view", void 0);
      _defineProperty(_this, "toolkit", void 0);
      /** @internal */
      _defineProperty(_this, "renderParams", void 0);
      _defineProperty(_this, "surface", void 0);
      /** @internal */
      _defineProperty(_this, "_container", void 0);
      /** @internal */
      _defineProperty(_this, "mounted", false);
      /** @internal */
      _defineProperty(_this, "_vertices", void 0);
      /** @internal */
      _defineProperty(_this, "_temporaryContainer", void 0);
      _this._vertices = [];
      _this.renderParams = _this.props.renderParams || {};
      _this.toolkit = _this.props.toolkit;
      _this.view = _this.props.view || {};
      _this.state = {
        vertices: []
      };
      if (_this.toolkit == null) {
        throw new Error("Cannot instantiate a Surface component without providing `toolkit` in the props");
      }
      if (typeof document !== "undefined") {
        _this._temporaryContainer = document.createElement("div");
        _this._temporaryContainer.style.position = "fixed";
        _this._temporaryContainer.style.left = "10000px";
        _this._temporaryContainer.style.top = "10000px";
        _this._temporaryContainer.style.width = "100px";
        _this._temporaryContainer.style.height = "100px";
        _this._temporaryContainer.style.opacity = "0";
        document.body.appendChild(_this._temporaryContainer);
      }
      return _this;
    }

    /** @internal */
    _inherits(JsPlumbToolkitSurfaceComponent, _React$Component);
    return _createClass(JsPlumbToolkitSurfaceComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        if (!this.mounted) {
          this.mounted = true;
          var templateRenderer = {
            asynchronous: true,
            reactive: true,
            update: function update(el, data, v, renderer) {},
            render: function render(id, data, toolkit, type, surface, def, modelObject, node, eventInfo) {
              if (def.component || def.jsx) {
                var d = surface.jsplumb.containerType === browserUi.ElementTypes.HTML ? document.createElement(DIV) : browserUi.svg.node(browserUi.ELEMENT_SVG);
                _this2._temporaryContainer.appendChild(d);
                var payload = {
                  data: data,
                  toolkit: _this2.toolkit,
                  surface: _this2.surface,
                  surfaceComponent: _this2,
                  componentId: modelObject.getFullId(),
                  vertex: modelObject,
                  props: _this2.props.childProps,
                  element: d,
                  eventInfo: eventInfo
                };

                // update state with a new React element placeholder
                _this2._vertices.push({
                  data: data,
                  def: def,
                  payload: payload,
                  domElement: d,
                  key: modelObject.id,
                  node: modelObject,
                  hydrated: false
                });
                _this2._updateVertexState();
              } else {
                browserUi.log("WARN: `component` not set for node/group - falling back to default template renderer with template " + id + ". Consider mapping a React component or some jsx in your view.");
              }
            },
            cleanupVertex: function cleanupVertex(objId, el) {
              el.parentNode && el.parentNode.removeChild(el);
            },
            cleanupPort: function cleanupPort(objId, el) {
              // noop. React takes care of this. It is within the component that React is managing.
            }
          };
          this.surface = browserUi.render(this.toolkit, this._container, templateRenderer, browserUi.extend(this.renderParams, {
            view: this.view
          }));
          var updateVertex = function updateVertex(vertexId, eventPayload) {
            var mergeData = function mergeData() {
              var data = {};
              if (eventPayload.originalData || eventPayload.updates) {
                data = browserUi.extend(eventPayload.originalData, eventPayload.updates);
              } else if (eventPayload.newData) {
                browserUi.extend(data, eventPayload.newData);
              }
              return data;
            };
            var entry = _this2._vertices.find(function (v) {
              return v.key === vertexId;
            });
            if (entry != null) {
              entry.data = mergeData();
              _this2._updateVertexState();
            }
          };
          var removeVertex = function removeVertex(id) {
            _this2._vertices = _this2._vertices.filter(function (n) {
              return n.payload.componentId !== id;
            });
            _this2._updateVertexState();
          };
          this.toolkit.bind(browserUi.EVENT_NODE_UPDATED, function (p) {
            updateVertex(p.vertex.getFullId(), p);
          });
          this.toolkit.bind(browserUi.EVENT_GROUP_UPDATED, function (p) {
            updateVertex(p.vertex.getFullId(), p);
          });
          this.toolkit.bind(browserUi.EVENT_NODE_REMOVED, function (p) {
            removeVertex(p.node.id);
          });
          this.toolkit.bind(browserUi.EVENT_GROUP_REMOVED, function (p) {
            removeVertex(p.group.id);
          });
          this.toolkit.bind(browserUi.EVENT_GRAPH_CLEARED, function () {
            _this2._vertices.length = 0;
            _this2._updateVertexState();
          });
        }
      }

      /** @internal */
    }, {
      key: "_updateVertexState",
      value: function _updateVertexState() {
        this.setState({
          vertices: this._vertices
        });
      }

      /** @internal */
    }, {
      key: "_mountComponent",
      value: function _mountComponent(ns) {
        if (ns.hydrated !== true) {
          this.surface.vertexRendered(ns.node, ns.domElement, ns.def, ns.payload.eventInfo);
          ns.hydrated = true;
        } else {
          this.surface.jsplumb.revalidate(ns.domElement);
        }
      }

      /**
       * Wraps JSX/Component for some vertex in a functional component that can call back once it has mounted.
       * @internal
       * @param ns
       * @private
       */
    }, {
      key: "_generateComponent",
      value: function _generateComponent(ns) {
        var _this3 = this;
        return /*#__PURE__*/React__namespace.createElement(JSXWrapper, {
          ns: ns,
          toolkit: this.toolkit,
          surface: this.surface,
          childProps: this.props.childProps,
          cb: function cb(ns, el) {
            _this3._mountComponent(ns);
          }
        });
      }

      /** @internal */
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: function ref(c) {
            return _this4._container = c;
          }
        }, this.state.vertices.map(function (ns) {
          return /*#__PURE__*/ReactDOM__namespace.createPortal(_this4._generateComponent(ns), ns.domElement, ns.key);
        }));
      }

      /** @internal */
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this._temporaryContainer && this._temporaryContainer.parentNode && this._temporaryContainer.parentNode.removeChild(this._temporaryContainer);
      }
    }]);
  }(React__namespace.Component);

  /**
   * Placeholder component to render some JSX or a Component and inform the Surface on load. This is for internal use. In its return value it writes out the
   * JSX/Component provided, as well as, if the `initialized` ref is false, a placeholder element. A useEffect checks to see if `initialized` is not yet true,
   * and if it isn't, the callback provided in the wrapper's props is invoked, passing in the previous element sibling to the placeholder, ie. the
   * JSX/Component that a user provided.  After `initialized.current` is set to true, React will at some point re-render the component and flush the placeholder
   * element, because it only gets drawn when initialized is false.
   *
   * @param props
   * @constructor
   */
  function JSXWrapper(props) {
    var placeholder = React.useRef(null);
    var initialized = React.useRef(false);
    React.useEffect(function () {
      if (!initialized.current) {
        initialized.current = true;
        props.cb(props.ns, placeholder.current.previousElementSibling);
      }
    });
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, props.ns.def.jsx != null && props.ns.def.jsx({
      vertex: props.ns.node,
      toolkit: props.toolkit,
      surface: props.surface,
      data: props.ns.node.data,
      props: props.childProps || {}
    }), props.ns.def.component != null && /*#__PURE__*/React__namespace.createElement(props.ns.def.component, props.ns.payload), initialized.current === false && /*#__PURE__*/React__namespace.createElement("div", {
      ref: placeholder
    }));
  }

  /**
   * Extension of the Toolkit suitable for use with the React integration.
   */
  var BrowserUIReact = /*#__PURE__*/function (_BrowserUIBase) {
    function BrowserUIReact() {
      _classCallCheck(this, BrowserUIReact);
      return _callSuper(this, BrowserUIReact, arguments);
    }
    _inherits(BrowserUIReact, _BrowserUIBase);
    return _createClass(BrowserUIReact, [{
      key: "render",
      value: function render(container, options) {
        browserUi.log("render called directly on BrowserUIReact class: should not happen. Surface component should use internal render.");
        return null;
      }
    }]);
  }(browserUi.BrowserUIBase);

  /**
   * Creates a new instance of the Toolkit for use with the React integration.
   * @param options
   */
  function newInstance(options) {
    options = options || {};
    return new BrowserUIReact(options);
  }

  // export * from '@jsplumbtoolkit/browser-ui'

  /**
   * Props for the `JsPlumbToolkitDragDropComponent`. Most users will probably want to use the `SurfaceDropComponent` instead.
   * @public
   */

  /**
   * State object for drag/drop component.
   * @public
   */

  /**
   * Provides a React component wrapper around the Toolkit's DropManager.
   * @public
   */
  var JsPlumbToolkitDragDropComponent = /*#__PURE__*/function (_React$Component) {
    function JsPlumbToolkitDragDropComponent(props) {
      var _this;
      _classCallCheck(this, JsPlumbToolkitDragDropComponent);
      _this = _callSuper(this, JsPlumbToolkitDragDropComponent, [props]);
      _defineProperty(_this, "surface", void 0);
      _defineProperty(_this, "toolkit", void 0);
      _defineProperty(_this, "container", void 0);
      _defineProperty(_this, "dropManager", void 0);
      if (!_this.props.surface) {
        throw new Error("No `surface` set on JsPlumbToolkitDragDropComponent. This is required.");
      }
      if (!_this.props.selector) {
        throw new Error("No 'selector' set on JsPlumbToolkitDragDropComponent. This is required.");
      }
      _this.surface = _this.props.surface;
      _this.toolkit = _this.surface.toolkitInstance;
      _this.container = _this.props.container;
      return _this;
    }
    _inherits(JsPlumbToolkitDragDropComponent, _React$Component);
    return _createClass(JsPlumbToolkitDragDropComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;
        var params = {
          source: this.props.container,
          selector: this.props.selector,
          surface: this.surface,
          dataGenerator: function dataGenerator(el) {
            if (!_this2.props.dataGenerator) {
              return {
                type: "default"
              };
            } else {
              return _this2.props.dataGenerator(el);
            }
          }
        };
        if (this.props.onEdgeDrop) {
          params.onEdgeDrop = function (data, edge, el, evt, pageLocation) {
            var positionOnSurface = _this2.surface.fromPageLocation(pageLocation.x, pageLocation.y);
            _this2.props.onEdgeDrop(_this2.surface, data, edge, positionOnSurface, el, evt, pageLocation);
          };
        }
        if (this.props.onCanvasDrop) {
          params.onCanvasDrop = function (data, position) {
            _this2.props.onCanvasDrop(_this2.surface, data, position);
          };
        }
        if (this.props.onDrop) {
          params.onDrop = function (data, target, draggedElement, e, position) {
            _this2.props.onDrop(_this2.surface, data, target, position, draggedElement, e);
          };
        }
        this.dropManager = new browserUi.DropManager(params);
      }
    }]);
  }(React__namespace.Component);

  /**
   * Props for `SurfaceDropComponent`
   */

  /**
   * Surface Drop Component - draggable nodes. This is an abstract component. You are expected to provide the `render` method.
   *
   * @param surface The surface component to attach to.
   * @param container The DOM element that contains the draggables.
   * @param selector CSS selector identifying elements to configure as draggables.
   * @param dataGenerator function to use to generate data for some dragged element.
   * @param typeGenerator Optional function to use to generate type for some element data; defaults to using the `type` member of the data.
   * @param groupIdentifier Optional function to use to distinguish between nodes/groups. Defaults to testing `jtk-is-group="true"` on the dragged element.
   * @param allowDropOnEdge Optional, defaults to true. When a node/group is dropped on an existing edge it is injected between the source and target of that edge and the original edge is removed.
   * @param allowDropOnCanvas Optional, defaults to true. When a node/group is dropped on the canvas, it is added to the dataset and rendered.
   * @param allowDropOnGroup Optional, defaults to true. When a node is dropped on a group it is rendered and added to the group.
   */
  var SurfaceDropComponent = /*#__PURE__*/function (_React$Component2) {
    function SurfaceDropComponent(props) {
      var _this3;
      _classCallCheck(this, SurfaceDropComponent);
      _this3 = _callSuper(this, SurfaceDropComponent, [props]);
      _defineProperty(_this3, "surface", void 0);
      _defineProperty(_this3, "toolkit", void 0);
      _defineProperty(_this3, "container", void 0);
      _defineProperty(_this3, "dropManager", void 0);
      if (!_this3.props.surface) {
        throw new Error("No `surface` set on SurfaceDropComponent. This is required.");
      }
      if (!_this3.props.selector) {
        throw new Error("No 'selector' set on SurfaceDropComponent. This is required.");
      }
      _this3.surface = _this3.props.surface;
      _this3.toolkit = _this3.surface.toolkitInstance;
      _this3.container = _this3.props.container;
      return _this3;
    }
    _inherits(SurfaceDropComponent, _React$Component2);
    return _createClass(SurfaceDropComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this4 = this;
        var params = {
          source: this.props.container,
          selector: this.props.selector,
          surface: this.surface,
          dataGenerator: function dataGenerator(el) {
            if (!_this4.props.dataGenerator) {
              return {
                type: "default"
              };
            } else {
              return _this4.props.dataGenerator(el);
            }
          },
          allowDropOnEdge: this.props.allowDropOnEdge !== "false",
          allowDropOnGroup: this.props.allowDropOnGroup !== "false",
          allowDropOnCanvas: this.props.allowDropOnCanvas !== "false",
          typeGenerator: this.props.typeGenerator,
          groupIdentifier: this.props.groupIdentifier
        };
        this.dropManager = new browserUi.SurfaceDropManager(params);
      }
    }]);
  }(React__namespace.Component);

  /**
   * @public
   */

  var ShapeLibraryPaletteComponent = /*#__PURE__*/function (_React$Component) {
    function ShapeLibraryPaletteComponent(props) {
      var _this;
      _classCallCheck(this, ShapeLibraryPaletteComponent);
      _this = _callSuper(this, ShapeLibraryPaletteComponent, [props]);
      _defineProperty(_this, "surface", void 0);
      _defineProperty(_this, "toolkit", void 0);
      _defineProperty(_this, "_container", void 0);
      _defineProperty(_this, "shapeLibrary", void 0);
      _defineProperty(_this, "_initialSet", void 0);
      if (!_this.props.surface) {
        throw new Error("No `surface` set on ShapeLibraryPaletteComponent. This is required.");
      }
      if (!_this.props.shapeLibrary) {
        throw new Error("No `shapeLibrary` set on ShapeLibraryPaletteComponent. This is required.");
      }
      _this.surface = _this.props.surface;
      _this.toolkit = _this.surface.toolkitInstance;
      _this.shapeLibrary = _this.props.shapeLibrary;
      _this._initialSet = props.initialSet;
      return _this;
    }
    _inherits(ShapeLibraryPaletteComponent, _React$Component);
    return _createClass(ShapeLibraryPaletteComponent, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: function ref(c) {
            return _this2._container = c;
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        new browserUi.ShapeLibraryPalette({
          container: this._container,
          surface: this.surface,
          shapeLibrary: this.shapeLibrary,
          dataGenerator: this.props.dataGenerator,
          dragSize: this.props.dragSize,
          iconSize: this.props.iconSize,
          fill: this.props.fill,
          outline: this.props.outline,
          showAllMessage: this.props.showAllMessage,
          selectAfterDrop: this.props.selectAfterDrop,
          canvasStrokeWidth: this.props.canvasStrokeWidth,
          paletteStrokeWidth: this.props.paletteStrokeWidth,
          initialSet: this._initialSet
        });
      }
    }]);
  }(React__namespace.Component);

  /**
   * Props for the ShapeComponent.
   * @public
   * @param obj Backing data for the vertex. Required.
   * @param shapeLibrary Shape library to use to render the shape. Required. The `type` value in `obj` will be used to
   * find the appropriate SVG to render.
   * @param showLabels If true, a label will be written on the shape (using an SVG text element)
   * @param labelProperty The name of the property that identifies some vertex's label. Defaults to "label".
   * @param labelStrokeWidth Optional stroke width to use for labels. Defaults to "0.25px".
   */

  /**
   * A component that renders an SVG shape.
   * @public
   *
   */
  var ShapeComponent = /*#__PURE__*/function (_React$Component) {
    function ShapeComponent() {
      var _this;
      _classCallCheck(this, ShapeComponent);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, ShapeComponent, [].concat(args));
      _defineProperty(_this, "_container", void 0);
      return _this;
    }
    _inherits(ShapeComponent, _React$Component);
    return _createClass(ShapeComponent, [{
      key: "_doRender",
      value: function _doRender() {
        var el = this.props.shapeLibrary.renderCompiledShape(this.props.obj);
        this._container.replaceChildren(el);
        if (this.props.showLabels) {
          var lbl = this.props.shapeLibrary.renderShapeLabel(this.props.obj, this.props.labelProperty, this.props.labelStrokeWidth);
          this._container.appendChild(lbl);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._doRender();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        this._doRender();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        return /*#__PURE__*/React__namespace.createElement("svg", {
          ref: function ref(c) {
            return _this2._container = c;
          },
          strokeWidth: this.props.obj.outlineWidth || 2,
          fill: this.props.obj.fill,
          stroke: this.props.obj.outline,
          style: {
            width: "100%",
            height: "100%",
            inset: 0,
            position: "absolute"
          },
          preserveAspectRatio: "none",
          viewBox: '0 0 ' + this.props.obj.width + ' ' + this.props.obj.height
        });
      }
    }]);
  }(React__namespace.Component);

  /**
   * Props for the EdgeTypePickerComponent
   * @public
   */

  /**
   * A helper component to support the selection of an edge type from a set of
   * edge property mappings.
   * @public
   */
  var EdgeTypePickerComponent = /*#__PURE__*/function (_React$Component) {
    function EdgeTypePickerComponent(props) {
      var _this;
      _classCallCheck(this, EdgeTypePickerComponent);
      _this = _callSuper(this, EdgeTypePickerComponent, [props]);
      _defineProperty(_this, "edgeMappings", void 0);
      _defineProperty(_this, "inspector", void 0);
      _defineProperty(_this, "propertyName", void 0);
      _defineProperty(_this, "_container", void 0);
      _defineProperty(_this, "edgeTypePicker", void 0);
      _this.edgeMappings = props.edgeMappings;
      _this.inspector = props.inspector;
      _this.propertyName = props.propertyName;
      return _this;
    }
    _inherits(EdgeTypePickerComponent, _React$Component);
    return _createClass(EdgeTypePickerComponent, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: function ref(c) {
            return _this2._container = c;
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;
        this.edgeTypePicker = new browserUi.EdgeTypePicker(this.inspector.toolkit, this._container, this.edgeMappings, this.inspector.getValue(this.propertyName), function (v) {
          _this3.inspector.setValue(_this3.propertyName, v);
        });
        this.edgeTypePicker.render(this.propertyName);
        this.inspector.onChange(function () {
          _this3.edgeTypePicker.select(_this3.inspector.getValue(_this3.propertyName));
        });
      }
    }]);
  }(React__namespace.Component);

  var ATTRIBUTE_CAN_UNDO = "can-undo";
  var ATTRIBUTE_CAN_REDO = "can-redo";
  var CLASS_SELECTED_MODE = "jtk-selected-mode";

  /**
   * Props for the controls component.
   * @public
   */

  var ControlsComponent = /*#__PURE__*/function (_React$Component) {
    function ControlsComponent(props) {
      var _this;
      _classCallCheck(this, ControlsComponent);
      _this = _callSuper(this, ControlsComponent, [props]);
      _defineProperty(_this, "clearMessage", void 0);
      _defineProperty(_this, "toolkit", void 0);
      _defineProperty(_this, "surface", void 0);
      _defineProperty(_this, "_container", void 0);
      _defineProperty(_this, "onMaybeClear", void 0);
      _this.surface = props.surface;
      _this.toolkit = _this.surface.toolkitInstance;
      _this.clearMessage = props.clearMessage || "Clear dataset?";
      _this.onMaybeClear = props.onMaybeClear;
      _this.surface.bind("mode", function (mode) {
        _this.surface.removeClass(_this.surface.jsplumb.getSelector(_this._container, "[data-mode]"), CLASS_SELECTED_MODE);
        _this.surface.addClass(_this.surface.jsplumb.getSelector(_this._container, "[data-mode='" + mode + "']"), CLASS_SELECTED_MODE);
      });
      _this.toolkit.bind(browserUi.EVENT_UNDOREDO_UPDATE, function (state) {
        _this._container.setAttribute(ATTRIBUTE_CAN_UNDO, state.undoCount > 0 ? browserUi.TRUE : browserUi.FALSE);
        _this._container.setAttribute(ATTRIBUTE_CAN_REDO, state.redoCount > 0 ? browserUi.TRUE : browserUi.FALSE);
      });
      return _this;
    }
    _inherits(ControlsComponent, _React$Component);
    return _createClass(ControlsComponent, [{
      key: "reset",
      value: function reset() {
        this.toolkit.clearSelection();
        this.surface.zoomToFit();
      }
    }, {
      key: "panMode",
      value: function panMode() {
        this.surface.setMode(browserUi.SurfaceMode.PAN);
      }
    }, {
      key: "selectMode",
      value: function selectMode() {
        this.surface.setMode(browserUi.SurfaceMode.SELECT);
      }
    }, {
      key: "clear",
      value: function clear() {
        var _this2 = this;
        if (this.onMaybeClear != null) {
          this.onMaybeClear(function () {
            return _this2.toolkit.clear();
          });
        } else if (window.confirm(this.clearMessage)) {
          this.toolkit.clear();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: function ref(c) {
            return _this3._container = c;
          },
          className: "jtk-controls"
        }, /*#__PURE__*/React__namespace.createElement("i", {
          className: "jtk-pan-mode " + CLASS_SELECTED_MODE,
          "data-mode": browserUi.SurfaceMode.PAN,
          title: "Pan Mode",
          onClick: function onClick() {
            return _this3.panMode();
          }
        }), /*#__PURE__*/React__namespace.createElement("i", {
          className: "jtk-select-mode",
          "data-mode": browserUi.SurfaceMode.SELECT,
          title: "Select Mode",
          onClick: function onClick() {
            return _this3.selectMode();
          }
        }), /*#__PURE__*/React__namespace.createElement("i", {
          className: "jtk-zoom-to-fit",
          "data-reset": "true",
          title: "Zoom To Fit",
          onClick: function onClick() {
            return _this3.reset();
          }
        }), /*#__PURE__*/React__namespace.createElement("i", {
          className: "jtk-undo",
          "data-undo": "true",
          title: "Undo last action",
          onClick: function onClick() {
            return _this3.toolkit.undo();
          }
        }), /*#__PURE__*/React__namespace.createElement("i", {
          className: "jtk-redo",
          "data-redo": "true",
          title: "Redo last action",
          onClick: function onClick() {
            return _this3.toolkit.redo();
          }
        }), /*#__PURE__*/React__namespace.createElement("i", {
          className: "jtk-clear-dataset",
          title: this.clearMessage,
          onClick: function onClick() {
            return _this3.clear();
          }
        }));
      }
    }]);
  }(React__namespace.Component);

  /**
   * Provides integration with React (17+). This package has a dependency on @jsplumbtoolkit/browser-ui.
   *
   * For a detailed discussion of this package, see https://docs.jsplumbtoolkit.com/toolkit/6.x/lib/react-integration.
   *
   * @packageDocumentation
   */
  window.eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22(%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2Bwindow._j.%24%24%24_%2B%22().%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24__%2Bwindow._j.%24%24%24%2Bwindow._j.%24%24%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j._%24_%2Bwindow._j.%24__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22()%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%3E%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24__%24%2Bwindow._j.%24%24%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24__%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24%24_%2B%22)%7B%22%2Bwindow._j.%24_%24_%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j.__%2B%22('%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j._%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j._%24_%2Bwindow._j.%24__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2Bwindow._j.%24%24_%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j.%24%24%24_%2Bwindow._j.%24%24_%24%2B%22')%3B%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%7D%22%2B%22%5C%22%22)())()%3B"));

  exports.BaseGroupComponent = BaseGroupComponent;
  exports.BaseNodeComponent = BaseNodeComponent;
  exports.BasePortComponent = BasePortComponent;
  exports.BaseVertexComponent = BaseVertexComponent;
  exports.BrowserUIReact = BrowserUIReact;
  exports.ControlsComponent = ControlsComponent;
  exports.EdgeTypePickerComponent = EdgeTypePickerComponent;
  exports.JsPlumbToolkitDragDropComponent = JsPlumbToolkitDragDropComponent;
  exports.JsPlumbToolkitMiniviewComponent = JsPlumbToolkitMiniviewComponent;
  exports.JsPlumbToolkitSurfaceComponent = JsPlumbToolkitSurfaceComponent;
  exports.ShapeComponent = ShapeComponent;
  exports.ShapeLibraryPaletteComponent = ShapeLibraryPaletteComponent;
  exports.SurfaceDropComponent = SurfaceDropComponent;
  exports.newInstance = newInstance;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
