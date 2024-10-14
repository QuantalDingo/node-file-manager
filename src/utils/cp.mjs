import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { throwInvalidInputError } from '../error/invalid-input.error.mjs';

export const copy = async (from, toDir, deleteOrigin = false) => {
	if (!from || !toDir) throwInvalidInputError();

	try {
		const origin = createReadStream(from, { encoding: 'utf8' });
		const dest = createWriteStream(resolve(toDir, from), { encoding: 'utf8' });
		await pipeline(origin, dest);

		if (deleteOrigin) {
			await unlink(from);
		}
	} catch {
		throw new Error(`Can't copy file ${from} to ${toDir}.`);
	}
};
