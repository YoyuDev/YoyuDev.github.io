/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 克制的蓝紫 Accent，只在关键交互元素上使用
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        ink: {
          // 暗色模式下的中性背景
          950: '#0b0b0f',
          900: '#111114',
          850: '#15151a',
          800: '#1b1b21',
        },
      },
      fontFamily: {
        // 全部使用系统字体栈：零网络请求，首屏最快
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Noto Sans SC',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      maxWidth: {
        page: '1200px',
      },
      borderRadius: {
        // 圆角不要过大，保持工程感
        card: '10px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
        lift: '0 8px 24px -12px rgb(15 23 42 / 0.18)',
      },
      keyframes: {
        'flow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-16' },
        },
      },
      animation: {
        'flow-pulse': 'flow-pulse 2.6s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        'dash-flow': 'dash-flow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
