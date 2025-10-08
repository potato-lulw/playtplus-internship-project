'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Bell, Search, Settings } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { redirect, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const getColorFromName = (name: string) => {
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-pink-500',
        'bg-purple-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-indigo-500',
        'bg-orange-500',
    ]
    const index = name
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[index]
}

const Navbar = () => {
    const { data } = useSession()
    const user = data?.user
    const { name, avatar } = user || {}

    const initials = useMemo(() => {
        if (!name) return
        return name
            .split(' ')
            .slice(0, 2)
            .map(n => n[0].toUpperCase())
            .join('')
    }, [name])

    const avatarBg = useMemo(() => getColorFromName(name || ''), [name])

    const router = useRouter()

    return (
        <nav className="w-full sticky top-0 bg-background border-b border-border z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
                <div >
                    {/* Left: Logo */}
                    <Link href={'/'} className="flex items-center gap-2">
                        <Image src="/logo.png" alt="logo" width={40} height={40} />
                        <h1 className="text-lg font-semibold hidden sm:block">PlaytPlus</h1>
                    </Link>
                </div>

                {/* Middle: Search (only if logged in) */}
                {user && (
                    <div className="flex-1 max-w-xs mx-4 flex items-center border border-border rounded-md bg-muted px-2 text-gray-500">
                        <Search size={20} className="hidden sm:block" />
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-full border-none placeholder:text-gray-500 !bg-muted"
                        />
                    </div>
                )}

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <ThemeToggle />
                            <Settings className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                            <Bell className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />

                            {/* Avatar / initials */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className='focus:outline-none'>
                                    {avatar ? (

                                        <Avatar >
                                            <AvatarImage src={avatar} alt={"initials"} className="object-cover" />
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>
                                        // <Image
                                        //     src={avatar}
                                        //     alt="avatar"
                                        //     width={36}
                                        //     height={36}
                                        //     className="rounded-full border border-border cursor-pointer"
                                        // />
                                    ) : (
                                        <div
                                            className={`w-9 h-9 ${avatarBg} text-white flex items-center justify-center rounded-full font-semibold cursor-pointer`}
                                        >
                                            {initials}
                                        </div>
                                    )}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuItem asChild><Link href={'/profile'}>Profile</Link></DropdownMenuItem>

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem  className='p-1 hover:bg-none'>
                                        <Button className='w-full bg-secondary hover:bg-secondary/90' onClick={() => signOut()}>Logout</Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>


                        </>
                    ) : (
                        <>
                            <ThemeToggle />
                            <Button
                                onClick={() => router.push("/login")}
                                className="px-3 py-1 border border-border text-white gradient-or-toright  transition"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => router.push("/register")}
                                className="px-3 py-1  text-white bg-secondary hover:bg-primary/80 transition"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
