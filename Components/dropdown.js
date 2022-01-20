import { useRef, useState } from "react";
import useWindowClick from "../hooks/useWindowClick";
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdOutlineCircle } from "react-icons/md";
import { useRecoilState } from "recoil";
import { newListingState } from "../atoms/modalAtom";

export default function DropDown({ handleFormChangeDropDown }) {
  const [selectedRow, setSelectedRow] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [formState] = useRecoilState(newListingState);

  //eventually move to db
  const categoryData = [
    { value: "Arts & Crafts", children: [{ value: "Art Supplies" }, { value: "Craft Supplies" }] },
    { value: "Baby Products", children: [{ value: "Baby Bathing" }, { value: "Baby Carriers" }] },
    { value: "Bags", children: [{ value: "Handbags", children: [{ value: "Satchels" }] }, { value: "Luggage" }] },
    {
      value: "Cell Phones & Accessories",
      children: [
        { value: "Cell Phone Accessories", children: [{ value: "Batteries" }, { value: "Cables" }] },
        { value: "Cell Phones" },
      ],
    },
  ];

  const dropDownRef = useRef();

  const turnDropDownOff = () => {
    setIsOpen(false);
    setSelectedRow();
  };

  useWindowClick(() => {
    turnDropDownOff();
  }, [dropDownRef]);

  const getCorrectData = () => {
    return !selectedRow ? categoryData : selectedRow?.children;
  };

  return (
    <>
      <div
        ref={dropDownRef}
        onClick={() => setIsOpen(true)}
        className={
          isOpen
            ? "flex justify-between items-center w-full mb-[20px] border-2 h-[40px] border-blue-600 text-gray-500 py-[10px] rounded cursor-pointer px-[10px]"
            : " flex justify-between items-center w-full mb-[20px] border-1 h-[40px] border-gray-300 text-gray-500 py-[10px] rounded cursor-pointer px-[10px]"
        }>
        {formState?.category?.[0] || "Category"}
        <MdKeyboardArrowDown />
      </div>
      <div>
        {isOpen && (
          <ul className="mr-[50px] w-full flex flex-col justify-star">
            {getCorrectData()?.map(row => (
              <li
                key={row.value}
                onClick={e => {
                  e.stopPropagation();
                  if (row?.children) {
                    setSelectedRow(row);
                  } else {
                    handleFormChangeDropDown("category", row.value);
                    turnDropDownOff();
                  }
                }}
                className="bg-white flex justify-between items-center  hover:bg-slate-400 p-[12px] border-1 shadow-lg rounded -ml-[30px] mb-[2px] cursor-pointer">
                {row.value}
                {row?.children ? <MdKeyboardArrowRight /> : <MdOutlineCircle />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
