'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc' // clean Google logo icon
import { LogIn } from 'lucide-react'

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>()
  const router = useRouter()

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        console.error('Login failed:', res.error)
      } else {
        console.log('Logged in successfully via NextAuth')
        router.push('/')
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-[#f5f5f5]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex bg-background flex-col gap-3 max-w-md w-full mx-auto mt-10 p-12 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <div className='flex justify-center'>
          <Image src={'/logo.png'} alt="Logo" width={50} height={50} />
        </div>
        <div>
          <h1 className='text-center text-xl font-semibold mb-2'>Welcome Back!</h1>
          <p className='text-center text-sm text-muted-foreground'>Log in to your account</p>
        </div>

        {/* Email */}
        <Label className='' htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password */}
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required', minLength: 6 })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message || 'Password must be at least 6 characters'}
          </p>
        )}

        {/* Submit button */}
        <Button type="submit" className='gradient-or-toright flex items-center justify-center gap-2'>
          <LogIn className="w-4 h-4" />
          Log In
        </Button>

        {/* Divider */}
        <div className='flex items-center gap-2 my-4'>
          <div className='h-px flex-1 bg-gray-300' />
          <span className='text-gray-500 text-sm'>or</span>
          <div className='h-px flex-1 bg-gray-300' />
        </div>

        {/* Google Sign-in */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2"
        >
          <FcGoogle className="w-5 h-5" />
          Sign in with Google
        </Button>
      </form>
    </div>
  )
}
