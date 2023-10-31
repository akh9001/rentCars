function extractOriginalNames(objectsArray) {
	if (!objectsArray || objectsArray.length === 0)
		return [];
	// Use the map() function to extract the 'originalname' property from each object
	const originalNames = objectsArray.map((obj) => obj.path);
	// console.log(originalNames);
	return originalNames;
}

module.exports = extractOriginalNames;