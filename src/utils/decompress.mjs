import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { throwInvalidInputError } from '../error/invalid-input.error.mjs';

export const decompress = async (from, to) => {
	if (!from || !to) throwInvalidInputError();

	try {
		const origin = createReadStream(from);
		const dest = createWriteStream(to);
		const decompressor = createBrotliDecompress();

		await pipeline(origin, decompressor, dest);
	} catch {
		throw new Error(`Can't decompress file ${from}.`);
	}
};
