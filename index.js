const fs = require('fs');
const { clearOldRepositories } = require('./clearRepositories');
const { cloneRepositories } = require('./cloneRepositories');

// Ruta al archivo de texto con los enlaces de los repositorios
const filePath = './links.txt';

// Ruta de la carpeta donde quieres clonar los repositorios
const clonePath = '../repositories/';

fs.readFile(filePath, 'utf8', async (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	// Dividir el contenido del archivo por líneas
	const repositories = data.split('\n');

	// Asegurarse de que la carpeta 'repos' existe o crearla
	if (!fs.existsSync(clonePath)) {
		fs.mkdirSync(clonePath, { recursive: true });
	} else {
		clearOldRepositories(clonePath);
	}

	if (repositories.length > 1 && repositories[0] !== '') {
		cloneRepositories(repositories, clonePath);
	}
});
