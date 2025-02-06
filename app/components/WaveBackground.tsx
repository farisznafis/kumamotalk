// import Image from "next/image";

// export default function WaveBackground() {
//   return (
//     <Image
//       src="../wave.svg"
//       alt="Wave Pattern"
//       layout="fill"
//       objectFit="cover"
//       className="opacity-30"
//     />
//   );
// }

export default function WaveBackground() {
    return (
      <div className="w-full h-full max-h-[1640px]">
        <div className="fixed inset-0 z-0 bg-[url('../public/wave-full.svg')] bg-repeat bg-contain opacity-30">
        </div>
      </div>
    );
  }
  
