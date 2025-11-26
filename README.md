# 🌟 Sukesh Ram - Portfolio Website

A modern, interactive portfolio website showcasing my journey as a software engineer, featuring cutting-edge web technologies and stunning visual effects.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0.7-38B2AC)

## ✨ Features

### 🎨 **Modern Design & Animations**
- **Glassmorphism UI**: Beautiful glass-effect cards with backdrop blur
- **3D Carousel**: Interactive 3D project showcase with auto-rotation
- **Animated Timeline**: Chrome-effect timeline with shooting star moon icon
- **Parallax Backgrounds**: Dynamic watercolor-style backgrounds
- **Smooth Animations**: GSAP-powered transitions and micro-interactions

### 🚀 **Interactive Elements**
- **3D Project Carousel**: Cylindrical carousel with hover-to-pause functionality
- **Responsive Navigation**: Pill-style navigation with smooth scrolling
- **Modal Project Details**: Expandable project cards with GitHub links
- **Dynamic Tech Stack**: Animated tech stack pills and icons
- **Contact Form**: EmailJS integration for direct communication

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all device sizes
- **Touch-Friendly**: Gesture support for mobile interactions
- **Performance Optimized**: Lazy loading and efficient rendering

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19.0.0** - Latest React with concurrent features
- **Vite 6.1.0** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.0.7** - Utility-first CSS framework

### **3D & Animation Libraries**
- **Three.js 0.173.0** - 3D graphics and WebGL
- **@react-three/fiber 9.0.4** - React renderer for Three.js
- **@react-three/drei 10.0.0** - Useful helpers for react-three-fiber
- **GSAP 3.13.0** - Professional-grade animations
- **Framer Motion 12.4.5** - Production-ready motion library

### **UI & Styling**
- **React Icons 5.5.0** - Popular icon library
- **Tailwind Merge 3.0.1** - Utility for merging Tailwind classes
- **React Responsive 10.0.0** - Media queries for React

### **Communication**
- **EmailJS 4.4.1** - Client-side email service

### **Development Tools**
- **ESLint 9.19.0** - Code linting and formatting
- **TypeScript Support** - Type definitions for better development

## 🏗️ Project Structure

```
portfolio_site/
├── public/
│   ├── assets/
│   │   ├── logos/           # Technology logos and icons
│   │   ├── projects/        # Project screenshots
│   │   ├── socials/         # Social media icons
│   │   └── work_experiences/ # Company logos
│   └── models/              # 3D models (GLB files)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── PillNav.jsx     # Navigation component
│   │   ├── Timeline.jsx    # Animated timeline
│   │   ├── Carousel.jsx    # 3D project carousel
│   │   └── ...
│   ├── sections/           # Main page sections
│   │   ├── Home.jsx        # Landing section
│   │   ├── About.jsx       # About me section
│   │   ├── Experiences.jsx # Work experience timeline
│   │   └── Projects.jsx    # 3D project showcase
│   ├── constants/          # Data and configuration
│   └── data/              # Static data files
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SUKESH127-art/portfolio_site.git
   cd portfolio_site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5176
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Key Sections

### 🏠 **Home Section**
- Dynamic text animations with GSAP
- Parallax background effects
- Responsive design with mobile optimization

### 👨‍💻 **About Section**
- Skills showcase with animated icons
- Interactive tech stack display
- Glassmorphism card design

### 💼 **Experience Timeline**
- **Chrome-effect timeline** with metallic appearance
- **Shooting star moon icon** at the tip
- Interactive work experience cards
- Company logos and technology stacks

### 🚀 **Projects Showcase**
- **3D Cylindrical Carousel** with auto-rotation
- **Hover-to-pause** functionality
- **Modal expansion** with project details
- **GitHub integration** with direct links
- **Responsive design** for all devices

### 📧 **Contact Integration**
- EmailJS-powered contact form
- Direct email communication
- Social media links

## 🎨 Design Features

### **Glassmorphism Effects**
- Backdrop blur with transparency
- Subtle borders and shadows
- Hover state animations

### **3D Interactions**
- Perspective-based carousel
- Smooth rotation animations
- Depth-aware hover effects

### **Color Scheme**
- Watercolor-style backgrounds
- Metallic chrome accents
- Consistent brand colors

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔧 Customization

### **Adding New Projects**
1. Update `src/constants/index.js`
2. Add project images to `public/assets/projects/`
3. Update technology logos in `public/assets/logos/`

### **Modifying Animations**
- GSAP animations in component files
- Framer Motion for React-specific animations
- CSS transitions for hover effects

### **Styling Changes**
- Tailwind CSS classes for rapid styling
- Custom CSS in component files
- Global styles in `src/index.css`

## 🌐 Live Demo

Visit the live portfolio: **[sukeshram.dev](https://sukeshram.dev)**

## 📧 Contact

- **Email**: [sukesh.ram@example.com](mailto:sukesh.ram@example.com)
- **LinkedIn**: [linkedin.com/in/sukeshram](https://www.linkedin.com/in/sukeshram/)
- **GitHub**: [github.com/SUKESH127-art](https://github.com/SUKESH127-art)
- **Instagram**: [@sukesh_ram_](https://www.instagram.com/sukesh_ram_/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Vercel Glass UI** - Inspiration for 3D carousel design
- **Three.js Community** - 3D graphics resources
- **Tailwind CSS** - Utility-first CSS framework
- **React Three Fiber** - React integration for Three.js

---

<div align="center">

**Made with ❤️ by [Sukesh Ram](https://github.com/SUKESH127-art)**

*React + Vite + Tailwind + Three.js*

</div>