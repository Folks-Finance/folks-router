import React from 'react'
interface toastTypes {
    title? : string,
    message? : any,
    theme? : "dark" | "light",
    close? : any 
}
export default function Toast({title, message, theme, close} : toastTypes) {
  return (
    <div className={`w-[300px] max-h-[100px] bottom-0 right-0  fixed  px-3 rounded-md border ${theme === "dark" ? "border-gray-700 bg-black text-white" : "bg-white text-black border-gray-300"} border-gray-300`}>
       <div className=' flex items-center justify-end'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={close}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

       </div>
      <h1 className='font-semibold  mb-3'>{title}</h1>   
      <h1 className='text-sm text-ellipsis'>{message}</h1>
    </div>
  )
}
