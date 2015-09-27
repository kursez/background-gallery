# background-gallery
A multi purpose background gallery


###**!!!!! PLEASE DON'T use this library yet it is on development stage !!!!!**###



Background Gallery is an attempt to create a library non dependant from other libraries with a purpose of providing
an automatic (and not!) way to have a changing image gallery on the background of a given container.

##**Features:**##

- Unlimited galleries per page controlled from a global object;
- Support for different types of effects and ways the gallery functions;
- Events attached for interfering with the process;
- Possibility to add and remove images on the fly;
- Pause/Resume possibilities;
- Options for automatic background image scaling that will adapt on the resizing of the container;

and many to come after the first release ... 



##**How to use?**##

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
   `Note: for this second way you can name your gallery with a name different than the attribute 'id'.
   Actually you can omit using use the id attribute in the HTML. But in this case you will have to add
   an extra option 'containerElement' which will be an object (you will have to get it with some javascript method).
   There are details in section 'Options' about that.
   So the above snippet will look like:
   `
    
   ```
   BackgroundGallery.generate({
        id: 'myCustomName',
        backgrounds: [
            'example1.jpeg',
            'example2.jpeg',
            'example3.jpeg',
            'example4.jpeg',
            'example5.jpeg',
        ],
        containerElement: someJavascriptMethodToGetTheContainerElement()
   });
   ```
    
##**Options**##

Here is a list of all the `options` you can define when you are manually generating a `background-gallery`

- **'id'** (string)               : the id attribute of the container (it can be with dashes as well) 
                                    **OR** 
                                    the name you simply want to give to the given gallery even 
                                    if there is no id attribute, but in this case you will have to define
                                    the option **containerElement** or else you
                                    will get an exception.
                                    Either ways this **id** is the **galleryId** with which you will be 
                                    referring to the gallery when you will want to pause/resume and 
                                    to do other operations (See **Further control** bellow);
                                    
- **'backgrounds'** (array)       : the array with the paths to all the background images that are supposed 
                                    to be displayed;

- **'galleryTimer'** (integer)    : the number in milliseconds of the gallery's interval `(default 5000ms)`;

- **'containerElement'** (object) : this is needed only in case where the **id** does not correspond to any dom 
                                    element and it is just your naming convention;
                                    
- **'autoResizeImages'** (boolean): enables/disables the auto resize background functionality - `(default true)`

`Note: All of these options can be defined only once during the gallery's generation and can not be redefined`
   
##**Further control**##

`BackgroundGallery` global object offers various methods for controlling the generated galleries:

- Play/Pause the galleries using the **pauseGalleryById(galleryId)** and **resumeGalleryById(galleryId)**.
  As `galleryId` you use the id you gave to the container. **Remember** that your id will be **camelCased**
  if you have used dashes!!! If you generated automatically using the first way described on the `how to use?`
  section then as id you will have to use the automatic name given to the background-gallery and that is:
  
  autoElem + `the placement of the gallery in the DOM in comparison to the others galleries`
  
  Example: if you have two background galleries the first one in the dom order will have as galleryId the 
  string `autoElem0` and the second one will have `autoElem1`. If there was a third one it whould be automaticaly
  named `autoElem2` and so on ...
      
  so in order to pause your automatically generated gallery you will need to use:
      
  ```
  BackgroundGallery.pauseGalleryById('autoElem0');
  ```
  
  and if it was generated not-automatically with a given id `myContainer` in order to pause it you whould have to use:
   
  ```
  BackgroundGallery.pauseGalleryById('myContainer');
  ```
  
  and in order to resume:
  
  ```
  BackgroundGallery.resumeGalleryById('autoElem0');
  ```
  and accordingly for manual generation:
  
  ```
  BackgroundGallery.resumeGalleryById('myContainer');
  ```
  
  you can also pause all the background galleries you have generated simultaneously:
  
  ```
  BackgroundGallery.pauseAllGalleries();
  ```
  
  and resume them all with:
  
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
    
    
    

####Thats all for now!!!####
