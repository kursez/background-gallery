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
        defaultOptions,
        items = [];

    errorTexts = {
        alreadyDefined: 'BackgroundGallery is already defined, exit loading'
    };

    defaultOptions = {
        galleryTimer: 5000,
        imageLoaderThreshold: 300
    };

    BackgroundGallery = {
        generate: function (options) {
            items[options.id] = new BackgroundGalleryGenerator(options);
        },
        pauseGalleryById: function (galleryId) {
            items[galleryId].pause();
        },
        resumeGalleryById: function (galleryId) {
            items[galleryId].resume();
        },
        pauseAllGalleries: function () {
            itemIterator(function (item) {
                item.pause();
            });
        },
        resumeAllGalleries: function () {
            itemIterator(function (item) {
                item.resume();
            });
        },
        addImageToGallery: function (galleryId, imageSrc) {
            items[galleryId].addImage(imageSrc);
        },
        removeImageFromGallery: function (galleryId, imageSrc) {
            items[galleryId].removeImage(imageSrc);
        },
        logItems: function () {
            console.log(items);
        }
    };

    // Background Gallery Item Constructor
    function BackgroundGalleryGenerator (options) {
        var id = options.id || null,
            backgrounds = options.backgrounds || null,
            galleryTimer = options.galleryTimer || defaultOptions.galleryTimer,
            containerElement = options.containerElement || document.getElementById(id),
            galleryPointer = 0,
            galleryLength = backgrounds.length,
            imageLoader = 0,
            defaultBackground = (containerElement.style.backgroundImage !== ''),
            interval = null,
            autoResizeImages = options.autoResizeImages || true,
            timeToPause = 0,
            changedBGTimestamp = null,
            paused = false,
            resumeTimeout = null;

        this.onFullyLoaded = options.onFullyLoaded || function () {};

        function onAllImagesLoaded () {
            containerElement.getElementsByClassName('loader')[0].style.display = 'none';
            startInterval();
        }

        function startInterval () {
            changedBGTimestamp = new Date();

            interval = setInterval(function () {
                changeBackground('next');
            }, galleryTimer);
        }

        function calculateTimeToPause () {
            timeToPause = new Date() - changedBGTimestamp + timeToPause;
        }

        function changeBackground (trend) {
            if (trend === 'next') {
                if (galleryPointer + 1 === galleryLength) {
                    galleryPointer = 0;
                } else {
                    galleryPointer += 1;
                }
            } else {
                if (galleryPointer - 1 === -1) {
                    galleryPointer = galleryLength - 1;
                } else {
                    galleryPointer -= 1;
                }
            }

            containerElement.style.backgroundImage = 'url(' + backgrounds[galleryPointer].url + ')';
            changedBGTimestamp = new Date();

        }

        function addLoader () {
            containerElement.innerHTML = containerElement.innerHTML + '<span class="loader"></span>';

        }

        function onImageLoaded () {
            imageLoader += 1;

        }

        function loadImages () {
            var galleriesLength = backgrounds.length,
                i;

            for (i = 0; i < galleriesLength; i += 1) {
                loadImage(backgrounds[i], i);
            }

        }

        function loadImage (path, i) {
            var img = new Image(),
                imgObj = {};

            img.onload = function() {
                imgObj.width = img.width;
                imgObj.height = img.height;
                imgObj.ratio = imgObj.width / imgObj.height;
                imgObj.url = path;
                backgrounds[i] = imgObj;
                onImageLoaded();
                if (i === 0 && !defaultBackground) {
                    containerElement.style.backgroundImage = 'url("' + img.src + '")';
                }
                if (imageLoader === backgrounds.length) {
                    onAllImagesLoaded();
                }
            };

            img.src = path;

        }

        this.pause = function () {
            if (!paused) {
                paused = true;
                calculateTimeToPause();
                clearTimeout(resumeTimeout);
                clearInterval(interval);
            }

        };

        this.resume = function () {
            var timeout;

            if (paused) {
                paused = false;
                timeout = galleryTimer - timeToPause;
                changedBGTimestamp = new Date();

                resumeTimeout = setTimeout(function () {
                    changeBackground('next');
                    timeToPause = 0;
                    startInterval();
                }, timeout);
            }

        };

        this.addImage = function (src) {

        };

        this.removeImage = function (src) {

        };

        addLoader();
        loadImages();

    }

    function getCleanedBackgroundPath (path) {
        var reg1 = /'|"|url|\s|\(|\)/g;
        return path.replace(reg1, '');
    }

    function getSrcFromImages (containerElement) {
        var images = containerElement.querySelectorAll('[data-bg-src]'),
            length = images.length,
            defaultBackground = containerElement.style.backgroundImage,
            srcArray = [];

        if (defaultBackground !== '') {
            srcArray.push(getCleanedBackgroundPath(defaultBackground));
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

    function itemIterator (callback) {
        var id;

        for (id in items) {
            if (callback !== 'undefined') {
                callback(items[id]);
            }
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
