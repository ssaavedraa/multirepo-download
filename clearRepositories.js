const fs = require('fs');

const clearOldRepositories = (clonePath) => {
	const oldRepositories = fs.readdirSync(clonePath);

	if (oldRepositories.length > 0) {
		console.clear();
		console.log('Removing old repositories...');
		const results = oldRepositories.reduce((status, repository) => {
			try {
				fs.rmSync(`${clonePath}${repository}`, {
					recursive: true,
					force: true,
				});

				return [
					...status,
					{
						repository,
						success: true,
						error: null,
					},
				];
			} catch (error) {
				return [
					...status,
					{
						repository,
						success: false,
						error: error.message,
					},
				];
			}
		}, []);

		console.table(results);
	}
};

module.exports = {
	clearOldRepositories,
};
