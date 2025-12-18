export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
