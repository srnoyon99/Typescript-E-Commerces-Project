import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { google, signup } from '../../constant/constant';
import Button1 from '../../components/Button1';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
     const navigate = useNavigate();
     const { login, gmailLogin, error } = useAuth();

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [localError, setLocalError] = useState('');

     const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
     };

     const handleLogin = async (e: React.FormEvent) => {
          e.preventDefault();
          setLocalError('');

          if (!email || !password) {
               setLocalError('Please fill in all fields');
               return;
          }

          setIsLoading(true);
          try {
               await login(email, password);
               // Check if email is verified
               if (localStorage.getItem('requireEmailVerification')) {
                    navigate('/auth/login?verified=false');
               } else {
                    navigate('/');
               }
          } catch (err: any) {
               const errorMessage = err.message || 'Login failed. Please try again.';
               setLocalError(errorMessage);
          } finally {
               setIsLoading(false);
          }
     };

     const handleGoogleLogin = async () => {
          setLocalError('');
          setIsLoading(true);
          try {
               await gmailLogin();
               navigate('/');
          } catch (err: any) {
               const errorMessage = err.message || 'Google login failed. Please try again.';
               setLocalError(errorMessage);
          } finally {
               setIsLoading(false);
          }
     };

     const displayError = localError || error;

     return (
          <div className=' flex items-center mt-50 lg:mt-0  ' >
               <div className=' hidden lg:block' >
                    <img className=' h-[750px] mt-[60px] ' src={signup} alt="loginimages" />
               </div>

               <div className=' ml-16 lg:ml-[130px] ' >
                    <div>
                         <h2 className='  leading-[30px] text-[36px] font-semibold tracking-wide font-inter' >Log in to <span className=' text-4xl font-extrabold'> Exclusive </span></h2>
                         <p className='mt-6 dark:text-white text-[16px] lg:text-[20px] leading-6 ' >Enter your details below</p>
                    </div>

                    <form onSubmit={handleLogin} className=' mt-12 ' >
                         <input
                              type="email"
                              placeholder='Email or Phone Number'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className='w-full text-black dark:text-white font-semibold focus:outline-none border-b border-button dark:border-white pb-2'
                              disabled={isLoading}
                         />

                         <div className="validator-hint dark:text-white hidden">Enter valid email address</div>

                         <div className=" pr-4 mt-10 w-[340px]">
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
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                             placeholder="Password"
                                             className="w-[362px]  py-3 text-black dark:text-white font-semibold border-b border-button dark:border-white focus:outline-none "
                                             disabled={isLoading}
                                        />
                                   </div>
                              </div>
                         </div>

                         {displayError && (
                              <div className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                                   {displayError}
                              </div>
                         )}

                         <div className=' pt-10 ' >
                              <Button1
                                   onClick={handleGoogleLogin}
                                   disabled={isLoading}
                                   className="mb-8 flex gap-4 w-full justify-center items-center font-normal"
                              >
                                   <img src={google} alt="icon" />
                                   {isLoading ? 'Loading...' : 'Sign in with Google'}
                              </Button1>

                              <button
                                   type="submit"
                                   disabled={isLoading}
                                   className="bg-button2 hover:bg-red-600 transition-all duration-300 cursor-pointer text-white font-medium font-poppins px-8 lg:px-12 py-2 lg:py-4 rounded-sm w-full disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                              >
                                   {isLoading ? 'Logging in...' : 'Log In'}
                              </button>

                              <button
                                   type="button"
                                   onClick={() => navigate('/auth/login')}
                                   className='loginhover cursor-pointer text-[16px] leading-6 hover:border-b hover:border-button2 text-button2'
                              >
                                   Forget Password?
                              </button>
                         </div>

                         <p className="font-poppins pt-8 text-center "> Don't have any account?
                              <Link className="font-medium ml-4 underline underline-offset-8" to={"/auth/signup"}> Register </Link>
                         </p>
                    </form>

               </div>

          </div>
     )
}

export default Login
