const secret = process.env.JWT_SECRET!; //!Assertion TS, dit a TS : je suis sur que cette variable n'est pas undefined

if (!secret) {
	throw new Error("JWT_SECRET env variable is required");
}

// Here if secret is undefined, we throw Error.
// Thats why the app will crash in this case.

export const JWT_SECRET = secret;

//Result : max security : the app won't start without JWT_SECRET
