import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  type?: 'default' | 'white'
}

function Select({
  options,
  value,
  onChange,
  type = 'default',
  ...props
}: SelectProps) {
  return (
    <div className='relative inline-block'>
      <select
        value={value}
        onChange={onChange}
        className={`
          relative
          bg-transparent
          rounded-lg
          border ${type === 'white' ? 'border-white/30' : 'border-black/30'}
          py-2 pl-4 pr-10
          text-2xl
          focus:outline-none
          focus:ring-2 focus:ring-black/10
          transition-all duration-300
          appearance-none
          cursor-pointer
          hover:border-opacity-50
          ${type === 'white' ? 'text-white' : 'text-black'}
        `}
        {...props}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            className={`
              ${type === 'white' ? 'text-white' : 'text-black'}
              bg-white dark:bg-gray-800
              py-2
            `}
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`
          absolute right-3 top-1/2 -translate-y-1/2
          w-6 h-6
          pointer-events-none
          transition-transform duration-300
          ${type === 'white' ? 'text-white/70' : 'text-black/70'}
        `}
      />
    </div>
  )
}

export default Select
