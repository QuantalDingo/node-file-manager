import { readdir } from 'node:fs/promises';

export const ls = async (dir) => {
	const all = await readdir(dir, { withFileTypes: true });
	const files = all.filter((value) => value.isFile()).sort();
	const dirs = all.filter((value) => value.isDirectory()).sort();
	const table = [...dirs, ...files].reduce((acc, entry) => {
		acc.push({
			Name: entry.name,
			Type: entry.isDirectory() ? 'directory' : 'file',
		});
		return acc;
	}, []);

	console.table(table);
};
