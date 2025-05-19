/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#1e2d3c',
                secondary: '#22c55e',
                accent: '#217592',
                accent2: '#da2761',
                accentLight: '#2a8cad',
                accentDark: '#195e75',
                accent3Light: '#e54d7f',
                accent3Dark: '#b81f50',
                primaryLight: '#2a3b4c',
                primaryDark: '#14202c',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}; 