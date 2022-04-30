export default function AlertAuth({ isSuccess, msg }) {
  if(isSuccess) {
    return (
        <p className="text-sm inline-block font-medium text-green-600 mb-4 py-2 px-4 rounded-sm bg-green-100">
          { msg }
        </p>
    )
  }
  return (
    <p className="text-sm inline-block font-medium text-red-600 mb-4 py-2 px-4 rounded-sm bg-red-100">
      { msg }
    </p>
  )
}