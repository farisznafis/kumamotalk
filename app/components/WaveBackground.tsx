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

// export default function WaveBackground() {
//     return (
//       <div className="absolute inset-0 z-0 bg-[url('../public/wave-2.svg')] bg-repeat bg-[length:1200px_100px] opacity-30"></div>
//     );
//   }
import { ReactNode } from 'react';

export default function WaveBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-full inset-0 bg-gradient-to-b from-black to-gray-800 flex">
      {children}
    </div>
  );
}