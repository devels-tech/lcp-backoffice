import { UseFormRegister } from 'react-hook-form'

interface IToggleProps {
  register: UseFormRegister<any>
  id: string
  labelTruthy: string
  labelFalsy: string
  rules?: object
  defaultChecked?: boolean
  inputClasses?: string
  containerClasses?: string
  disabled?: boolean
  stateWatcher: boolean
}

export const Toggle = ({
  id,
  register,
  labelFalsy,
  labelTruthy,
  stateWatcher,
  defaultChecked,
  rules,
  disabled,
  inputClasses,
  containerClasses
}: IToggleProps) => {
  return (
    <div className={`flex justify-start items-center gap-x-2 ${containerClasses}`}>
      <label htmlFor={id}>
        { stateWatcher ? labelTruthy : labelFalsy }
      </label>

      <label className={`switch ${inputClasses}`}>
        <input
          {...register(id, rules)}
          id={id}
          name={id}
          type='checkbox'
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
        <span className='slider round'></span>
      </label>
    </div>
  )
}
