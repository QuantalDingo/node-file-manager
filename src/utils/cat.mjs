import { readFile } from 'node:fs/promises';
import { throwInvalidInputError } from '../error/invalid-input.error.mjs';

export const cat = async (filename) => {
	if (!filename) throwInvalidInputError();

	try {
		const content = await readFile(filename, { encoding: 'utf8' });
		console.log(content);
	} catch {
		throw new Error(`Can't find file ${filename}.`);
	}
};
