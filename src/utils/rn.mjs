import { rename as renameFile } from 'node:fs/promises';

export const rename = async (oldFile, newFile) => {
	try {
		await renameFile(oldFile, newFile);
	} catch {
		throw new Error(`Can't rename file ${oldFile}.`);
	}
};
