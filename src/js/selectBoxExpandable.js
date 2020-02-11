/**
 * ADA compliance custom select dropdown
 */

import Listbox from './selectBox';

const HIDE = 'meselect-hide';
//   var listboxButton = new this.ListboxButton(listButton, new this.Listbox(listElem));

export default class ListboxButton extends Listbox {
  constructor(button, listboxElem) {
    super(listboxElem);
    this.button = button;
    this.registerEvents();
  };

  registerEvents() {
    super.registerEvents();
    this.button.addEventListener('click', this.showListbox.bind(this));
    this.button.addEventListener('keyup', this.checkShow.bind(this));
    this.listboxNode.addEventListener('blur', this.hideListbox.bind(this));
    this.listboxNode.addEventListener('keydown', this.checkHide.bind(this));
    this.setHandleFocusChange(this.onFocusChange.bind(this));
  };

  checkShow(evt) {
    var key = evt.which || evt.keyCode;

    switch (key) {
      case this.KeyCode.UP:
      case this.KeyCode.DOWN:
        evt.preventDefault();
        this.showListbox();
        this.checkKeyPress(evt);
        break;
    }
  };

  checkHide(evt) {
    var key = evt.which || evt.keyCode;

    switch (key) {
      case this.KeyCode.RETURN:
      case this.KeyCode.ESC:
        evt.preventDefault();
        this.hideListbox();
        this.button.focus();
        break;
    }
  };

  showListbox() {
    Listbox.removeClass(this.listboxNode, HIDE);
    this.button.setAttribute('aria-expanded', 'true');
    this.listboxNode.focus();
  };

  hideListbox() {
    setTimeout((elem => {
      Listbox.addClass(elem.listboxNode, HIDE);
      elem.button.removeAttribute('aria-expanded');
    }).bind(null, this), 190);
  };

  onFocusChange(focusedItem) {
    this.button.innerText = focusedItem.innerText;
  };
}