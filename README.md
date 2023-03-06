# refactored-octo-goggles
terrascope test. had to throw off other people, haha

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