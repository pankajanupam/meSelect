/**
 * ARIA Collapsible Dropdown Listbox Example
 * @function onload
 * @desc Initialize the listbox example once the page has loaded
 */

import { aria } from './utils';
import Listbox from './selectBox';

//   var listboxButton = new aria.ListboxButton(listButton, new aria.Listbox(listElem));

export default class ListboxButton {
  constructor(button, listboxElem) {
    this.button = button;
    this.listbox = new Listbox(listboxElem);
    this.registerEvents();
  };

  registerEvents() {
    this.button.addEventListener('click', this.showListbox.bind(this));
    this.button.addEventListener('keyup', this.checkShow.bind(this));
    this.listbox.listboxNode.addEventListener('blur', this.hideListbox.bind(this));
    this.listbox.listboxNode.addEventListener('keydown', this.checkHide.bind(this));
    this.listbox.setHandleFocusChange(this.onFocusChange.bind(this));
  };

  checkShow(evt) {
    var key = evt.which || evt.keyCode;

    switch (key) {
      case aria.KeyCode.UP:
      case aria.KeyCode.DOWN:
        evt.preventDefault();
        this.showListbox();
        this.listbox.checkKeyPress(evt);
        break;
    }
  };

  checkHide(evt) {
    var key = evt.which || evt.keyCode;

    switch (key) {
      case aria.KeyCode.RETURN:
      case aria.KeyCode.ESC:
        evt.preventDefault();
        this.hideListbox();
        this.button.focus();
        break;
    }
  };

  showListbox() {
    aria.Utils.removeClass(this.listbox.listboxNode, 'meselect-hide');
    this.button.setAttribute('aria-expanded', 'true');
    this.listbox.listboxNode.focus();
  };

  hideListbox() {
    aria.Utils.addClass(this.listbox.listboxNode, 'meselect-hide');
    this.button.removeAttribute('aria-expanded');
  };

  onFocusChange(focusedItem) {
    this.button.innerText = focusedItem.innerText;
  };
}