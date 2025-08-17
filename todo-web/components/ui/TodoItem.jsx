import { useState } from 'react'
import { Trash2, Edit3, Calendar, Flag, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isPast } from 'date-fns'
import { cn, PRIORITY_COLORS, PRIORITY_LABELS } from '@/lib/utils'

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ? new Date(todo.dueDate) : null)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, {
        text: editText.trim(),
        priority: editPriority,
        dueDate: editDueDate?.toISOString() || null
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate ? new Date(todo.dueDate) : null)
    setIsEditing(false)
  }

  const getDueDateColor = () => {
    if (!todo.dueDate) return ''
    const dueDate = new Date(todo.dueDate)
    if (isPast(dueDate) && !isToday(dueDate)) return 'text-red-500'
    if (isToday(dueDate)) return 'text-yellow-600'
    return 'text-muted-foreground'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      className="group"
    >
      <Card className={cn(
        "p-4 border-l-4 transition-all duration-200",
        PRIORITY_COLORS[todo.priority],
        todo.completed && "opacity-60"
      )}>
        <div className="flex items-start gap-3">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="mt-1"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave()
                    if (e.key === 'Escape') handleCancel()
                  }}
                  className="text-base"
                  autoFocus
                />
                
                <div className="flex gap-2 flex-wrap">
                  <Select value={editPriority} onValueChange={setEditPriority}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {editDueDate ? format(editDueDate, 'MMM dd') : 'Due date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={editDueDate}
                        onSelect={setEditDueDate}
                        disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {editDueDate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditDueDate(null)}
                    >
                      Clear Date
                    </Button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <motion.p
                  className={cn(
                    "text-base transition-all duration-300",
                    todo.completed && "line-through text-muted-foreground"
                  )}
                  animate={{
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  }}
                >
                  {todo.text}
                </motion.p>
                
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Flag className="h-3 w-3" />
                    <span className="text-muted-foreground">
                      {PRIORITY_LABELS[todo.priority]}
                    </span>
                  </div>
                  
                  {todo.dueDate && (
                    <div className={cn("flex items-center gap-1", getDueDateColor())}>
                      <Calendar className="h-3 w-3" />
                      <span>
                        {isToday(new Date(todo.dueDate)) 
                          ? 'Today' 
                          : format(new Date(todo.dueDate), 'MMM dd, yyyy')
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <AnimatePresence>
            {!isEditing && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(todo.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}