function generateRandomPassword(length) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
	let password = "";

	// console.log(charset)
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset.charAt(randomIndex);
	}
	console.log(password)
	return password;
}

module.exports = generateRandomPassword;