import Image from "next/image";

export default function Banners({ image, title, description }) {
  return (
    <div className="container mx-auto flex md:flex-row flex-col items-center justify-between">

      <div>
        <Image src={image} alt="Banner" layout="intrinsic" width={620} height={720} />
      </div>

      <div className="md:w-2/5 mx-auto md:p-0 p-5">
        <h1 className="mb-4 text-2xl font-bold font-domine">{title}</h1>
        <p className="leading-relaxed font-semibold text-sm text-gray-600 font-montserratSemiBold">{description}</p>
      </div>
    </div>
  );
}
