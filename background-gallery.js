/**
* Background Gallery
* Version: Development version
* Author: Konstantinos Kataras
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
        galleryTimer: 5000,
        imageLoaderThreshold: 300
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

    // Background Gallery Item Constructor
    function BackgroundGalleryGenerator (options) {
        this.id = options.id || null;
        this.backgrounds = options.backgrounds || null;
        this.galleryTimer = options.galleryTimer || defaultOptions.galleryTimer;
        this.containerElement = options.containerElement || document.getElementById(this.id);
        this.galleryPointer = 0;
        this.galleryLength = this.backgrounds.length;
        this.imageLoader = 0;
        this.defaultBackground = (this.containerElement.style.backgroundImage !== '');
        this.interval = null;

        this.onFullyLoaded = options.onFullyLoaded || function () {};

        this.addLoader();
        this.loadImages();
    }

    BackgroundGalleryGenerator.prototype.onAllImagesLoaded = function () {
        this.containerElement.getElementsByClassName('loader')[0].style.display = 'none';
        this.startInterval();
    };

    BackgroundGalleryGenerator.prototype.startInterval = function () {
        var that = this;
        this.interval = setInterval(function () {
            that.changeBackground('next');
        }, this.galleryTimer);
    };

    BackgroundGalleryGenerator.prototype.addLoader = function () {
        this.containerElement.innerHTML = this.containerElement.innerHTML + '<span class="loader"></span>';
    };

    BackgroundGalleryGenerator.prototype.changeBackground = function (trend) {
        if (trend === 'next') {
            if (this.galleryPointer + 1 === this.galleryLength) {
                this.galleryPointer = 0;
            } else {
                this.galleryPointer += 1;
            }
        } else {
            if (this.galleryPointer - 1 === -1) {
                this.galleryPointer = this.galleryLength - 1;
            } else {
                this.galleryPointer -= 1;
            }
        }

        this.containerElement.style.backgroundImage = 'url(' + this.backgrounds[this.galleryPointer].url + ')';

    };

    BackgroundGalleryGenerator.prototype.onImageLoaded = function () {
        this.imageLoader += 1;
    };

    BackgroundGalleryGenerator.prototype.loadImages = function () {
        var galleriesLength = this.backgrounds.length,
            i;

        for (i = 0; i < galleriesLength; i += 1) {
            this.loadImage(this.backgrounds[i], i);
        }

    };

    BackgroundGalleryGenerator.prototype.loadImage = function (path, i) {
        var img = new Image(),
            imgObj = {},
            that = this;

        img.onload = function() {
            imgObj.width = img.width;
            imgObj.height = img.height;
            imgObj.ratio = imgObj.width / imgObj.height;
            imgObj.url = path;
            that.backgrounds[i] = imgObj;
            that.onImageLoaded();
            if (i === 0 && !that.defaultBackground) {
                that.containerElement.style.backgroundImage = 'url("' + img.src + '")';
            }
            if (that.imageLoader === that.backgrounds.length) {
                that.onAllImagesLoaded();
            }
        };

        img.src = path;
    };

    function getCleanedBackground (path) {
        var reg1 = /'|"|url|\s|\(|\)/g;
        return path.replace(reg1, '');
    }

    function getSrcFromImages (containerElement) {
        var images = containerElement.querySelectorAll('[data-bg-src]'),
            length = images.length,
            defaultBackground = containerElement.style.backgroundImage,
            srcArray = [];

        if (defaultBackground !== '') {
            srcArray.push(getCleanedBackground(defaultBackground));
        }

        for (var i = 0; i < length; i += 1) {
            srcArray.push(images[i].getAttribute('data-bg-src'));
        }

        return srcArray;
    }

    function autoOptionsFactory (i) {
        var containerElement = autoBackgroungGalleryElements[i];

        return {
            id: 'autoElem' + i,
            containerElement: containerElement,
            backgrounds: getSrcFromImages(containerElement)
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
