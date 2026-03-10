import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/personaldetails");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/personaldetails");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Shaadi<span className="text-orange-500">Bio</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Welcome back! Login to continue</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-8">

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className="mt-1 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-orange-400">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60 mt-2">
              {loading ? "Logging in..." : "Login →"}
            </button>

          </form>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-orange-100"></div>
            <span className="mx-3 text-gray-400 text-xs">OR</span>
            <div className="flex-1 border-t border-orange-100"></div>
          </div>

          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-orange-200 rounded-full py-3 hover:bg-orange-50 transition text-sm font-medium text-gray-600">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold hover:underline">Sign Up</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
