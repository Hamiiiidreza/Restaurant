import React, { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import {
  Accordion as AccordionComponent,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Accordion = ({ title, text, id }) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return <AccordionComponent type="single" collapsible>
    <AccordionItem value={id} className='border-none bg-transparent' >
      <AccordionTrigger className='relative mb-0 z-30 text-white text-[35px] hover:no-underline' >
        <button className="flex items-center justify-between w-full  rounded-[5px] m-0 text-2xl text-white font-semibold leading-8 border-none py-[22px] pr-[30px] pl-[65px] transition-all duration-300 ease-in bg-[#151B20]"
          onClick={toggleAccordion}>
            <span>{title}</span>
          <span className="absolute bottom-[42px] left-[42px] border-none text-[22px] font-bold">{isOpen ? <FaMinus /> : <FaPlus /> }</span>
        </button>
        </AccordionTrigger>
      <AccordionContent className='border border-solid border-white border-opacity-15 border-t-0 rounded-b-[10px] rounded-l-[10px] p-0 bg-transparent ' >
        <p className="my-0 mx-[30px] px-0 pt-[25px] pb-[30px] font-bold text-[#D2D2D2] text-[15px]">{text}</p>
      </AccordionContent>
    </AccordionItem>
  </AccordionComponent>
}

export default Accordion;
