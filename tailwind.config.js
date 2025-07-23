/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
		'./node_modules/shadcn/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				Vazirmatn: 'Vazirmatn',
				VazirmatnMedium: 'Vazirmatn Medium',
				VazirmatnBold: 'Vazirmatn Bold'
			},
			colors: {
				orange: {
					'250': '#E1A772'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			objectPosition: {
				'custom-x': '-162px 0px',
				'custom-x2': '12px 0px'
			},
			boxShadow: {
				custom: '0 0 0 0 rgb(255, 255, 255)'
			},
			backgroundPosition: {
				'custom-p': '0% 50%',
				'custom-p2': '4% 50%'
			},
			backgroundSize: {
				'custom-s': '42px 411px',
				'custom': '22px 127px',
				'custom-arrow': '15px'
			},
			backgroundImage: {
				'custom-gradient': 'linear-gradinet(rgba(30, 30 ,30, 0.9), #000 1810%)',
			},
			borderRadius: {
				custom: '0px 0px 20px 20px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				float: 'float 1500ms infinite ease-in-out',
				moveHorizontal: 'moveHorizontal 3000ms infinite ease-in-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				growImg: 'growImg 0.3s cubic-bezier(0,0,.7,1)',
				slideIn: 'slideIn 0.3s ease-out',
				fadeIn: '0.3s ease-out forwards',
			},
			keyframes: {
				float: {
					'0%, 100%': {
						transform: 'translatey(0px)'
					},
					'50%': {
						transform: 'translatey(-5px)'
					}
				},
				moveHorizontal: {
					'0%, 100%': {
						transform: 'translatex(0px)'
					},
					'50%': {
						trasnform: 'translatex(20px)'
					}
				},
				growImg: {
					'0%': {
						opacity: 0.3
					},
					'100%': {
						opacity: 1
					}

				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				slideIn: {
					from: {
						opacity: 0,
						transform: 'translatey(-20px)'
					},
					to: {
						opacity: 1,
						transform: 'translatey(0)'
					}
				},
				fadeIn: {
					from: {
						opacity: 0,
						transform: 'translateY(-20px) scale(0.95)',
					},
					to: {
						opacity: 1,
						transform: 'translateY(0) scale(1)',
					}
				},
			},
			width: {
				custom: 'calc(100%-100px)'
			}
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		},
		container: {
			center: 'true',
			padding: {
				DEFAULT: '0.75rem',
				lg: '2.5rem'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

