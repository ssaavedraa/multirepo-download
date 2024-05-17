const { exec } = require('child_process');
const { promisifiedChild } = require('./utils');

const cloneRepositories = (repositories, clonePath) => {
	console.log('Cloning Repositories...');

	const promises = repositories.map((repositoryUrl) => {
		if (repositoryUrl) {
			const [protocol, gitUser, repositoryName] = repositoryUrl
				.replace(/https:\/\//, 'git@')
				.split('/');

			// Comando para clonar el repositorio en una subcarpeta única
			const finalClonePath = `${clonePath}${repositoryName}`;

			const cloneCommand = `git clone ${protocol}:${gitUser}/${repositoryName} ${finalClonePath}`;

			// Ejecutar el comando de clonación
			const child = exec(cloneCommand);

			return promisifiedChild(child, repositoryName, repositoryUrl);
		}
	});

	let progress = 0;
	for (const promise of promises) {
		promise.then(() => {
			progress++;
			console.clear();
			console.log(`${progress}/${repositories.length} repositories cloned`);
		});
	}

	Promise.all(promises)
		.then((data) => {
			console.table(data);
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = {
	cloneRepositories,
};
