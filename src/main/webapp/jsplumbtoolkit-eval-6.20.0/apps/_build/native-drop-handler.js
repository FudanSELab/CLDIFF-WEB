import { consume, EventManager } from "@jsplumbtoolkit/browser-ui";
import { readImageFromFile } from "@jsplumb/canvas-image-processing";
const CLASS_HOVER_DEFAULT = "jtk-native-drop-hover";
const EVENT_DRAG_ENTER = "dragenter";
const EVENT_DRAG_LEAVE = "dragleave";
const EVENT_DRAG_OVER = "dragover";
const EVENT_DROP = "drop";
export class NativeDropHandler {
    hoverClasses;
    surface;
    eventManager;
    constructor(options) {
        this.eventManager = new EventManager();
        this.surface = options.surface;
        this.hoverClasses = [CLASS_HOVER_DEFAULT];
        if (options.hoverClass) {
            this.hoverClasses.push(options.hoverClass);
        }
        const element = options.element || this.surface.getContainer().parentElement;
        const _addClass = (e) => {
            consume(e);
            e.target.classList.add(...this.hoverClasses);
        };
        const enterOptions = [element, EVENT_DRAG_ENTER];
        if (options.selector) {
            enterOptions.push(options.selector);
        }
        enterOptions.push(_addClass);
        this.eventManager.on.apply(this.eventManager, enterOptions);
        const _removeClass = (e) => {
            consume(e);
            e.target.classList.remove(...this.hoverClasses);
        };
        const leaveOptions = [element, EVENT_DRAG_LEAVE];
        if (options.selector) {
            leaveOptions.push(options.selector);
        }
        leaveOptions.push(_removeClass);
        this.eventManager.on.apply(this.eventManager, leaveOptions);
        const _setDropEffect = (e) => {
            consume(e);
            e.dataTransfer.dropEffect = 'copy';
        };
        const copyOptions = [element, EVENT_DRAG_OVER];
        if (options.selector) {
            copyOptions.push(options.selector);
        }
        copyOptions.push(_setDropEffect);
        this.eventManager.on.apply(this.eventManager, copyOptions);
        const dropOptions = [element, EVENT_DROP];
        if (options.selector) {
            dropOptions.push(options.selector);
        }
        dropOptions.push((e) => {
            if (!e.cancelBubble && !e.defaultPrevented) {
                consume(e);
                e.target.classList.remove(...this.hoverClasses);
                options.onDrop(e, e.target, this.surface.getObjectInfo(e.target));
            }
        });
        this.eventManager.on.apply(this.eventManager, dropOptions);
    }
}
export class NativeImageDropHandler {
    handler;
    eventManager;
    constructor(options) {
        this.handler = new NativeDropHandler({
            surface: options.surface,
            element: options.element,
            selector: options.selector,
            hoverClass: options.hoverClass,
            onDrop: (e, el, info) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                const url = e.dataTransfer.getData('text/plain');
                if (url) {
                    const img = new Image();
                    img.onload = function () {
                        options.imageDropped(e, img, el, info);
                    };
                    img.src = url;
                }
                else {
                    if (files[0].type.match(/image.*/)) {
                        readImageFromFile(files[0]).then((img) => {
                            options.imageDropped(e, img, el, info);
                        });
                    }
                }
            }
        });
    }
}
