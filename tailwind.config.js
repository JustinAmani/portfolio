/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './templates/**/*.html.twig',
        './assets/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4A3F8F',
                secondary: '#6C63FF',
                accent: '#3B82F6',
                dark: '#1E1E2E',
                light: '#F8F9FA',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
                'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'bounce-in': 'bounceIn 0.8s ease-out forwards',
                'typing': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                typing: {
                    'from': { width: '0' },
                    'to': { width: '100%' },
                },
                'blink-caret': {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: '#6C63FF' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};