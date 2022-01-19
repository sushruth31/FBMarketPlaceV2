export default function Button({ children, onClick, disabled, className }) {
  const activeClass =
    "flex justify-center items-center bg-blue-600 text-white h-[40px] mx-[10px] rounded-lg p-[10px] cursor-pointer" +
    " " +
    className;
  const disabledClass =
    "flex justify-center items-center bg-gray-400 text-white h-[40px] mx-[10px] rounded-lg p-[10px] cursor-default" +
    " " +
    className;

  return (
    <div onClick={onClick} className={disabled ? disabledClass : activeClass}>
      {children}
    </div>
  );
}
