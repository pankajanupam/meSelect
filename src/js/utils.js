export default class Utils {

    constructor() {

        /**
         * @desc
         *  Key code constants
         */
        this.KeyCode = {
            BACKSPACE: 8,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
        }

    }

    // Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    static matches(element, selector) {
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = element.parentNode.querySelectorAll(s);
                    var i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) { }
                    return i > -1;
                };
        }

        return element.matches(selector);
    };

    static remove(item) {
        if (item.remove && typeof item.remove === 'function') {
            return item.remove();
        }
        if (item.parentNode &&
            item.parentNode.removeChild &&
            typeof item.parentNode.removeChild === 'function') {
            return item.parentNode.removeChild(item);
        }
        return false;
    };

    static isFocusable(element) {
        if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
            return true;
        }

        if (element.disabled) {
            return false;
        }

        switch (element.nodeName) {
            case 'A':
                return !!element.href && element.rel != 'ignore';
            case 'INPUT':
                return element.type != 'hidden' && element.type != 'file';
            case 'BUTTON':
            case 'SELECT':
            case 'TEXTAREA':
                return true;
            default:
                return false;
        }
    };

    static getAncestorBySelector(element, selector) {
        if (!Utils.matches(element, selector + ' ' + element.tagName)) {
            // Element is not inside an element that matches selector
            return null;
        }

        // Move up the DOM tree until a parent matching the selector is found
        var currentNode = element;
        var ancestor = null;
        while (ancestor === null) {
            if (Utils.matches(currentNode.parentNode, selector)) {
                ancestor = currentNode.parentNode;
            }
            else {
                currentNode = currentNode.parentNode;
            }
        }

        return ancestor;
    };

    static hasClass(element, className) {
        return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
    };

    static addClass(element, className) {
        if (!Utils.hasClass(element, className)) {
            element.className += ' ' + className;
        }
    };

    static removeClass(element, className) {
        var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(classRegex, ' ').trim();
    };

    static bindMethods(object /* , ...methodNames */) {
        var methodNames = Array.prototype.slice.call(arguments, 1);
        methodNames.forEach(function (method) {
            object[method] = object[method].bind(object);
        });
    };
}
