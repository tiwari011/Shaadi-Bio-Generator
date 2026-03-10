import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(cred.user, { displayName: data.name });
      navigate("/personaldetails");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("Email already registered. Please login.");
      else setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/personaldetails");
    } catch {
      setError("Google signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Shaadi<span className="text-orange-500">Bio</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Create your account to get started</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-8">

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Full Name</label>
              <input type="text" placeholder="e.g. Priya Sharma"
                {...register("name", { required: "Name is required", minLength: { value: 3, message: "Min 3 characters" } })}
                className="mt-1 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Email</label>
              <input type="email" placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className="mt-1 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Password</label>
              <div className="relative mt-1">
                <input type={showPassword ? "text" : "password"} placeholder="Min 6 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" }
                  })}
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
              className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60">
              {loading ? "Creating account..." : "Create Account →"}
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
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold hover:underline">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
