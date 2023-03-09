# refactored-octo-goggles
Terrascope test.

## Notes:
I'm aware that there's a bunch of stuff that is somewhat messy, but I'll refactor as best as I can as the days go on.


## Packages:
1. Multer.
2. Express.
3. UUID.
4. Nodemon (Dev dependency, just for easy testing / hot reloads)
5. Node 16.18.1 and above.
6. updated brew vip (it interferes with the sharp packages for old versions)

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
3. Click around and upload your photo, you should be able to see the successful upload. upload is located at `localhost:3050/upload`
4. Should should be able to see the file name, you can download it via `localhost:3050/images/{yourfilename}.{ext}?convert={newImageForat}`
i.e. it will look like `http://localhost:3050/images/xxxxxxx.png?convert=jpg`
5. check the converted folder for the different images!
6. for greyscale, it's currently bugged but it does work. you can run the same way
: `http://localhost:3050/images/xxxxxxx.png?convert=grey`
it will however throw and error, BUT the file will be created (in greyscale) in the `greyscale-converted/ folder.`
7. Tested on both Firefox and Chrome. Seems like Firefox has a weird bug which attempts to download the original photo but with 0 bytes.
Works fine on Chrome.
8. As a note, when running this in localhost, the first few pulls will result in a crash, BUT will still create the converted image. my working theory is that it takes time for the conversion to occur. After that, it'll download just fine.
0. points to improve --> adding a wait timer. It's currently async, and i tested it without async too. same results.

### Final entry:

I am unfortunately unable to get it to fully run.

It's able to upload and download, but I'm not sure why my sharp package does not let me convert.

I've never used sharp before, so that is also probably a reason why I'm not as familiar with it.

Thank you for the opportunity and for reading through the code!

### Final, Final Entry

HAHA, IT WORKS!
Buggy, but it runs for sure!