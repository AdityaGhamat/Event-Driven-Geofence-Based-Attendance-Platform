import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#2b2538]">
      <div className="hidden md:flex md:w-1/2 md:justify-center md:items-center">
        <img
          src="https://i.ibb.co/xtFL0yfj/login.jpg"
          className="rounded-3xl w-3/4 h-3/4 object-cover"
          alt="login-background"
          loading="lazy"
          srcSet="https://i.ibb.co/xtFL0yfj/login.jpg 400w,
                  https://i.ibb.co/xtFL0yfj/login.jpg 800w,
                  https://i.ibb.co/xtFL0yfj/login.jpg 1600w"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 flex-1">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
