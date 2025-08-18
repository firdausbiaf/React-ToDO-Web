import { Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export const FilterControls = ({ 
  filter, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  onClearCompleted,
  completedCount 
}) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-4 mb-6"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search todos..."
          className="pl-10"
        />
      </div>
      
      <div className="flex gap-2">
        {filters.map((filterOption) => (
          <Button
            key={filterOption.value}
            variant={filter === filterOption.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(filterOption.value)}
            className="transition-all duration-200"
          >
            {filterOption.label}
          </Button>
        ))}
        
        {completedCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onClearCompleted}
            className="ml-2"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Completed
          </Button>
        )}
      </div>
    </motion.div>
  )
}