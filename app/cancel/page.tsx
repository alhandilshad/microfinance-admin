import Link from "next/link";

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 font-montserratSemiBold">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">Your payment has been cancelled. If this was a mistake, you can try again.</p>
        <Link
          href="/"
          className="inline-block px-6 py-2 text-white font-montserratSemiBold bg-black rounded-full transition duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
