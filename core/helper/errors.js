/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien
 */

/*jshint esversion: 6 */
/*jshint node: true*/


const codes = {
	accounts : {
		loginFailed: 10000,
		loginBlocked: 10001
	}
}

const codeMessage = {

	// Custome Error Codes for Users
	[codes.accounts.loginFailed]: 'Your email or password is wrong.',
	[codes.accounts.loginBlocked]: 'Your account is disabled or blocked, please call the support.',
};

module.exports = function(code) {

	return {
		message: codeMessage[code],
		code: code
	};
};

module.exports.codes = codes;