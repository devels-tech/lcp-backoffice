import { UseFormRegister } from 'react-hook-form'

interface IInputBasicProps {
  register: UseFormRegister<any>
  id: string
  label: string
  rules: object
  placeholder?: string
  inputClasses?: string
  containerClasses?: string
  defaultValue?: string | number
  disabled?: boolean
}

export const TextArea = ({
  register,
  id,
  label,
  rules,
  defaultValue,
  placeholder,
  inputClasses,
  containerClasses,
  disabled = false
}: IInputBasicProps) => {
  return (
    <div className={`w-full ${containerClasses}`}>
      <label htmlFor={id}>
        {label}
      </label>

      <textarea
        {...register(id, rules)}
        id={id}
        name={id}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-300 leading-8 transition-colors duration-200 ease-in-out ${inputClasses}`}
      />
    </div>
  )
}
