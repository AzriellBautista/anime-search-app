/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    ".public/index.html",
  ],
  theme: {
    extend: {
      colors: {

      }
    },
  },
}

// npx tailwindcss -i .src\input.css -o .\src\App.css --watch