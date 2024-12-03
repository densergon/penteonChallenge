import Image from "next/image";
interface CardProps {
    name: string;
    picture: string;
    fact: string;
}

const Card: React.FC<CardProps> = ({ name, picture, fact }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center  justify-center w-10/12 hover:bg-gray-200 h-40 ">

            <div className="w-full flex justify-start">
                <div className="flex justify-start w-100">
                    <div className="m-2 w-2/12">
                        <Image
                            src={picture}
                            alt={name}
                            className="rounded-full"
                            width={56}
                            height={56}
                            priority
                        />
                    </div>
                    <div className="m-2 flex items-center w-8/12">
                        <h2 className="text-lg font-semibold text-black">{name}</h2>
                    </div>
                </div>
            </div>
            <div className="flex justify-start w-full">
                <p className="text-gray-600 text-left mt-2 text-sm">{fact}</p>
            </div>
        </div>
    );
};

export default Card;
