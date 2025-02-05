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
      <div className="fixed inset-0 bg-[url('../public/wave-full.svg')] bg-repeat bg-[length:2360px_200px] opacity-30"></div>
    );
  }
  
