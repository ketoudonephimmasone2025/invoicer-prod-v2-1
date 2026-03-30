import { prisma } from "./lib/prisma";

async function main() {
	console.log("Creating user...");
	const user = await prisma.user.create({
		data: {
			email: "test@gmail.com",
			password: "123456",
		},
	});
	console.log("User created : ", user);
}

main()
	.catch((error) => console.log(error))
	.finally(async () => {
		await prisma.$disconnect();
	});
