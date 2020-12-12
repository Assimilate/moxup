const gis = require('g-i-s')

const listOfFemaleNames = ['Sandra', 'Joanna', 'Johanna', 'Sylvia', 'Julia']
const listOfMaleNames = ['Daniel', 'Max', 'Filip', 'David', 'John']
const extensions = ['jpg', 'png']

async function getImageObjects(query) {
    console.log('Query:', query)
    return new Promise((resolve, reject) => {
        gis(query,
            (error, images) => {
                if (error) {
                    console.log('Could not get images query.')
                    reject(error)
                } else {
                    console.log('Images retreived with query')
                    resolve(images)
                }
            })
    })
}

async function getProfilePictures(amount, gender) {
    if (amount > 10) {
        throw new Error('Amount of picture can be maximum 10.')
    }
    let genderName = pickNameRandomly(getListBasedOnGender(gender))
    let query = gender + ' ' + genderName + ' profile ' + 'picture'
    let imageObjects
    try {
        imageObjects = await getImageObjects(query)
        imageObjects = filterImages(amount, imageObjects)
    } catch (error) {
        throw error
    }
    if (!imageObjects) throw new Error('No image objects fitting your query was found.')
    return imageObjects
}

function getListBasedOnGender(gender) {
    if (gender.toLowerCase() === 'male') {
        return listOfMaleNames
    } else if (gender.toLowerCase() === 'female') {
        return listOfFemaleNames
    } else {
        throw new Error('Gender must be male or female, for this query to be precise.')
    }
}

function pickNameRandomly(listOfGenderNames) {
    let randomIndex = getRandomInt(listOfGenderNames.length)
    return listOfGenderNames[randomIndex]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function filterImages(amount, imageObjects) {
    let filteredImageObjects = []
    for (imageObject of imageObjects) {
        if (checkImageURL(imageObject.url)) {
            filteredImageObjects.push(imageObject)
            if (filteredImageObjects.length === amount) break
        }
    }
    return filteredImageObjects
}

function checkImageURL(imageURL) {
    let imageExtension = imageURL.slice(imageURL.length - 3, imageURL.length)
    return isValidExtension(imageExtension)
}

function isValidExtension(extension) {
    if (extensions.includes(extension)) return true
    else return false
}

exports.getProfilePictures = getProfilePictures
