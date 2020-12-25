const gis = require("g-i-s");
const moxname = require("moxname");

const amountOfUniqueNames = 50;
const extensions = ["jpg", "png"];

async function getImageObjects(query) {
  console.log("Query:", query);
  return new Promise((resolve, reject) => {
    gis(query, (error, images) => {
      if (error) {
        console.log("Could not get images query.");
        reject(error);
      } else {
        console.log("Images retreived with query");
        resolve(images);
      }
    });
  });
}

async function getImage(query) {
  try {
    let images = await getImageObjects(query);
    image = filterImages(1, images)[0];
  } catch (err) {
    throw new Error("Can not retrieve image.");
  }
  if (!images)
    throw new Error("No image objects fitting your query was found.");
  return image;
}

async function getProfilePictures(amount, gender) {
  if (amount > 10) {
    throw new Error("Amount of picture can be maximum 10.");
  }
  let name = pickNameRandomly(getFullNamesBasedOnGender(gender));
  let query = name + " " + gender + " profile " + "picture";
  let imageObjects;
  try {
    imageObjects = await getImageObjects(query);
    imageObjects = filterImages(amount, imageObjects);
  } catch (error) {
    throw error;
  }
  if (!imageObjects)
    throw new Error("No image objects fitting your query was found.");
  return imageObjects;
}

function getFirstNamesBasedOnGender(gender) {
  return moxname.getFirstName(gender, 50);
}

function getFullNamesBasedOnGender(gender) {
  return moxname.getFullName(gender, 50);
}

function pickNameRandomly(listOfGenderNames) {
  let randomIndex = getRandomInt(listOfGenderNames.length);
  return listOfGenderNames[randomIndex];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function filterImages(amount, imageObjects) {
  let filteredImageObjects = [];
  for (imageObject of imageObjects) {
    if (checkImageURL(imageObject.url)) {
      filteredImageObjects.push(imageObject);
      if (filteredImageObjects.length === amount) break;
    }
  }
  return filteredImageObjects;
}

function checkImageURL(imageURL) {
  let imageExtension = imageURL.slice(imageURL.length - 3, imageURL.length);
  return isValidExtension(imageExtension);
}

function isValidExtension(extension) {
  if (extensions.includes(extension)) return true;
  else return false;
}

exports.getProfilePictures = getProfilePictures;
exports.getImage = getImage;
