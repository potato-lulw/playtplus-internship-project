'use client'

import { useForm, SubmitHandler, set } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc' // clean Google logo icon
import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type LoginFormValues = {
    email: string
    password: string
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>()
    const [isLoading, setIsLoading] = useState(false)
    const {data} = useSession();


    const router = useRouter()
    
    // if(data?.user) {
    //     router.replace('/')
    // }

    const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
        try {
            setIsLoading(true)
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })

            if (res?.error) {
                toast.error('Login failed!')
                console.error('Login failed:', res.error)
            } else {
                toast.success('Login successful!')
                console.log('Logged in successfully via NextAuth')
                router.push('/')
            }
        } catch (error) {

            toast.error('Error during login!')
            console.error('Error during login:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        await signIn('google', { callbackUrl: '/' })
    }

    return (
        <div className='flex flex-col min-h-screen  justify-center items-center w-full bg-gradient-to-br from-primary/50 to-secondary/20'>
            <div className='md:hidden absolute top-0 left-0 right-0 bottom-0 h-[20%] flex bg-gradient-to-br from-primary/50 to-secondary/50'></div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-1 md:flex-0   justify-center bg-background flex-col gap-2 md:max-w-md w-full mx-auto  md:p-12 px-16  md:h-fit md:rounded-2xl md:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
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
                    className='focus-visible:ring-1 focus-visible:ring-primary'
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                {/* Password */}
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    className='focus-visible:ring-1 focus-visible:ring-primary'
                    placeholder="Enter your password"
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message}
                    </p>
                )}

                {/* Submit button */}
                <Button type="submit" disabled={isLoading} className='gradient-or-toright flex items-center justify-center gap-2'>
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
