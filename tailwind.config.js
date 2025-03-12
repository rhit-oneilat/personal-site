/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'gruvbox': {
          'bg': '#282828',
          'bg0': '#282828',
          'bg1': '#3c3836',
          'bg2': '#504945',
          'bg3': '#665c54',
          'bg4': '#7c6f64',
          'fg': '#ebdbb2',
          'fg0': '#fbf1c7',
          'fg1': '#ebdbb2',
          'fg2': '#d5c4a1',
          'fg3': '#bdae93',
          'fg4': '#a89984',
          'gray': '#928374',
          'red': '#cc241d',
          'green': '#98971a',
          'yellow': '#d79921',
          'blue': '#458588',
          'purple': '#b16286',
          'aqua': '#689d6a',
          'orange': '#d65d0e'
        }
      }
    },
  },
  plugins: [],
}
