# background-gallery
A multi purpose background gallery


**!!!!! PLEASE DON'T use this library yet it is on development stage !!!!!**



Background Gallery is an attempt to create a library non dependant from other libraries with a purpose of providing
an automatic (and not!) way to have a changing image gallery on the background of a given container.

**Features:**

- Unlimited galleries per page controlled from a global object;
- Support for different types of effects and ways the gallery functions;
- Events attached for interfering with the process;
- Possibility to add and remove images on the fly;
- Pause/Resume possibilities;
- Options for automatic background image scaling that will adapt on the resizing of the container;

and many to come after the first release ... 



**How to use?**

There are two ways to use **background gallery**

1. Add the attribute **data-bg-auto** to your container and include the images with the **data-bg-src** attribute 
   containing the source of the images you want to use;

   example:
   
   ``` 
   <div data-bg-auto>
        <img data-bg-src="example1.jpeg" style="display: none"/>
        <img data-bg-src="example1.jpeg" style="display: none"/>
        <img data-bg-src="example1.jpeg" style="display: none"/>
        <img data-bg-src="example1.jpeg" style="display: none"/>
        <img data-bg-src="example1.jpeg" style="display: none"/>
   </div>
   ```
   
2. Add to your gallery's container an id and pass it as an argument to
   the method generate of the global object BackgroundGallery plus an array with the paths for images
   to be used from the background gallery;
   
   example:
   
   ```
   <div id="myContainer"></div>
   ```
   
   PS: no dashes inside the id
   
   and somewhere in your javascript
   
   ```
   BackgroundGallery.generate({
        id: 'my-container',
        backgrounds: [
            'example1.jpeg',
            'example2.jpeg',
            'example3.jpeg',
            'example4.jpeg',
            'example5.jpeg',
        ]
   });
   ```

   
   
**Further control**

`BackgroundGallery` global object offers various methods for controlling the generated galleries:

- Play/Pause the galleries using the **pauseGalleryById(galleryId)** and **resumeGalleryById(galleryId)**.
  As `galleryId` you use the id you gave to the container but Camel-Cased if you used dashes
  or autoElem + `the placement of the library in the DOM in comparison to the others`
  
  ex: if you have one background gallery generated automatically using the first way described on the
      `how to use?: 1rst way` the container will have as galleryId the string `autoElem0`,
      the second one will be `autoElem1` and so on ...
      
  so in order to pause your gallery you will need to use:
      
  ```
  BackgroundGallery.pauseGalleryById('autoElem0');
  ```
  
  if it was generated automatically and
   
  ```
  BackgroundGallery.pauseGalleryById('myContainer');
  ```
  
  if it was generated not-automatically with a given id `myContainer` 
  
  and in order to resume
  
  ```
  BackgroundGallery.resumeGalleryById('autoElem0');
  ```
  
  you can also pause all background galleries you have generated simultaneously
  
  ```
  BackgroundGallery.pauseAllGalleries();
  ```
  
  and
  
  ```
  BackgroundGallery.resumeAllGalleries();
  ```
  
- Add/Remove image on a given gallery on the fly;

  Add (adds an image in the end of the image queue):
 
  ```
  BackgroundGallery.addImageToGallery(galleryId, imageSrc, useForce);
  ```
  
  with: 
    - galleryId: as described on the play/pause
    - imageSrc: the src of the image
    - useForce: use true if you want to add the image in the end of the image array queue even if it already exists 
  
  Remove (removes an image or images with the same src from the image queue)
  
  ```
  BackgroundGallery.removeImageFromGallery(galleryId, imageSrc)
  ```
  
  with: 
    - galleryId: as described on the play/pause
    - imageSrc: the src of the image
    
    
    

Thats all for now!!!


