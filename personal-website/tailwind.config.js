/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{ts,tsx,mdx}",
		"./components/**/*.{ts,tsx,mdx}",
		"./pages/**/*.{ts,tsx,mdx}",
		"./app/content/**/*.{mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				muted: "var(--muted)",
				mutedForeground: "var(--muted-foreground)",
				card: "var(--card)",
				cardForeground: "var(--card-foreground)",
				border: "var(--border)",
				primary: "var(--primary)",
				primaryForeground: "var(--primary-foreground)",
				secondary: "var(--secondary)",
				secondaryForeground: "var(--secondary-foreground)",
				accent: "var(--accent)",
				accentForeground: "var(--accent-foreground)",
				destructive: "var(--destructive)",
				destructiveForeground: "var(--destructive-foreground)",
			},
			fontFamily: {
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
				mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
			},
		},
	},
	plugins: [],
};


