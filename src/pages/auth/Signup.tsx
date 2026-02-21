import { Link, useNavigate } from "react-router";
import Button1 from "../../components/Button1";
import { google, signup } from "../../constant/constant";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

interface UserData {
  fullName: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup: signupAuth, gmailLogin, error: authError } = useAuth();

  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!userData.fullName || !userData.email || !userData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (userData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await signupAuth(userData.email, userData.password);
      // Store full name in localStorage or you can extend Firebase user profile
      localStorage.setItem("fullName", userData.fullName);
      localStorage.setItem("requireEmailVerification", "true");

      // Navigate to login with a message
      navigate("/auth/login?signup=success");
    } catch (err: any) {
      const errorMessage = err.message || "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsLoading(true);
    try {
      await gmailLogin();
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.message || "Google signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = error || authError;

  return (
    <div className="relative">
      <div className="absolute hidden lg:block ">
        <img src={signup} alt="image" />
      </div>

      <div className="container mt-15">
        <div className=" ml-12 lg:ml-0 lg:grid lg:grid-cols-2 lg:items-center lg:gap-[120px]">
          <div></div>

          <h1 className=" ml-20 text-5xl font-extrabold dark:text-amber-50 lg:hidden">Exclusive</h1>

          <div className=" py-14 lg:py-[125px] max-w-[370px]">
            <h2 className="font-inter text-[36px] font-medium mb-6">
              Create an account
            </h2>
            <p className="font-poppins mb-12">Enter your details below</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10 font-poppins text-gray-500">
              <input
                className="pb-2 border-b border-button dark:border-white dark:text-white focus:outline-none"
                name="email"
                type="email"
                placeholder="Email or Phone Number"
                value={userData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />

              <input
                className="pb-2 border-b border-button dark:border-white dark:text-white focus:outline-none"
                name="fullName"
                type="text"
                placeholder="Name"
                value={userData.fullName}
                onChange={handleChange}
                disabled={isLoading}
                required
              />

              <div className=" pr-4 w-[340px]">
                <div className="mb-4">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-amber-50 hover:text-indigo-600 focus:outline-none transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>

                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-[362px]  py-3 text-black dark:text-white font-semibold border-b border-button dark:border-white focus:outline-none "
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
              </div>

              {displayError && (
                <div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
                  {displayError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="bg-button2 hover:bg-red-600 transition-all duration-300 cursor-pointer text-white font-medium font-poppins px-12 py-4 rounded-sm w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <Button1
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="mb-8 mt-8 flex gap-4 w-full justify-center items-center font-normal"
            >
              <img src={google} alt="icon" />
              {isLoading ? "Loading..." : "Sign up with Google"}
            </Button1>

            <p className="font-poppins text-center">
              Already have an account?
              <Link
                className="font-medium ml-4 underline underline-offset-8"
                to="/auth/login"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
