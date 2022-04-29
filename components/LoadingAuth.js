export default function LoadingAuth({ msgLoading }) {
  return (
    <div className="absolute inset-0 bg-black/60 flex justify-center items-center">
      <h1 className="text-sm font-bold rounded-sm py-2 px-4 bg-gray-700 text-white shadow-md inline-block animate-bounce uppercase">
        { msgLoading }
      </h1>
    </div>
  )
}