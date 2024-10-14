import { arch, cpus, EOL, homedir, userInfo } from 'node:os';
import { throwInvalidInputError } from '../error/invalid-input.error.mjs';

export const os = (type) => {
	switch (type) {
		case '--EOL':
			console.log(JSON.stringify(EOL));
			break;
		case '--homedir':
			console.log(homedir());
			break;
		case '--cpus':
			console.log(cpus());
			break;
		case '--architecture':
			console.log(arch());
			break;
		case '--username':
			console.log(userInfo().username);
			break;
		default:
			throwInvalidInputError();
	}
};
