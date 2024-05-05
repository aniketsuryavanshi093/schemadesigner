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
      <>
        <aside className="bg-primary asideimage hidden h-screen flex-1 sm:block "></aside>
        <div className="flex-1 flex min-h-screen flex-col items-center justify-center">
          <LoginForm />
        </div>
      </>
    </UnAuthorizeLayout>
  );
}
