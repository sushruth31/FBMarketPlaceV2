import { useRef, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useEffect } from "react/cjs/react.development";
import Image from "next/image";

export default function ImgUploader() {
  const hiddenInputRef = useRef();
  const [imgs, setImgs] = useState([]);

  useEffect(() => console.log(imgs));

  const handleFileUpload = ({ target: { files } }) => {
    if (files?.length === 0) return;

    for (const file of files) {
      setImgs(prevState => {
        return [file, ...prevState];
      });
    }
  };

  return (
    <>
      {imgs.length > 0 ? (
        <ul className="grid grid-cols-3 w-full -ml-[30px]">
          {imgs.map(file => (
            <Image
              key={file.name}
              className="rounded mr-[40px] mb-[20px] cursor-pointer"
              width={100}
              height={100}
              src={URL.createObjectURL(file)}
              onClick={() => setImgs(prevState => prevState.filter(exfile => exfile !== file))}
            />
          ))}
          <div
            onClick={() => hiddenInputRef?.current.click()}
            className="w-[100px] h-[100px] flex justify-center items-center bg-gray-300 cursor-pointer rounded">
            Add Photo
          </div>
        </ul>
      ) : (
        <>
          <div onClick={() => hiddenInputRef?.current.click()} className="cursor-pointer mb-[30px]">
            <div className="mb-[20px]">{`Photos 0/10 - You can add up to 5 photos `}</div>
            <div className="flex justify-center">
              <div className="w-10/12 h-[150px] border-gray-700 border-1 rounded flex items-center justify-center">
                <MdAddAPhoto className="text-3xl" />
              </div>
            </div>
          </div>
        </>
      )}
      <input multiple onChange={handleFileUpload} type={"file"} ref={hiddenInputRef} className="hidden" />
    </>
  );
}
