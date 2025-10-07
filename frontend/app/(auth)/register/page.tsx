'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignUpMutation } from '@/lib/features/api/authApiSlice'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Label } from '@/components/ui/label'

type SignUpFormValues = {
    username: string
    email: string
    password: string
}

export default function SignUpPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>()
    const [signUp, { isLoading }] = useSignUpMutation()
    const router = useRouter()

    const onSubmit: SubmitHandler<SignUpFormValues> = async ({ username, email, password }) => {
        try {
            // Step 1: Signup via Express API
            await signUp({ name: username, email, password }).unwrap()

            // Step 2: Immediately log in via NextAuth for the jwt
            const loginRes = await signIn('credentials', {
                redirect: false,
                email,
                password,
                name: username,
            })

            if (loginRes?.error) {
                console.error('Login failed:', loginRes.error)
            } else {
                console.log('Logged in successfully via NextAuth')
                router.push('/')
            }
        } catch (error) {
            console.error('Signup failed:', error)
        }
    }

    return (
        <div className='flex flex-col min-h-screen justify-center items-center w-full bg-gradient-to-br from-primary/50 to-secondary/20' >
            <form onSubmit={handleSubmit(onSubmit)} className="flex  justify-center bg-background flex-col gap-2 md:max-w-md w-full mx-auto  md:p-12 px-16  h-screen md:h-fit md:rounded-2xl md:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className='md:hidden absolute top-0 left-0 right-0 bottom-0 h-[20%] flex bg-gradient-to-br from-primary/50 to-secondary/50'></div>
                <div className='flex justify-center'>
                    {/* Logo */}
                    <Image src={'/logo.png'} alt="Logo" width={50} height={50} />
                </div>
                <div>
                    <h1 className='text-center font-medium md:text-2xl text-xl'>Create an account!</h1>
                </div>

                <label className='bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text ' htmlFor='username'>Username</label>
                
                <Input
                    id='username'
                    type='text'
                    placeholder="Username"
                    className=' focus-visible:ring-1 focus-visible:ring-primary'
                    {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                <label className='bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text ' htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className='focus-visible:ring-1 focus-visible:ring-primary'
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <label className='bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text ' htmlFor="password">Password</label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required'})}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message }
                    </p>
                )}

                <Button type="submit" disabled={isLoading} className='gradient-or-toright mt-10'>
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </Button>
            </form>
        </div>
    )
}
