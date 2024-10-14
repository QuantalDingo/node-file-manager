export class InvalidInputError extends Error {
	constructor() {
		super('Invalid input.');
	}
}

export const throwInvalidInputError = () => {
	throw new InvalidInputError();
};
