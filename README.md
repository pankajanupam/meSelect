# meSelect
ADA compliance custom select dropdown
No dependencies needed.

<!-- [![Build Status](https://travis-ci.org/meselect/meselect.svg?branch=master)](https://travis-ci.org/meselect/meselect) -->
[![npm](https://img.shields.io/npm/v/meselect.svg)](https://www.npmjs.com/package/meselect)
[![npm](https://img.shields.io/npm/dm/meselect.svg)](https://www.npmjs.com/package/meselect)
[![bundlephobia](https://img.shields.io/bundlephobia/min/meselect?style=plastic)](https://www.npmjs.com/package/meselect)
[![license](https://img.shields.io/github/license/pankajanupam/meselect?style=plastic)](https://www.npmjs.com/package/meselect)

## Install

Install with npm (recommended)
```
$ npm install --save meselect
```
## Use

With ES6 modules via the `import` statement:
```js
import meSelect from 'meSelect';
```

## How it works
```html
<div class="meselect-box-wrapper" data-name="month" data-replaceplaceholder="false">
    <span id="aria_select__month" class="meselect-hide"></span>
    <button aria-haspopup="listbox" aria-labelledby="aria_select__month" class="meselect-box">
        <span>
            Months
        </span>
    </button>
    <ul tabindex="-1" role="listbox" aria-labelledby="aria_select__month" class="meselect-hide meselect-box-list"
        aria-activedescendant="05">
        <li role="option" data-value="01">Jan</li>
        <li role="option" data-value="02">Feb</li>
        <li role="option" data-value="03">March</li>
        <li role="option" data-value="04">April</li>
        <li role="option" data-value="05">May</li>
        <li role="option" data-value="06">Jun</li>
        <li role="option" data-value="07">July</li>
        <li role="option" data-value="08">Aug</li>
        <li role="option" data-value="09">Sep</li>
        <li role="option" data-value="10">Oct</li>
        <li role="option" data-value="11">Nov</li>
        <li role="option" data-value="12">Dec</li>
    </ul>
</div>
```