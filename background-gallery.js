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
        addImageToGallery: function (galleryId, imageSrc, useForce) {
            items[galleryId].addImage(imageSrc, useForce);
        },
        removeImageFromGallery: function (galleryId, imageSrc, type) {
            items[galleryId].removeImage(imageSrc, type);
        },
        setOnFullyLoaded: function (galleryId, callback) {
            items[galleryId].onFullyLoaded = callback;
        },
        logItems: function () { // for development purposes
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
            imageLoader = 0,
            defaultBackground = (containerElement.style.backgroundImage !== ''),
            interval = null,
            autoResizeImages = options.autoResizeImages || true,
            timeToPause = 0,
            changedBGTimestamp = null,
            paused = false,
            resumeTimeout = null,
            fullyLoaded = false;

        function onAllImagesLoaded () {
            containerElement.getElementsByClassName('loader')[0].style.display = 'none';
            startInterval();
            if (!fullyLoaded) {
                fullyLoaded = true;
                this.onFullyLoaded();
            }
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
            var galleryLength = backgrounds.length;

            if (trend === 'next') {
                if (galleryPointer + 1 >= galleryLength) {
                    galleryPointer = 0;
                } else {
                    galleryPointer += 1;
                }
            } else {
                if (galleryPointer - 1 <= -1) {
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

        function imageLoaded (img) {
            imageLoader += 1;
            if (this instanceof BackgroundGalleryGenerator) {
                this.onImageLoaded(img);
            }

        }

        function loadImages () {
            var galleriesLength = backgrounds.length,
                i;

            for (i = 0; i < galleriesLength; i += 1) {
                loadImage.apply(this, [backgrounds[i], i]);
            }

        }

        function loadImage (path, i) {
            var img = new Image(),
                imgObj = {},
                that = this;

            img.onload = function() {
                imgObj.width = this.width;
                imgObj.height = this.height;
                imgObj.ratio = imgObj.width / imgObj.height;
                imgObj.url = path;
                backgrounds[i] = imgObj;
                imageLoaded.apply(that, [this]);
                if (i === 0 && !defaultBackground) {
                    containerElement.style.backgroundImage = 'url("' + this.src + '")';
                }
                if (imageLoader === backgrounds.length && !fullyLoaded) {
                    onAllImagesLoaded.apply(that);
                }
            };

            img.src = path;

        }

        function backgroundsIterator (callback) {
            var i,
                length = backgrounds.length;

            for (i = 0; i < length; i += 1) {
                if (callback(i)) {
                    break;
                }
            }
        }

        function findImagesInBackgrounds (src, threshold) {
            var found = [];

            backgroundsIterator(function (i) {
                if (backgrounds[i].url === src) {
                    found.push(i);
                    if (typeof threshold && threshold === found.length) {
                        return true;
                    }
                }
            });

            if (found.length === 0) {
                return false;
            } else {
                return found;
            }
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

        this.addImage = function (src, useForce) {
            if (typeof useForce !== 'undefined' && useForce === true) {
                loadImage(src, backgrounds.length);
            } else {
                if (!findImagesInBackgrounds(src, 1)) {
                    loadImage(src, backgrounds.length);
                }
            }

        };

        this.removeImage = function (src, type) {
            var positions,
                i,
                length;

            if (typeof type === 'undefined') {
                positions = findImagesInBackgrounds(src);
                length = positions.length;

                if (positions !== false) {
                    for (i = 0; i < length; i += 1) {
                        backgrounds.splice(positions[i] - i, 1)
                    }
                }
            }

        };

        this.onFullyLoaded = options.onFullyLoaded || function () {};

        this.onImageLoaded = options.onImageLoaded || function () {};

        addLoader();
        loadImages.apply(this);

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
            if (callback !== 'undefined' && items.hasOwnProperty(id)) {
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
