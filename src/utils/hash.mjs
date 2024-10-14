import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createHash } from 'node:crypto';
import { throwInvalidInputError } from '../error/invalid-input.error.mjs';

export const hash = async (filename) => {
	if (!filename) throwInvalidInputError();

	const sha256 = createHash('sha256');
	await pipeline(createReadStream(filename), sha256);

	console.log(sha256.digest('hex'));
};
