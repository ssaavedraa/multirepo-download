const promisifiedChild = (child, repositoryName, repositoryUrl) => {
	return new Promise((resolve) => {
		child.addListener('exit', (code) => {
			if (code !== 0) {
				resolve({
					repositoryName,
					repositoryUrl,
					success: false,
					errorMessage:
						'Please make sure you have the correct access rights and the repository exists.',
				});
			}
			resolve({
				repositoryName,
				repositoryUrl,
				success: true,
				errorMessage: null,
			});
		});
	});
};

module.exports = {
	promisifiedChild,
};
