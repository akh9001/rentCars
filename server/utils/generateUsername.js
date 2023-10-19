
function generateUniqueUsername(firstName, lastName, existingUsernames) {
	const fname = firstName.toLowerCase().replace(/\s/g, '');
	const lname = lastName.toLowerCase().replace(/\s/g, ''); // Lowercase and remove spaces from the rest of the last name
	const firstCharacterOfFirstName = fname.charAt(0);
	let uniqueUsername = `${firstCharacterOfFirstName}${lname}`;
	let counter = 2;

	// Check if the generated username is already in use
	while (existingUsernames?.includes(uniqueUsername)) {
		// console.log(existingUsernames.includes(uniqueUsername))
		// Replace the first character with the first two characters of the last name
		firstChars = fname.slice(0, counter);
		uniqueUsername = `${firstChars}${lname}`;
		counter++;
	}
	return uniqueUsername;
}

// Example usage:
// const existingUsernames = ['jsmith', 'jdoe', 'ssmith', 'akhalidy'];
// const firstName = 'anis';
// const lastName = 'remila';

// const generatedUsername = generateUniqueUsername(firstName, lastName, existingUsernames);
// // existingUsernames.push(generatedUsername)
// console.log(generatedUsername); // Output: smmith1 (assuming it's unique)

module.exports = generateUniqueUsername;
