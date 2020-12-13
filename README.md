# moxup
A simple and intuitive way to generate mockup profile picture objects in JSON format.

Many thanks to the creator @jimkang and contributors of [g-i-s](https://github.com/jimkang/g-i-s) 

Based on my other work generating random names [moxname](https://www.npmjs.com/package/moxname) 

To install run:

```bash
npm i moxup
```

<h1>Functionality</h1>

<h6>Generating a profile picture</h6>

Using 
```javascript
getProfilePictures(amount, gender) 
```
will return a promise, JSON object array, with urls for profile pictures. 
A maximum of 10 pictures per function call is returned in the promise. 
