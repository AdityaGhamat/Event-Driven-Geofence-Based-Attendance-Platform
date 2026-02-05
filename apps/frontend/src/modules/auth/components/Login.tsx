import { useState } from "react";
import { Link } from "react-router";
import { loginSchema } from "../validations";
import AuthLayout from "../layouts/AuthLayout";
import { login } from "../api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { notify } from "../../../components/Toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const { refetchUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      });
      setError(fieldErrors);
      return;
    }
    try {
      setError({});
      const response = await login(email, password);
      if (response.success) {
        await refetchUser();
        navigate("/dashboard/office");
      }
    } catch (error: any) {
      const message = error.response?.data?.error?.message || "Login failed";
      notify.error("Login", message);
      setError({ form: message });
    }
  };

  return (
    <AuthLayout>
      <title>Login | Attendify</title>
      <meta
        name="description"
        content="Log in to your Attendify account to manage workforce attendance and geofence settings."
        key="desc"
      />
      <meta property="og:title" content="Login | Attendify" />
      <meta
        property="og:description"
        content="Secure login for Attendify workforce management."
      />

      <form
        className="flex flex-col justify-center items-center w-full max-w-lg md:w-1/2 px-6 flex-1"
        onSubmit={handleSubmit}
      >
        <div className="py-4 text-center">
          <h1 className="text-white font-bold text-5xl">Login Account</h1>
          <p className="text-neutral-300 py-2">
            Don't have an account,
            <Link to="/register" className="text-purple-300 ml-1">
              click here
            </Link>
          </p>
        </div>
        <div className="flex flex-col w-full text-white space-y-4">
          <div>
            <input
              name="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2a253b] border border-purple-400 rounded-xl py-3 pl-5 pr-4 text-white placeholder:text-neutral-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              required
            />
            {error.email && (
              <p className="text-red-400 text-sm mt-1 ml-1">{error.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2a253b] border border-purple-400 rounded-xl py-3 pl-5 pr-12 text-white placeholder:text-neutral-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error.password && (
            <p className="text-red-400 text-sm ml-1">{error.password}</p>
          )}

          <button className="px-4 mt-2 py-3 bg-purple-500 text-white font-sans rounded-xl border border-purple-600 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#2a253b] transition-all shadow-md hover:shadow-lg font-bold tracking-wide">
            Login
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
