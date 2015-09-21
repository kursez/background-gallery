/*

    Background Gallery
    Version: Development version
    Author: Konstantinos Kataras

*/

(function(window) {
    "use strict";

    var autoBackgroungGalleryElements = document.querySelectorAll('[data-bg-auto]'),
        aBGELength = autoBackgroungGalleryElements.length,
        BackgroundGallery,
        errorTexts,
        defaultOptions;

    errorTexts = {
          alreadyDefined: 'BackgroundGallery is already defined, exit loading'
    };

    defaultOptions = {
          galleryTimer: 5000
    };

    BackgroundGallery = {
        items: [],
        generate: function (options) {
            this.items[options.id] = new BackgroundGalleryGenerator(options);
        },
        pause: function (id) {

        },
        resume: function (id) {

        }
    };

    function BackgroundGalleryGenerator (options) {
        this.id = options.id || null;
        this.backgrounds = options.backgrounds || null;
        this.galleryTimer = options.galleryTimer || defaultOptions.galleryTimer;
        this.containerElement = options.containerElement || document.getElementById(this.id);

        this.onFullyLoaded = options.onFullyLoaded || function () {};

    }

    BackgroundGalleryGenerator.prototype.init = function () {

    };

    function getSrcFromImages (images) {
        var length = images.length,
            srcArray = [];

        for (var i = 0; i < length; i += 1) {
            srcArray.push(images[i].getAttribute('src'));
        }

        return srcArray;
    }

    function autoOptionsFactory (i) {
        var containerElement = autoBackgroungGalleryElements[i];

        return {
            id: 'autoElem' + i,
            containerElement: containerElement,
            backgrounds: getSrcFromImages(containerElement.querySelectorAll('img'))
        }
    }

    if (aBGELength > 0) {
        for (var i = 0; i < aBGELength; i += 1) {
            BackgroundGallery.generate(autoOptionsFactory(i));
        }
    }

    if (typeof window.BackgroundGallery === 'undefined') {
        window.BackgroundGallery = BackgroundGallery;
    } else {
        console.error(errorTexts.alreadyDefined);
    }

})(window);
