/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'gruvbox-bg': '#282828',
        'gruvbox-bg0': '#282828',
        'gruvbox-bg1': '#3c3836',
        'gruvbox-bg2': '#504945',
        'gruvbox-bg3': '#665c54',
        'gruvbox-bg4': '#7c6f64',
        'gruvbox-fg': '#ebdbb2',
        'gruvbox-fg0': '#fbf1c7',
        'gruvbox-fg1': '#ebdbb2',
        'gruvbox-fg2': '#d5c4a1',
        'gruvbox-fg3': '#bdae93',
        'gruvbox-fg4': '#a89984',
        'gruvbox-gray': '#928374',
        'gruvbox-red': '#cc241d',
        'gruvbox-green': '#98971a',
        'gruvbox-yellow': '#d79921',
        'gruvbox-blue': '#458588',
        'gruvbox-purple': '#b16286',
        'gruvbox-aqua': '#689d6a',
        'gruvbox-orange': '#d65d0e',
      }
    },
  },
  plugins: [],
}
