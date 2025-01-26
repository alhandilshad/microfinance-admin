import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-montserratSemiBold text-center text-[#2c5150]">
          Executive Committee
        </h1>
        <p className="font-montserratMedium text-xl text-[#2c5150] pt-8">
          My greatest motivation is the passion for what I do. Its not just
          about the work; it’s about the constant curiosity to overcome new
          challenges and create lasting values like reliability and trust. My
          goal is to realize our vision of a comprehensive platform for watch
          enthusiasts that covers all aspects of buying, selling, and service,
          and to make a sustainable impact on the industry together with my
          team.
        </p>

        <div className="flex md:flex-row flex-col items-center justify-center gap-14 mt-16">
          <div>
            <h1 className="text-4xl text-[#2c5150] font-montserratSemiBold">
              Frederike Knop, CEO
            </h1>
            <p className="font-montserratRegular pt-5">
              In July 2024, Frederike Knop was appointed CEO & Managing
              <br /> Director of Cleopatra Watches & Jewellery, having served as
              COO and Managing
              <br /> Director of the companys German subsidiaries since
              <br /> September 2023. With over a decade of experience in the
              <br /> luxury watch industry, she was involved in the
              reorganization
              <br /> of the German market at Audemars Piguet from 2014 to 2022,
              <br /> bringing valuable expertise in building customer service
              <br /> structures, enhancing customer experience, and developing
              <br /> growth strategies within the luxury market. Since joining
              the
              <br /> company in March 2022, Frederike Knop has overseen all
              <br /> operations processes and spearheaded the evolution of
              <br /> Cleopatra Watches & Jewellery&apos;s sales concepts and
              market positioning. Her
              <br /> strategic focus aims to revamp the existing business
              <br /> framework through comprehensive restructuring measures and
              <br /> to explore innovative business areas, thereby sustainably
              <br /> strengthening the brand through targeted growth initiatives
              in
              <br /> the international certified pre-owned watch market.
            </p>
            <Button className="bg-none shadow-none border py-6 px-8 mt-4">
              LINKEDIN PROFILE
            </Button>
          </div>
          <div className="md:w-[50%] w-full h-[90vh] relative">
            <Image
              alt="CEO"
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dlwdq84ig/image/upload/c_fill,f_auto,g_faces:auto,dpr_2.0,q_55,w_670/trtqdif01zkuh9gvhrdg"
              fill
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-center gap-14 mt-16">
          <div className="md:w-[50%] w-full h-[90vh] relative">
            <Image
              alt="CCO"
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dlwdq84ig/image/upload/c_fill,f_auto,g_faces:auto,dpr_2.0,q_55,w_670/u4smzwl290p5te3ah2ob"
              fill
            />
          </div>
          <div>
            <h1 className="text-4xl text-[#2c5150] font-montserratSemiBold">
              Philipp Weiner, Managing Director & CCO
            </h1>
            <p className="font-montserratRegular pt-5">
              In July 2024, Philipp Weiner was appointed Chief Commercial
              <br /> Officer of Cleopatra Watches & Jewellery. With over nine
              years of experience at
              <br /> the company, he has made significant contributions to the
              <br /> development and implementation of sourcing strategies. From
              <br /> October 2019 to August 2024, Philipp Weiner served as
              <br /> Director of Sourcing, playing a central role in building
              our global
              <br /> B2B sourcing network and developing the CPO business. He
              <br /> began his career at Cleopatra Watches & Jewellery in 2014
              as an intern in
              <br /> Operations. As CCO, his focus is on strengthening
              <br /> Cleopatra Watches & Jewellery’s global market position
              through targeted growth
              <br /> strategies and continuously enhancing the customer
              <br /> experience.
            </p>
            <Button className="bg-none shadow-none border py-6 px-8 mt-4">
              LINKEDIN PROFILE
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
