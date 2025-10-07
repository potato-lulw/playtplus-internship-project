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
        <nav className="w-full sticky top-0 bg-background border-b border-border">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                    <h1 className="text-lg font-semibold hidden sm:block">PlaytPlus</h1>
                </div>

                {/* Middle: Search (only if logged in) */}
                {user && (
                    <div className="flex-1 max-w-xs mx-4 flex items-center border border-border rounded-md bg-muted px-2">
                        <Search size={20} className="hidden sm:block" />
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-full border-none !bg-muted"
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
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt="avatar"
                                    width={36}
                                    height={36}
                                    className="rounded-full border border-border cursor-pointer"
                                />
                            ) : (
                                <div
                                    className={`w-9 h-9 ${avatarBg} text-white flex items-center justify-center rounded-full font-semibold cursor-pointer`}
                                >
                                    {initials}
                                </div>
                            )}
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
