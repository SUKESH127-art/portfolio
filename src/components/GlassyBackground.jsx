import { useEffect, useState } from "react"
import PropTypes from "prop-types"

const AnimatedShape = ({
  size,
  position,
  color,
  shape,
}) => (
  <div
    className={`absolute mix-blend-multiply filter blur-lg animate-combined ${
      shape === "circle" ? "rounded-full" : "rounded-md"
    }`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${position.x}%`,
      top: `${position.y}%`,
      backgroundColor: color,
      animation: `
        float ${Math.random() * 10 + 10}s ease-in-out infinite,
        pulse ${Math.random() * 4 + 2}s ease-in-out infinite alternate,
        rotate ${Math.random() * 20 + 20}s linear infinite
      `,
    }}
  />
)

AnimatedShape.propTypes = {
  size: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
}

export function GlassyBackground({ children }) {
  const [shapes, setShapes] = useState([])

  useEffect(() => {
    const colors = [
      "#A3BCF7", // pastel sky blue
      "#FCE4EC", // pastel very light pink
      "#B7E5D2", // pastel mint
      "#FDF6B2", // pastel yellow (matches site gold tint)
      "#B794F4", // pastel purple (Tailwind purple-300)
      "#C7D2FE", // pastel blue (Tailwind blue-200)
      "#FFE4A3", // pastel warm yellow
      "#CFFAFE", // pastel cyan (Tailwind cyan-100)
      "#F5D0FE", // pastel pink (Tailwind pink-100)
      "#B5F3E8", // pastel teal
    ]
    
    const newShapes = Array.from({ length: 20 }, () => ({
      size: Math.random() * 150 + 50,
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? "circle" : "square",
    }))
    setShapes(newShapes)
  }, [])

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}
    >
      {/* Animated glassy background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-violet-500 opacity-30 animate-gradient-x" />
        {shapes.map((shape, index) => (
          <AnimatedShape key={index} {...shape} />
        ))}
        <div className="absolute inset-0 backdrop-blur-xl" />
      </div>

      {/* Content */}
      {children}
    </div>
  )
}

GlassyBackground.propTypes = {
  children: PropTypes.node.isRequired,
}

