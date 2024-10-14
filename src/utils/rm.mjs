import { unlink } from 'node:fs/promises';
import { throwInvalidInputError } from '../error/invalid-input.error.mjs';

export const remove = async (filename) => {
	if (!filename) throwInvalidInputError();
	try {
		await unlink(filename);
	} catch {
		throw new Error(`Can't delete file ${filename}.`);
	}
};
