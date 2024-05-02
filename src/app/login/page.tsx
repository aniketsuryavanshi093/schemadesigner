/* eslint-disable jsx-a11y/alt-text */
import "./login.scss";
import UnAuthorizeLayout from "@/components/UnAuthorizeLayout";
import LoginForm from "./components/LoginForm";
import "./login.scss";
export const metadata = {
  title: "login",
};

export default async function Login() {
  // const user = await getCurrentUser();
  return (
    <UnAuthorizeLayout>
      <div className="w-100 wrapper loginform flex-column">
        <LoginForm />
      </div>
    </UnAuthorizeLayout>
  );
}
