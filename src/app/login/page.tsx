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
        {/* <div className="loginclient">
            <h2 className="logintitle">Login</h2>
            <p className="text-center">
              How to i get started lorem ipsum dolor at?
            </p>
            <p className="text-muted mb-0 my-2 text-center">
              <Link href="/signup">
                Register As Admin{" "}
                <span>
                  <i className="fa-solid fa-right-long"></i>
                </span>
              </Link>
            </p>
          </div>
        </div> */}
        {/* <div className="w-100 wrapper loginright">
          <div className=" p-3 position-relative subtitleloginWrapper">
            <p className="">Empower Your Projects with TaskSphere!</p>
            <Image
              alt="womenimage"
              className="womenimage"
              src="/images/womenlogin.png"
              height={400}
              width={400}
            />
            <Image
              alt="leftbrighticon"
              className="leftbrighticon"
              src="/images/Group11.png"
              height={79}
              width={79}
            />
          </div> */}
      </div>
    </UnAuthorizeLayout>
  );
}
