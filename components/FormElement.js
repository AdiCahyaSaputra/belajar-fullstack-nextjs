export default function FormElement({ title, submit, children, onSubmitHandler }) {
  return (
    <div className="block p-6 border border-gray-100 rounded-lg shadow-lg bg-white max-w-sm">
      <h1 className="text-3xl font-bold my-4 border-b border-blue-600 pb-4">{title}</h1>
      <form onSubmit={ (onSubmitHandler) }>
        { children }
        <button type="submit" className="
          mt-12
          px-6
          py-2.5
          bg-blue-600
          inline-block
          w-full
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out">{submit}</button>
      </form>
    </div>
  )
}