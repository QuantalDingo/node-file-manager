import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress } from 'node:zlib';

export const compress = async (from, to) => {
	if (!from || !to) throwInvalidInputError();

	try {
		const origin = createReadStream(from);
		const dest = createWriteStream(to);
		const compressor = createBrotliCompress();

		await pipeline(origin, compressor, dest);
	} catch {
		throw new Error(`Can't compress file ${from}.`);
	}
};
