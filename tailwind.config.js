module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", "class"],
  theme: {
  	fontFamily: {
  		display: [
  			'Inter',
  			'-apple-system',
  			'BlinkMacSystemFont',
  			'Segoe UI"',
  			'Roboto',
  			'Helvetica Neue"',
  			'Arial',
  			'Noto Sans"',
  			'sans-serif',
  			'Apple Color Emoji"',
  			'Segoe UI Emoji"',
  			'Segoe UI Symbol"',
  			'Noto Color Emoji"'
  		]
  	},
  	extend: {
  		boxShadow: {
  			slider: '0 0 0 5px rgba(0, 0, 0, 0.3)'
  		},
  		keyframes: {
  			'scale-in': {
  				'0%': {
  					opacity: 0,
  					transform: 'scale(0)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'scale(1)'
  				}
  			},
  			'slide-down': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(-10px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-up': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-up-fade': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(2px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-right-fade': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateX(-2px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-down-fade': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(-2px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-left-fade': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateX(2px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateX(0)'
  				}
  			},
  			'enter-from-right': {
  				'0%': {
  					transform: 'translateX(200px)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: 1
  				}
  			},
  			'enter-from-left': {
  				'0%': {
  					transform: 'translateX(-200px)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: 1
  				}
  			},
  			'exit-to-right': {
  				'0%': {
  					transform: 'translateX(0)',
  					opacity: 1
  				},
  				'100%': {
  					transform: 'translateX(200px)',
  					opacity: 0
  				}
  			},
  			'exit-to-left': {
  				'0%': {
  					transform: 'translateX(0)',
  					opacity: 1
  				},
  				'100%': {
  					transform: 'translateX(-200px)',
  					opacity: 0
  				}
  			},
  			'scale-in-content': {
  				'0%': {
  					transform: 'rotateX(-30deg) scale(0.9)',
  					opacity: 0
  				},
  				'100%': {
  					transform: 'rotateX(0deg) scale(1)',
  					opacity: 1
  				}
  			},
  			'scale-out-content': {
  				'0%': {
  					transform: 'rotateX(0deg) scale(1)',
  					opacity: 1
  				},
  				'100%': {
  					transform: 'rotateX(-10deg) scale(0.95)',
  					opacity: 0
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			},
  			'fade-out': {
  				'0%': {
  					opacity: 1
  				},
  				'100%': {
  					opacity: 0
  				}
  			},
  			'toast-hide': {
  				'0%': {
  					opacity: 1
  				},
  				'100%': {
  					opacity: 0
  				}
  			},
  			'toast-slide-in-right': {
  				'0%': {
  					transform: '`translateX(calc(100% + 1rem))`'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			'toast-slide-in-bottom': {
  				'0%': {
  					transform: '`translateY(calc(100% + 1rem))`'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			'toast-swipe-out': {
  				'0%': {
  					transform: 'translateX(var(--radix-toast-swipe-end-x))'
  				},
  				'100%': {
  					transform: '`translateX(calc(100% + 1rem))`'
  				}
  			},
  			'background-position-spin': {
  				'0%': {
  					backgroundPosition: 'top center'
  				},
  				'100%': {
  					backgroundPosition: 'bottom center'
  				}
  			},
  			shine: {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			}
  		},
  		animation: {
  			'scale-in': 'scale-in 0.2s ease-in-out',
  			'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  			'enter-from-right': 'enter-from-right 0.25s ease',
  			'enter-from-left': 'enter-from-left 0.25s ease',
  			'exit-to-right': 'exit-to-right 0.25s ease',
  			'exit-to-left': 'exit-to-left 0.25s ease',
  			'scale-in-content': 'scale-in-content 0.2s ease',
  			'scale-out-content': 'scale-out-content 0.2s ease',
  			'fade-in': 'fade-in 0.2s ease',
  			'fade-out': 'fade-out 0.2s ease',
  			'toast-hide': 'toast-hide 100ms ease-in forwards',
  			'toast-slide-in-right': 'toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			'toast-slide-in-bottom': 'toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			'toast-swipe-out': 'toast-swipe-out 100ms ease-out forwards',
  			'background-position-spin': 'background-position-spin 3000ms infinite alternate',
  			shine: 'shine var(--duration) infinite linear'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  		}
  	}
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-radix")(), require("tailwindcss-animate")],
};
