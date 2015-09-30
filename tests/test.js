describe("A suite", function() {
    it("Should generate a gallery with an id manualGallery camel-cased that is an object", function() {
        BackgroundGallery.generate({
            id: 'manual-gallery',
            backgrounds: [
                'img/cats/cat1.jpeg',
                'img/cats/cat2.jpeg',
                'img/cats/cat3.jpeg',
                'img/cats/cat4.jpeg',
                'img/cats/cat5.jpeg',
                'img/cats/cat6.jpeg',
                'img/cats/cat7.jpeg',
                'img/cats/cat8.jpeg',
                'img/cats/cat9.jpeg',
                'img/cats/cat10.jpeg',
                'img/cats/cat11.jpeg'
            ]
        });

        expect(typeof BackgroundGallery.getItems()['manualGallery']).toBe('object');
    });
});