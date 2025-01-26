export default function Card({ title, value, change }) {
  return (
    <div className="md:p-6 p-3 bg-white border border-gray-200 rounded-lg">
      <h3 className="md:text-[19px] font-semibold text-gray-700 pb-3 border-b">{title}</h3>
      <div className="flex items-center justify-between pt-5">
      <p className="md:text-3xl text-xl font-bold text-[#1e4846] mt-2">{value}</p>
      {/* <p className={`text-sm p-1 font-medium ${change > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
        {change > 0 ? (
          <>
            <span className="text-sm">↑</span> {change}%
          </>
        ) : (
          <>
            <span className="text-sm">↓</span> {Math.abs(change)}%
          </>
        )}
      </p> */}
      </div>
    </div>
  );
}