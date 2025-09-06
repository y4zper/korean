import React from 'react'
import { Link } from 'react-router-dom'

const companyLogo = [
    {id:1,img:"/img/company/1.png"},
    {id:2,img:"/img/company/33.png"},
    {id:3,img:"/img/company/4.png"},
    {id:4,img:"/img/company/5.png"},
]

const Category = () => {
  return (
    <div className='mx-auto xl:px-28 px-4 py-16'>
        {/* Placeholder for category content */}
        <div className='flex items-center justify-around gap-8'>
           {
           companyLogo.map(({ id, img }) => (
          <div key={id}>
            <img src={img} alt="" />
          </div>
        ))}
        </div>

        {/* Placeholder for category content */}

        {/* <div className='mt-8 flex flex-col md:flex-row items-center gap-4'>
        <p className='font-semibold uppercase md:-rotate-90 text-center bg-black text-white md:p-1.5 p-2 rounded-sm inline-flex'> Explore new and popular</p>
        <div>
            <Link to="/"><img className="object-cover w-full hover:scale-105 transition-all duration-200" src="/img/category/2.jpg" alt="" /></Link>
        </div>
        <div className='md:w-1/2 h-70'>
            <div className='grid grid-cols-2 gap-2'>
            <Link to="/"><img className="object-cover w-full hover:scale-105 transition-all duration-200" src="/img/category/3.jpg" alt="" /></Link>
            <Link to="/"><img className="object-cover w-full hover:scale-105 transition-all duration-200" src="/img/category/1.jpg" alt="" /></Link>
            <Link to="/"><img className="object-cover w-full hover:scale-105 transition-all duration-200" src="/img/category/4.jpg" alt="" /></Link>
            <Link to="/"><img className="object-cover w-full hover:scale-105 transition-all duration-200" src="/img/category/5.jpg" alt="" /></Link>
            </div>
        </div>
        </div> */}
    </div>
  )
}


export default Category