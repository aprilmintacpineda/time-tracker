const retryIn = 5;

export default {
	retryIn,
	retryMessage: 'Something went wrong. Will retry again after ' + retryIn + ' seconds.',
	sendFailedMessage: 'Sorry, couldn\'t process your request due to an unknown error. Try again later.'
};