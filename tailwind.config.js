/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Exo-2' : '"Exo 2", sans-serif',
        'Orbitron' : '"Orbitron", sans-serif'
      },
      backgroundImage : {
        'login-reg-img-md' : 'url("/src/assets/4.jpg")', 
        'login-reg-img-sm' : 'url("/src/assets/8.jpg")', 
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

