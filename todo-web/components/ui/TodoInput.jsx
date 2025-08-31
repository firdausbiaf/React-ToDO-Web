import { useState } from 'react'
import { Plus, Calendar, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { PRIORITY_LABELS } from '@/lib/utils'

export const TodoInput = ({ onAddTodo }) => {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo({
        text: text.trim(),
        priority,
        dueDate
      })
      setText('')
      setPriority('medium')
      setDueDate(null)
      setShowAdvanced(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-4 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={showAdvanced ? 'bg-accent' : ''}
            >
              <Flag className="h-4 w-4" />
            </Button>
            <Button type="submit" disabled={!text.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          
        </form>
      </Card>
    </motion.div>
  )
}