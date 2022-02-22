;(function() {

    var root = this;

    root.jsPlumbSyntaxHighlighter = function(toolkit, selector, exportType, padding) {
        var _syntaxHighlight = function (json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return "<pre>" + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            }) + "</pre>";
        };

        var datasetContainer = typeof selector === "string" ? document.querySelector(selector) : selector;

        var _suspended = false;
        function _suspend() { _suspended = true; }

        var _updateDataset = this.updateDataset = function () {
            if (!_suspended && datasetContainer) {
                datasetContainer.innerHTML = _syntaxHighlight(JSON.stringify(toolkit.exportData({
                    type:exportType || "json"
                }), null, padding || 2));
            }
        };

        function _resume() {
            _suspended = false;
            _updateDataset();
        }

        toolkit.bind("portRenamed", _updateDataset);
        toolkit.bind("dataUpdated", _updateDataset);
        toolkit.bind("dataLoadEnd", function() { setTimeout(_resume, 0); });
        toolkit.bind("dataLoadStart", _suspend);

        _updateDataset();
    }

}).call(this);