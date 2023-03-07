# refactored-octo-goggles
Terrascope test.

## Notes:
I'm aware that there's a bunch of stuff that is somewhat messy, but I'll refactor as best as I can as the days go on.


## Packages:
1. Multer.
2. Express.
3. UUID.
4. Nodemon (Dev dependency, just for easy testing / hot reloads)

## Instructions

### Required
1. Build a simple microservice that can receive an uploaded image and return a unique
identifier for the uploaded image that can be used subsequently to retrieve the image.
2. Extend the microservice so that different image formats can be returned by using a different
image file type as an extension on the image request URL.
3. Write a series of automated tests that test the image upload, download and file format
conversion capabilities.
### Stretch
1. Write a series of microservices for each type of image transformation. Coordinate the
various services using a runtime virtualisation or containerisation technology of your choice.
2. Design a language-specific API shim (in the language of your choice) for ProgImage as a
reusable library (eg Ruby Gem, Node Package, etc). The library should provide a clean and
simple programmatic interface that would allow a client back-end application to talk to the
ProgImage service. The library should be idiomatic for the target language. 




### TODOs
1. Refactor and split services to different modules 
2. Stretch - Series of microservices for image transformation
3. API shim
4. TESTING!


### To Run
1. run `npm install`
2. run `npm run devStart`
This activates the nodemon for you to see.
3. Click around and upload your photo, you should be able to see the successful upload.
4. Should should be able to see the file name, you can download it via `localhost:3050/Images/{yourfilename}.{ext}`


### Final entry:

I am unfortunately unable to get it to fully run.

It's able to upload and download, but I'm not sure why my sharp package does not let me convert.

I've never used sharp before, so that is also probably a reason why I'm not as familiar with it.

Thank you for the opportunity and for reading through the code!