/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#3b82f6',
                    light: '#eff6ff', // blue-50
                },
                status: {
                    total: '#fcd34d', // amber-300 like
                    available: '#7dd3fc', // sky-300 like
                    inUse: '#f87171', // red-400 like
                },
            },
        },
    },
    plugins: [],
}
