import React from "react";
import arrowSvg from "../../assets/fi_arrow-right.svg";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 mt-6 font-montserrat h-10">
      <button
        className="px-3 py-1 border-none rounded-[10rem] hover:bg-[#003F51]/10 text-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={arrowSvg} className="w-auto h-4" alt="" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-[10rem] text-sm w-10 transition-all duration-400 ease-in-out ${
            currentPage === page
              ? "bg-[#003F51] text-white hover:bg-[#005D77]"
              : "border text-[#005D770 hover:bg-[#005D77]/10"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 border-none hover:bg-[#003F51]/10 rounded-[10rem] text-sm transition-all duration-400 ease-in-out"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={arrowSvg} className="w-auto h-4 scale-x-[-1]" alt="" />
      </button>
    </div>
  );
}
