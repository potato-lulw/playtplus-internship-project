export const getInitials = (name: string) => {
    if (!name) return
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0].toUpperCase())
        .join('')
}

export const getColorFromName = (name: string) => {
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