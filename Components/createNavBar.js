import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { MdNavigateBefore, MdAddAPhoto } from "react-icons/md";
import { useRecoilState } from "recoil";
import { newListingState } from "../atoms/modalAtom";
import Button from "./navbarbutton";
import Select from "react-select";
import DropDown from "./dropdown";
import TagsInput from "./tagsinput";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react/cjs/react.development";
import CitiesDropDown from "./citiesdropdown";

export default function CreateNavBar() {
  const session = useSession();
  const router = useRouter();
  const hiddenInputRef = useRef();
  const [formState, setFormState] = useRecoilState(newListingState);
  const [cities, loading, err] = useFetch("https://countriesnow.space/api/v0.1/countries");

  useEffect(() => console.log(cities), [cities]);

  const handleFormChange = ({ target }) => {
    setFormState(prevstate => {
      const origState = { ...prevstate };

      for (const [key, value] of Object.entries(origState)) {
        if (key !== target.name) {
          origState[key] = [value[0], false];
        }
      }
      return { ...origState, [target.name]: [target.value, true] };
    });
  };

  const handleFormChangeDropDown = (name, newval) => {
    setFormState(prevstate => {
      const origState = { ...prevstate };

      for (const [key, value] of Object.entries(origState)) {
        if (key !== newval) {
          origState[key] = [value[0], false];
        }
      }
      return { ...origState, [name]: [newval, true] };
    });
  };

  const conditionOptions = [
    { value: "new", label: "New" },
    { value: "usedlikenew", label: "Used - Like New" },
    { value: "usedgood", label: "Used - Good" },
    { value: "poor", label: "Poor" },
  ].sort(({ value: a }, { value: b }) => (a < b ? -1 : 1));

  return (
    <div className="overflow-scroll h-5/6">
      {loading ? (
        <div>Loading</div>
      ) : err ? (
        <div>There was an error loading</div>
      ) : (
        <>
          <div className="flex items-center justify-between px-[7px] mb-[20px]">
            <div className="flex">
              <MdNavigateBefore onClick={() => router.push("/home")} className="text-3xl cursor-pointer" />
              <div className="text-xl text-bold">Create New Listing</div>
            </div>
            <button
              disabled={
                !(
                  Object.values(formState)
                    .map(v => v?.[0])
                    .every(el => el?.length > 0) && Object.values(formState).map(v => v?.[0]).length > 0
                )
              }
              className="btn btn-primary">
              Save Draft
            </button>
          </div>

          <div className="flex mb-[20px]">
            <Image width={40} height={40} src={session.data.user.image} className="text-3xl rounded-3xl p-[10px]" />
            <div className="ml-[20px]">
              <div className="">{session.data.user.name}</div>
              <div className="text-sm text-gray-500">Listing to marketplace</div>
            </div>
          </div>

          <div onClick={() => hiddenInputRef?.current.click()} className="cursor-pointer mb-[30px]">
            <div className="mb-[20px]">{`Photos 0/10 - You can add up to 5 photos `}</div>
            <div className="flex justify-center">
              <div className="w-10/12 h-[150px] border-gray-700 border-1 rounded flex items-center justify-center">
                <MdAddAPhoto className="text-3xl" />
              </div>
            </div>
            <input type={"file"} ref={hiddenInputRef} className="hidden" />
          </div>

          <div>
            <input
              value={formState.title?.[0]}
              name="title"
              onChange={handleFormChange}
              className="form-control mb-[10px]"
              placeholder="Title"
            />
            <input
              type={"number"}
              value={formState.price?.[0]}
              onChange={handleFormChange}
              name="price"
              className="form-control mb-[20px]"
              placeholder="Price"
            />

            <DropDown handleFormChangeDropDown={handleFormChangeDropDown} />

            <Select
              placeholder="Condition"
              onChange={({ label }) => handleFormChangeDropDown("condition", label)}
              options={conditionOptions}
              className="mb-[20px]"
            />

            <textarea
              type={"text"}
              value={formState.description?.[0]}
              onChange={handleFormChange}
              name="description"
              className="form-control mb-[20px] h-[130px]  "
              placeholder="Item Description"
            />

            <TagsInput />

            <CitiesDropDown data={cities.data} />

            <div className="absolute w-full bottom-[50px] left-0 border-t-2 border-gray-300 py-[20px]">
              <Button
                disabled={
                  Object.values(formState).map(v => v?.[0]).length < 6 ||
                  Object.values(formState)
                    .map(v => v?.[0])
                    .some(el => el?.length === 0)
                }>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
