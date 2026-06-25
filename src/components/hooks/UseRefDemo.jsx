import {
 useRef
} from "react";

export default function UseRefDemo() {

 const inputRef = useRef();

 const focusInput = () => {
   inputRef.current.focus();

   console.log(
     "Input Focused"
   );
 };

 return (
   <>
     <input
       ref={inputRef}
       placeholder="Search Product"
     />

     <button
      onClick={focusInput}
     >
       Focus
     </button>
   </>
 );
}