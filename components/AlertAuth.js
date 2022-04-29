export default function AlertAuth({ isSuccess, msg }) {
  if(isSuccess) {
    return (
        <p className="text-sm font-medium text-green-600 mt-12 py-2 px-4 rounded-sm bg-green-100">
          { msg }
        </p>
    )
  }
  return (
    <p className="text-sm font-medium text-red-600 mt-12 py-2 px-4 rounded-sm bg-red-100">
      { msg }
    </p>
  )
}