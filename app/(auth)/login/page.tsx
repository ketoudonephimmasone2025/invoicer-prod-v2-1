import AuthForm from "@/components/AuthForm";

const LoginPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<AuthForm mode="login" />
		</div>
	);
};
export default LoginPage;
