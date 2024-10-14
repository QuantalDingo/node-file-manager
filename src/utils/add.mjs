import { open } from 'node:fs/promises';
import { throwInvalidInputError } from '../error/invalid-input.error.mjs';

export const add = async (filename) => {
	if (!filename) throwInvalidInputError();
	let file;

	try {
		file = await open(filename, 'wx');
	} catch {
		throw new Error(`Can't open file ${filename}.`);
	} finally {
		file?.close();
	}
};
