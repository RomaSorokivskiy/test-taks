/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async() => {
        return [
            {
                source: '/auths',
                destination: '/table',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
