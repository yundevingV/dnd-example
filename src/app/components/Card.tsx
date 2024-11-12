import { HiUserCircle } from "react-icons/hi2";

interface CardProps {
  name: string;
  description: string;
}
export default function Card({ name, description }: CardProps) {
  return (
    <div className="w-80 h-20 px-5 py-3 bg-sky-500 flex mb-4 rounded-lg">
      <HiUserCircle size={50} />
      <div className="flex flex-col truncate">
        <p className="font-semibold text-lg">{name}</p>
        <p className=""> {description}</p>
      </div>
    </div>
  );
}
