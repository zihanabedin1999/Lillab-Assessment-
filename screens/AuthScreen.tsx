import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Spinner } from '../components/ui/Spinner';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { AppleIcon } from '../components/icons/AppleIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { LockIcon } from '../components/icons/LockIcon';
import { UserIcon } from '../components/icons/UserIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { EyeOffIcon } from '../components/icons/EyeOffIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { MOCK_USERS } from '../constants';

type AuthMode = 'login' | 'signup' | 'forgot';

const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setSuccess('');
    // Clear fields
    setName('');
    setEmail('');
    setPassword('');
    setDob('');
  };

  const validate = (): boolean => {
    setError('');
    if (mode === 'signup') {
      if (!name.trim() || name.trim().length < 2) {
        setError('Please enter your full name.');
        return false;
      }
    }
    if (mode !== 'login' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
     if (mode === 'login' && !email) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (mode !== 'forgot' && (password.length < 6)) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'signup') {
        await signup(name, email, password, dob, gender);
      } else { // forgot password
        // Mock success
        setSuccess('A password reset link has been sent to your email.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = async (userEmail: string) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      await login(userEmail);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred during social login.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  const FormHeader = () => (
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">Meetmax</h2>
        <button className="flex items-center text-sm text-gray-500">
          English (UK) <ChevronDownIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
  );

  const SocialButtons = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Button 
            variant="secondary" 
            className="w-full text-sm" 
            onClick={() => handleSocialLogin(MOCK_USERS[0].email)}
            disabled={isLoading}
        >
          <GoogleIcon className="w-5 h-5 mr-2" /> Log in with Google
        </Button>
        <Button 
            variant="secondary" 
            className="w-full text-sm"
            onClick={() => handleSocialLogin(MOCK_USERS[1].email)}
            disabled={isLoading}
        >
          <AppleIcon className="w-5 h-5 mr-2" /> Log in with Apple
        </Button>
      </div>
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-200" />
        <span className="mx-4 text-xs font-medium text-gray-400">OR</span>
        <hr className="flex-grow border-gray-200" />
      </div>
    </>
  );

  const renderForm = () => {
    if (mode === 'login') {
      return (
        <>
          <div className="text-left mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
            <p className="mt-2 text-sm text-brand-text">Welcome back, you've been missed!</p>
          </div>
          <SocialButtons />
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              id="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} icon={<MailIcon className="w-5 h-5 text-gray-400" />}
            />
            <Input
              id="password" type={passwordVisible ? "text" : "password"} placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} icon={<LockIcon className="w-5 h-5 text-gray-400" />}
              endIcon={
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <EyeOffIcon className="w-5 h-5 text-gray-400" /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
                </button>
              }
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); handleModeChange('forgot'); }} className="font-medium text-brand-blue hover:underline">Forgot Password?</a>
            </div>
            {error && <p className="text-sm text-center text-red-500">{error}</p>}
            <Button type="submit" className="w-full !mt-6" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Sign In'}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-6">
            You haven't any account? <a href="#" onClick={(e) => { e.preventDefault(); handleModeChange('signup'); }} className="font-medium text-brand-blue hover:underline">Sign Up</a>
          </p>
        </>
      );
    }

    if (mode === 'signup') {
      return (
        <>
          <div className="text-left mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Getting Started</h1>
            <p className="mt-2 text-sm text-brand-text">Create an account to continue and connect with the people.</p>
          </div>
          <SocialButtons />
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <Input id="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} icon={<MailIcon className="w-5 h-5 text-gray-400" />} />
            <Input id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} icon={<UserIcon className="w-5 h-5 text-gray-400" />} />
            <Input
              id="password" type={passwordVisible ? "text" : "password"} placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} icon={<LockIcon className="w-5 h-5 text-gray-400" />}
              endIcon={
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <EyeOffIcon className="w-5 h-5 text-gray-400" /> : <EyeIcon className="w-5 h-5 text-gray-400" />}
                </button>
              }
            />
             <Input id="dob" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} placeholder="Date of birth" value={dob} onChange={(e) => setDob(e.target.value)} disabled={isLoading} icon={<CalendarIcon className="w-5 h-5 text-gray-400" />} />
            <div className="flex items-center space-x-4">
                <label className="flex items-center">
                    <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="h-4 w-4 text-brand-blue border-gray-300 focus:ring-brand-blue" />
                    <span className="ml-2 text-gray-600 text-sm">Male</span>
                </label>
                 <label className="flex items-center">
                    <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="h-4 w-4 text-brand-blue border-gray-300 focus:ring-brand-blue" />
                    <span className="ml-2 text-gray-600 text-sm">Female</span>
                </label>
            </div>
            {error && <p className="text-sm text-center text-red-500">{error}</p>}
            <Button type="submit" className="w-full !mt-6" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Sign Up'}
            </Button>
          </form>
           <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); handleModeChange('login'); }} className="font-medium text-brand-blue hover:underline">Sign In</a>
          </p>
        </>
      );
    }
    
    if (mode === 'forgot') {
         return (
        <>
          <div className="text-left mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Forgot password?</h1>
            <p className="mt-2 text-sm text-brand-text">Enter your details to receive a reset link</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
             <Input id="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} icon={<MailIcon className="w-5 h-5 text-gray-400" />} />
             {error && <p className="text-sm text-center text-red-500">{error}</p>}
             {success && <p className="text-sm text-center text-green-500">{success}</p>}
             <Button type="submit" className="w-full !mt-6" disabled={isLoading || !!success}>
                {isLoading ? <Spinner /> : 'Send'}
             </Button>
          </form>
           <p className="text-sm text-center text-brand-blue font-medium mt-6">
            <a href="#" onClick={(e) => { e.preventDefault(); handleModeChange('login'); }} className="hover:underline">&lt; Back to Sign In</a>
          </p>
        </>
      );
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <FormHeader />
            {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
