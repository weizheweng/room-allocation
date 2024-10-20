'use client'
import { ChangeEvent, FocusEvent, MouseEvent, useState } from "react"

const getQuantity = (quantity?: number, min?: number, max?: number) => {
  if (quantity === undefined || min === undefined || max === undefined) return 0
  if (quantity <= min) {
    return min
  }
  if (quantity >= max) {
    return max
  }
  return quantity
}

const buttonStyles = 'h-[48px] w-[48px] border border border-solid border-blue-500 p-[4px] rounded-[2px] disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed'

export interface PeopleQtyProps {
  min?: number,
  max: number,
  step?: number,
  name?: string,
  value?: number,
  disabled?: boolean,
  incrementDisabled?: boolean,
  decrementDisabled?: boolean,
  onChange?: (e?: ChangeEvent<HTMLInputElement>, value?: number) => void,
  onBlur?: (e: FocusEvent<Element>) => void,
  onIncrement?: (value?: number) => void,
  onDecrement?: (value?: number) => void,
  onClick?: (e: MouseEvent<HTMLInputElement >) => void,
}

export const PeopleQty = ({
  min = 0,
  max,
  step = 1,
  name,
  value: valueProp,
  disabled,
  incrementDisabled,
  decrementDisabled,
  onChange,
  onBlur,
  onIncrement,
  onDecrement,
  onClick,
}: PeopleQtyProps) => {
  const [quantity, setQuantity] = useState(getQuantity(valueProp, min, max))

  const handleIncrement = () => {
    const value = getQuantity(quantity + step, min, max)
    onIncrement?.(value)
    setQuantity(value)
    onChange?.(undefined, value)
  }

  const handleDecrement = () => {
    const value = getQuantity(quantity - step, min, max)
    onDecrement?.(value)
    setQuantity(value)
    onChange?.(undefined, value)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = getQuantity(Number(e.target.value), min, max)
    setQuantity(value)
    onChange?.(e, value)
  }

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    onClick?.(e)
  }

  return (
    <div className='flex gap-2 h-full' onBlur={onBlur}>
      <button
        onClick={handleDecrement}
        className={buttonStyles}
        disabled={quantity === min || disabled || decrementDisabled}
        name="decrement"
      >
        －
      </button>
      <input
        className="h-[48px] w-[48px] text-center border border-black min-w-12 rounded-[2px] disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
        type='number'
        value={quantity.toString()}
        min={min}
        max={max}
        onChange={handleChange}
        onClick={handleClick}
        disabled={disabled}
        name={name || "input quantity"}
      />
      <button
        onClick={handleIncrement}
        className={buttonStyles}
        disabled={quantity === max || disabled || incrementDisabled}
        name="increment"
      >
        ＋
      </button>
    </div>
  )
}
