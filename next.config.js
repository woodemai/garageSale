/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'res.cloudinary.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'avatars.yandex.net',
            'cdn.discordapp.com'
        ]
    }
}

module.exports = nextConfig
