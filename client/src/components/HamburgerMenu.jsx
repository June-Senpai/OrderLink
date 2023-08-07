import { useState } from "react"
import { motion } from "framer-motion"

export const HamburgerMenu = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  const topVariants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    open: {
      opacity: 0,
    },
  }
  const centerVariants = {
    closed: {
      opacity: 1,
    },

    open: {
      rotate: 45,
      translateY: 2.9,
      scale: 1.2,
    },
  }

  const bottomVariants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    open: {
      rotate: -45,
      translateY: -7.9,
      scale: 1.2,
    },
  }

  return (
    <button
      className="outline-none focus:outline-none"
      onClick={() => {
        setIsOpen(!isOpen)
        onClick && onClick()
      }}
    >
      <motion.div
        className="w-8 h-1 bg-black rounded-full"
        variants={topVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.div
        className="w-8 h-1 bg-black rounded-full my-1.5"
        variants={centerVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.div
        className="w-8 h-1 bg-black rounded-full"
        variants={bottomVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </button>
  )
}
