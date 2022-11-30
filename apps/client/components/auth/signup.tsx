import Logo from '@images/logo.svg'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import validateEmail from '@lib/validate-email'
import emailValid from '@services/security/email-valid'
import CheckmarkIcon from '@images/checkmark.svg'
import RefreshIcon from '@images/refresh.svg'
import CrossIcon from '@images/cross.svg'
import signup from '@services/security/signup'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Loader from '@components/loader'

enum ValidationState {
  EMPTY,
  LOADING,
  VALID,
  INVALID,
}

const Signup = () => {
  const router = useRouter()
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [email, setEmail] = useState('')
  const [emailValidation, setEmailValidation] = useState(ValidationState.EMPTY)
  const [password, setPassword] = useState('')
  const [passwordValidation, setPasswordValidation] = useState(ValidationState.EMPTY)
  const [submitting, setSubmitting] = useState(false)

  const signupMutation = signup({
    onSuccess: () => {
      localStorage.setItem('auth', 'true')
      router.push('/')
    },
    onError: (e) => {
      toast.error(e.message)
    },
    onSettled: () => {
      setSubmitting(false)
    },
  })

  const emailMutation = emailValid({
    onSuccess: () => setEmailValidation(ValidationState.VALID),
    onError: () => setEmailValidation(ValidationState.INVALID),
  })

  useEffect(() => {
    if (emailValidation !== ValidationState.LOADING) return

    emailMutation.mutate({
      email,
      type: 'signup',
    })
  }, [emailValidation])

  const handleSignup = (e: any) => {
    e.preventDefault()
    if (emailValidation !== ValidationState.VALID) toast.error('Please enter a valid email address')
    if (passwordValidation !== ValidationState.VALID) toast.error('Please enter a valid password')

    if (emailValidation !== ValidationState.VALID || passwordValidation !== ValidationState.VALID) return

    setSubmitting(true)
    signupMutation.mutate({
      email,
      password,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-x-hidden">
      <div className="flex flex-col items-start justify-center gap-8 w-80 mx-auto">
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-xl">
            Hello There
          </h1>
          <p className="text-sm text-gray-400 ">
            Create an account to track your tickets
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
                onFocus={() => setPasswordValidation(ValidationState.EMPTY)}
                onBlur={() => {
                  if (!password || password.length === 0) return setPasswordValidation(ValidationState.EMPTY)
                  setPasswordValidation(password.length >= 8 ? ValidationState.VALID : ValidationState.INVALID)
                }}
                onChange={(e) => {
                  const passwordInput = e.target.value
                  setPassword(passwordInput)
                }}
              />
              <div className="absolute w-6 right-3 top-1/2 -translate-y-1/2">
                {passwordValidation === ValidationState.LOADING &&
                  <RefreshIcon className="animate-spin fill-loading" />}
                {passwordValidation === ValidationState.VALID && <CheckmarkIcon className="fill-valid" />}
                {passwordValidation === ValidationState.INVALID && <CrossIcon className="fill-invalid" />}
              </div>
            </div>
            {passwordValidation === ValidationState.INVALID && (
              <p className="text-xs text-gray-400">
                Password must be at least 8 characters
              </p>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSignup}
            className="group bg-primary text-white rounded-md p-2 border border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-all duration-200 ease-in-out"
          >
            {submitting ? <Loader color={`bg-gray-50 group-hover:bg-primary`} /> : 'Create Account'}
          </button>
        </form>
        <p className="text-sm text-center w-full text-gray-700">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden">
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
          <Logo className="w-24 md:w-32 aspect-square mb-6" />
          <h1 className="font-bold italic text-5xl lg:text-6xl text-primary mb-6">
            Tickets22
          </h1>
        </Link>
        <div className={`absolute w-96 left-16 aspect-square rounded-full z-0 ${isLogoHovered ? 'blur-lg bg-gray-200/80' : 'bg-gray-200/50'}  transition-all duration-100 ease-in-out`} />
      </div>
    </div>
  )
}

export default Signup