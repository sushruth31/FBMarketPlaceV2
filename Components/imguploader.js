import { useRef, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useEffect } from "react/cjs/react.development";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { newListingState } from "../atoms/modalAtom";
import deepCopy from "../functions/deepCopy";

export default function ImgUploader() {
  const hiddenInputRef = useRef();
  const [imgs, setImgs] = useState([]);
  const [formstate, setFormState] = useRecoilState(newListingState);

  useEffect(() => {
    if (imgs.length === 0) {
      //remove the imgs property from formstate
      setFormState(prevState => {
        const origState = deepCopy(prevState);
        const newObj = {};
        for (const key in origState) {
          if (key !== "imgs") {
            newObj[key] = origState[key];
          }
        }
        return newObj;
      });
      return;
    }

    setFormState(prevstate => {
      const origState = { ...prevstate };

      for (const [key, value] of Object.entries(origState)) {
        origState[key] = [value?.[0], false];
      }

      return origState;
    });
    setFormState(prevState => ({
      ...prevState,
      imgs: [[...imgs], true],
    }));
  }, [imgs]);

  const handleFileUpload = ({ target: { files } }) => {
    if (files?.length === 0) return;

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = readerEvent => {
        setImgs(prevState => {
          return [readerEvent.target.result, ...prevState];
        });
      };
    }
  };

  return (
    <>
      <div className="mb-[20px]">{`Photos ${imgs.length || 0}/5 - You can add up to 5 photos `}</div>
      {imgs.length > 0 ? (
        <ul className="grid grid-cols-3 w-full -ml-[30px]">
          {imgs.map(file => (
            <Image
              key={file}
              className="rounded mr-[40px] mb-[20px] cursor-pointer"
              width={100}
              height={100}
              src={file}
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
