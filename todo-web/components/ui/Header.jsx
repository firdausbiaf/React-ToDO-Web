import { CheckSquare } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { motion } from 'framer-motion'

export const Header = ({ activeTodosCount, completedTodosCount }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <CheckSquare className="h-8 w-8 text-primary" />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Todo App</h1>
          <p className="text-sm text-muted-foreground">
            {activeTodosCount} active, {completedTodosCount} completed
          </p>
        </div>
      </div>
      <ThemeToggle />
    </motion.header>
  )
}