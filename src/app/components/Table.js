export default function Table({rows}) {
  if (!rows || rows.length === 0) {
    return (
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <p className="text-center text-gray-500">No recent transactions available</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg ">
      <table className="min-w-full table-auto md:w-auto  overflow-scroll">
        <thead className="border-b">
          <tr className="grid grid-cols-4">
            {['Photo', 'Watch Name', 'Price', 'Shipped Status']?.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, idx) => (
            <div key={idx} className={``}>
          {row.items.map((item, index)=>(
            <tr className="grid grid-cols-4 border-b items-center p-1" key={index}>
                <td className="px-6 py-4 text-sm">
                  <img src={item.image} alt={item.title} className="w-8 h-8 object-cover text-center rounded-lg"/>
                </td>
              <td className="px-6 py-4  text-sm">{item.title}</td>
              <td className="px-6 py-4  text-sm text-yellow-600">{new Intl.NumberFormat("en-US", {style: "currency", currency: "AED"}).format(item.price)}</td>
              <td
                    className={`p-1 rounded-lg text-sm font-semibold text-center border capitalize ${
                      row.status === "paid"
                        ? "text-green-600 bg-green-50 border-green-600"
                        : row.status === "pending"
                        ? "text-yellow-500 bg-yellow-50 border-yellow-500"
                        : row.status === "cancelled"
                        ? "text-red-600 bg-red-50 border-red-600"
                        : row.status === "delivered"
                        ? "text-green-500 bg-green-50 border-green-500"
                        : row.status === "shipped"
                        ? "text-blue-600 bg-blue-50 border-blue-600"
                        : "text-gray-600 bg-gray-50 border-gray-300"
                    }`}
                  >{row.status}</td>
            </tr>
          ))}
        </div>
          ))}
        </tbody>
      </table>
    </div>
  );
}
