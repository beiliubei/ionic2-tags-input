var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, forwardRef, EventEmitter, Output, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AlertController, ToastController } from "ionic-angular";
import { noop } from "@angular/core/src/linker/view_utils";
import * as _ from "lodash";
/*
  Generated class for the TagInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
var TagsInputComponent = (function () {
    function TagsInputComponent(alertCtrl, toastCtrl) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.onTagAdded = new EventEmitter();
        this.onTagRemoved = new EventEmitter();
        this.onTagAddClicked = new EventEmitter();
        this.buttonLabel = 'Add';
        this.allowDuplicates = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.values = [];
        this.isDisabled = false;
    }
    TagsInputComponent_1 = TagsInputComponent;
    TagsInputComponent.prototype.writeValue = function (value) {
        this.values = value || [];
        this.values.forEach(function (currentValue, index) {
            currentValue.index = index;
        });
    };
    TagsInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TagsInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    TagsInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    TagsInputComponent.prototype.notifyDataChanged = function (data) {
        data.index = this.values.length;
        if (data.name && !this.checkDuplicatesRestriction(data.name) && !this.checkMaxWordLengthRestriction(data.name)) {
            this.addValue(data);
            return false;
        }
        return true;
    };
    TagsInputComponent.prototype.addItem = function () {
        var _this = this;
        if (this.onTagAddClicked) {
            this.onTagAddClicked.emit(this);
        }
        else {
            this.alertCtrl.create({
                title: this.alertTitleLabel || 'Add item',
                inputs: [
                    {
                        name: 'name',
                        placeholder: this.alertInputPlaceholder || 'Type text'
                    },
                ],
                buttons: [
                    {
                        text: this.alertButtonLabel || 'OK',
                        handler: function (data) {
                            data.index = _this.values.length;
                            if (data.name && !_this.checkDuplicatesRestriction(data.name) && !_this.checkMaxWordLengthRestriction(data.name)) {
                                _this.addValue(data);
                                return true;
                            }
                            return false;
                        }
                    }
                ]
            }).present();
        }
    };
    TagsInputComponent.prototype.checkMaxItemsRestriction = function (index) {
        if (index >= this.maxTags) {
            this.setDisabledState(true);
            return true;
        }
        else {
            this.setDisabledState(false);
            return false;
        }
    };
    TagsInputComponent.prototype.addValue = function (data) {
        this.values.push({ name: data.name, index: data.index });
        this.onTagAdded.emit(data);
        this.checkMaxItemsRestriction(data.index + 1);
    };
    TagsInputComponent.prototype.checkDuplicatesRestriction = function (name) {
        var duplicatesRestrictionError = this.toastCtrl.create({
            message: this.duplicatesRestrictionMsg || 'Error: Duplicates are not allowed',
            duration: 3000
        });
        if (!this.allowDuplicates) {
            if (_.find(this.values, { name: name })) {
                duplicatesRestrictionError.present();
                return true;
            }
        }
        return false;
    };
    TagsInputComponent.prototype.checkMaxWordLengthRestriction = function (name) {
        var maxWordLengthRestrictionError = this.toastCtrl.create({
            message: this.wordLengthRestrictionMsg || 'Error: This word is too long',
            duration: 3000
        });
        if (name.length > this.maxWordLength) {
            maxWordLengthRestrictionError.present();
            return true;
        }
        return false;
    };
    TagsInputComponent.prototype.removeItem = function (index) {
        this.onTagRemoved.emit(this.values[index]);
        this.values.splice(index, 1);
        this.checkMaxItemsRestriction(index);
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TagsInputComponent.prototype, "onTagAdded", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TagsInputComponent.prototype, "onTagRemoved", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TagsInputComponent.prototype, "onTagAddClicked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TagsInputComponent.prototype, "maxTags", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TagsInputComponent.prototype, "buttonLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TagsInputComponent.prototype, "alertTitleLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TagsInputComponent.prototype, "alertInputPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TagsInputComponent.prototype, "alertButtonLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TagsInputComponent.prototype, "wordLengthRestrictionMsg", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TagsInputComponent.prototype, "duplicatesRestrictionMsg", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TagsInputComponent.prototype, "maxWordLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TagsInputComponent.prototype, "allowDuplicates", void 0);
    TagsInputComponent = TagsInputComponent_1 = __decorate([
        Component({
            selector: 'tags-input',
            template: '<button type="button" *ngFor="let value of values; let i=index" ion-button item-right icon-right (click)="removeItem(i)">' +
                '{{ value.name }}' +
                '&nbsp;' +
                '<ion-icon name="close"></ion-icon>' +
                '</button>' +
                '<button type="button" ion-button icon-left outline (click)="addItem()" [disabled]="isDisabled">' +
                '<ion-icon name="add"></ion-icon>' +
                '{{ buttonLabel }}' +
                '</button>',
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return TagsInputComponent_1; }),
                    multi: true
                }],
        }),
        __metadata("design:paramtypes", [AlertController, ToastController])
    ], TagsInputComponent);
    return TagsInputComponent;
    var TagsInputComponent_1;
}());
export { TagsInputComponent };
//# sourceMappingURL=tags-input.component.js.map