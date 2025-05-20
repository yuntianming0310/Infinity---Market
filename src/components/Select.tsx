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
    <select
      value={value}
      onChange={onChange}
      className={`text-lg py-3 px-8 border ${
        type === 'white' ? 'border-gray-100' : 'border-gray-300'
      } rounded-sm bg-white text-3xl font-medium shadow-sm focus:outline-none`}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
