import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#2b2538]">
      <div className="hidden md:flex md:w-1/2 md:justify-center md:items-center">
        <img
          src="https://res.cloudinary.com/doz0tncag/image/upload/f_auto,q_auto,w_800/login_bjcxbj.jpg"
          className="rounded-3xl w-3/4 h-3/4 object-cover"
          alt="login-background"
          loading="lazy"
          srcSet="
                https://res.cloudinary.com/doz0tncag/image/upload/f_auto,q_auto,w_400/login_bjcxbj.jpg 400w,
                https://res.cloudinary.com/doz0tncag/image/upload/f_auto,q_auto,w_800/login_bjcxbj.jpg 800w,
                https://res.cloudinary.com/doz0tncag/image/upload/f_auto,q_auto,w_1600/login_bjcxbj.jpg 1600w
              "
          decoding="async"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 flex-1">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
