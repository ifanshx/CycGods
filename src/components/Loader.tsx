import { New_Rocker, Sanchez } from "next/font/google";
const sanchez = Sanchez({ weight: "400", subsets: ["latin"] });
const frijole = New_Rocker({ weight: "400", subsets: ["latin"] });

const Loading: React.FC = () => {
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen overflow-hidden my-auto backdrop-blur-md animate-dayToNight bg-white/30 z-50">
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
        }}
      >
        <span className={`${frijole.className} mb-9 text-2xl text-black`}>
          CycGods
        </span>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
        <span className={`${frijole.className} mt-9 text-2xl text-black`}>
          WAGMI
        </span>
      </div>
    </div>
  );
};

export default Loading;
