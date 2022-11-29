import Logo from '@images/logo.svg'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import validateEmail from '@lib/validate-email'
import emailValid from '@services/security/email-valid'
import CheckmarkIcon from '@images/checkmark.svg'
import RefreshIcon from '@images/refresh.svg'
import CrossIcon from '@images/cross.svg'

enum ValidationState {
  EMPTY,
  LOADING,
  VALID,
  INVALID,
}

const Login = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [email, setEmail] = useState('')
  const [emailValidation, setEmailValidation] = useState(ValidationState.EMPTY)
  const [password, setPassword] = useState('')

  const emailMutation = emailValid({
    onSuccess: () => setEmailValidation(ValidationState.VALID),
    onError: () => setEmailValidation(ValidationState.INVALID),
  })

  useEffect(() => {
    if (emailValidation !== ValidationState.LOADING) return

    emailMutation.mutate({
      email,
      type: 'login',
    })
  }, [emailValidation])
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex flex-col items-start justify-center gap-8 w-80 mx-auto">
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-xl">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400 ">
            Sign in to your account
          </p>
        </div>
        <form className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email</label>
            <div className="relative">
              <input
                className="border border-gray-200 rounded-md p-2 w-full"
                type="email"
                value={email}
                onChange={(e) => {
                  const emailInput = e.target.value
                  setEmail(emailInput)

                  if (!emailInput || emailInput.length === 0)
                    return setEmailValidation(ValidationState.EMPTY)

                  const isEmailValid = validateEmail(emailInput)
                  setEmailValidation(isEmailValid ? ValidationState.LOADING : ValidationState.INVALID)
                }}
              />
              <div className="absolute w-6 right-3 top-1/2 -translate-y-1/2">
                {emailValidation === ValidationState.LOADING && <RefreshIcon className="animate-spin fill-loading" />}
                {emailValidation === ValidationState.VALID && <CheckmarkIcon className="fill-valid" />}
                {emailValidation === ValidationState.INVALID && <CrossIcon className="fill-invalid" />}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Password</label>
            <div className="relative">
              <input
                className="border border-gray-200 rounded-md p-2 w-full"
                type="password"
                value={password}
                onChange={(e) => {
                  const passwordInput = e.target.value
                  setPassword(passwordInput)
                }}
              />
            </div>
          </div>
          <button
            type="button"
            className="bg-primary text-white rounded-md p-2 border border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-all duration-200 ease-in-out"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center w-full text-gray-700">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <div className="relative bg-gray-50 flex items-center justify-center">
        <img
          src="/images/login-bg.jpg"
          alt="Qatar2022 Official Ball"
          className="absolute object-cover w-full h-full saturate-0 opacity-10"
        />
        <Link
          href="/"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          className="flex items-center justify-center z-[1] hover:animate-pulse"
        >
          <Logo className="w-32 aspect-square mb-6" />
          <h1 className="font-bold italic text-6xl text-primary mb-6">
            Tickets22
          </h1>
        </Link>
        <div className={`absolute w-96 left-16 aspect-square rounded-full z-0 ${isLogoHovered ? 'blur-lg bg-gray-200/80' : 'bg-gray-200/50'}  transition-all duration-100 ease-in-out`} />
      </div>
    </div>
  )
}

export default Login