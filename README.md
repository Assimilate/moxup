# moxup
A simple and intuitive way to generate mockup profile picture objects in JSON format.

Many thanks to the creator @jimkang and contributors of g-i-s [link](https://github.com/jimkang/g-i-s) 

To install run:

**npm i moxup**

<h1>Functionality</h1>

<h6>Generating a profile picture</h6>

Using 
```javascript
getProfilePictures(amount, gender) 
```
will return a promise, JSON object array, with urls for profile pictures. 
A maximum of 10 pictures per function call is allowed. 
