import { useState, useEffect } from "react";
import CustomHead from "../Components/head";
import ProtectedPage from "../Components/protectedpage";
import { useRecoilState } from "recoil";
import { newListingState } from "../atoms/modalAtom";

export default function Create() {
  const [formState, setFormState] = useRecoilState(newListingState);
  const [textColors, setTextColors] = useState({});

  useEffect(() => {
    const newObj = {};
    setTextColors;

    for (const [key, value] of Object.entries(formState)) {
      newObj[key] = value?.[1] ? "blue" : "black";
    }

    setTextColors(newObj);
  }, [formState]);

  useEffect(
    () =>
      setTimeout(() => {
        const state = { ...textColors };
        for (const key in state) {
          state[key] = "black";
        }
        setTextColors(state);
      }, 600),
    [formState]
  );

  const getColor = key => {
    return !formState[key]?.[0]
      ? "text-gray-300 text-xl font-bold"
      : textColors[key] === "blue"
      ? "text-blue-700 text-xl font-bold"
      : "text-gray-700 text-xl font-bold";
  };

  return (
    <ProtectedPage>
      <CustomHead title="Home" />

      <div className="w-11/12 max-w-[1100px] rounded-lg shadow-lg h-[700px] mt-[20px] bg-white flex flex-col p-[25px]">
        <div className="font-bold">Preview</div>
        <div className="flex justify-center">
          <div className="flex w-11/12 bg-gray-200 h-[600px] justify-center items-center">
            <div>Your Listing Preview</div>
          </div>
          <div className="flex flex-col w-11/12 border-1 border-gray-700 rounded-lg bg-white p-[10px] h-full">
            <div className="flex flex-col h-full justify-around -mt-[30px]">
              <div>
                <div>Title</div>
                <div className={getColor("title")}>{formState?.title?.[0] || "Enter Title"}</div>
              </div>
              <div>
                <div>Price</div>
                <div className={getColor("price")}>
                  {!formState?.price?.[0] ? "Enter Price" : `$${formState?.price?.[0]}`}
                </div>
              </div>
              <div>
                <div>Category</div>
                <div className={getColor("category")}>{formState?.category?.[0] || "Select Category"}</div>
              </div>
              <div>
                <div>Condition</div>
                <div className={getColor("condition")}>{formState?.condition?.[0] || "Select Condition"}</div>
              </div>
              <div>
                <div>Description</div>
                <div className={getColor("description")}>{formState?.description?.[0] || "Enter a description"}</div>
              </div>
              <div>
                <div>Tags</div>
                <div>{JSON.stringify(formState.tags) || "Enter some tags"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
