export default function InputLabel({ idLabel, labelText, type, placeholder, name, value, onChangeHandler }) {
  return (
    <div className="mb-6">
      <label htmlFor={ idLabel } className="inline-block mb-2 text-gray-700">{ labelText }</label>
      <input className="
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id={ idLabel }
        type={ type }
        placeholder={ placeholder }
        name={ name }
        onChange={ (onChangeHandler) ?? 0 }
        value={ value } />
    </div>
  )
}

export function TextareaLabel({ idLabel, labelText, placeholder, name, value, onChangeHandler }) {
  return (
    <div className="mb-6">
      <label htmlFor={ idLabel } className="inline-block mb-2 text-gray-700">{ labelText }</label>
      <textarea
      id={ idLabel }
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      name={ name }
      value={ value }
      placeholder={ placeholder }
      onChange={ (onChangeHandler) ?? 0 }
    ></textarea>
    </div>
  )
}