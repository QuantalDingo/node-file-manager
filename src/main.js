import { homedir } from 'node:os';
import { argv, chdir, cwd, stdin, exit } from 'node:process';

import {
	add,
	cat,
	compress,
	copy,
	decompress,
	hash,
	os,
	ls,
	remove,
	rename,
} from './utils/index.mjs';
import {
	InvalidInputError,
	throwInvalidInputError,
} from './error/invalid-input.error.mjs';
import { resolve } from 'node:path';

const args = argv.slice(2);
const [USERNAME = 'Guest'] = args.map((param) => param.split('=')[1]);
const HOME = homedir();
let currentDir = HOME;

const exitHandler = () => {
	console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
	exit(0);
};

const changeDir = (dir) => {
	chdir(dir);
	currentDir = cwd();
};

const fileManager = async () => {
	changeDir(HOME);

	console.log(`Welcome to the File Manager, ${USERNAME}!\n`);

	stdin.setEncoding('utf8').on('data', async (data) => {
		try {
			const commandWithParams = data.split(' ').map((entry) => entry.trim());
			const [command, ...params] = commandWithParams;

			switch (command) {
				case 'up': {
					changeDir('../');
					break;
				}
				case 'cd': {
					const [newDir] = params;
					changeDir(newDir);
					break;
				}
				case 'cat': {
					const [filename] = params;
					if (!filename) throwInvalidInputError();
					await cat(resolve(currentDir, file));
					break;
				}
				case 'ls': {
					await ls(currentDir);
					break;
				}
				case 'add': {
					const [filename] = params;
					await add(filename);
					break;
				}
				case 'rm': {
					const [filename] = params;
					if (!filename) throwInvalidInputError();
					await remove(resolve(currentDir, filename));
					break;
				}
				case 'cp': {
					const [from, to] = params;
					await copy(from, to);
					break;
				}
				case 'mv': {
					const [from, to] = params;
					await copy(from, to, true);
					break;
				}
				case 'rn': {
					const [oldFile, newFile] = params;
					await rename(oldFile, newFile);
					break;
				}
				case 'hash': {
					const [filename] = params;
					if (!filename) throwInvalidInputError();
					await hash(`${resolve(currentDir, filename)}`);
					break;
				}
				case 'os': {
					const [key] = params;
					os(key);
					break;
				}
				case 'compress': {
					const [from, to] = params;
					await compress(from, to);
					break;
				}
				case 'decompress': {
					const [from, to] = params;
					await decompress(from, to);
					break;
				}
				default:
					throw new Error('Invalid input.');
			}
		} catch (e) {
			if (e instanceof InvalidInputError) {
				console.log(e.message);
			} else {
				console.log('Operation failed.');
			}
		}

		console.log(`You are currently in ${currentDir}`);
	});

	process.on('SIGINT', () => exitHandler());
	process.on('exit', () => exitHandler());
};

await fileManager();
