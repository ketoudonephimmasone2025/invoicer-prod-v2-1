import AuthForm from "@/components/AuthForm";

const RegisterPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<AuthForm mode="register" />
		</div>
	);
};
export default RegisterPage;
