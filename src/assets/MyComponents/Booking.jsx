import React, { useState } from 'react'
import {Navbar} from './Navbar'
import uberImage from './uber.png'
import olaImage from './ola.png'
import rapImage from './rapido.png'

export const Booking = (props) => {
    let x,y,z;
    if(props.kms < 30){
        x = ((Math.random() * 6) + 6);
        y = ((Math.random() * 6) + 6);
        z = ((Math.random() * 6) + 6);
    }else{
        x = ((Math.random() * 5) + 5);
        y = ((Math.random() * 5) + 5);
        z = ((Math.random() * 5) + 5);
    }
    let min = Math.min(x, y, z);
    const [book,setBook]=useState(false);
    

  return (
    <div className='m-2'>
    <div className=' grid-col-1 md:grid-cols-3 grid justify-center items-center gap-4 '>
    <div className="flex-1 card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
        <img
        src={uberImage}
        alt="uber" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">UBER
        {min===x && <div className="badge badge-secondary">BEST</div>}
        </h2>
        <p className='text-lg'>Price: {(x*props.kms).toFixed(2)}Rs</p>
        <div className="card-actions justify-end">
        <button className="btn btn-primary"  onClick={()=>{
            document.getElementById('my_modal_1').showModal();
            setTimeout(() => {
                setBook(true);
            }, 2000);

        }}>Book Now</button>
        </div>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            {
            book?
            <div>
            <h3 className="font-bold text-lg">Booked Successfully!!</h3>
            <p className="py-4 text-lg">Price: {(x*props.kms).toFixed(2)}Rs</p>
            <div className="modal-action">
            <div className='flex justify-between items-center w-full'>
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-outline btn-error" >Close</button>  
            </form>
            </div>  
            </div>
            </div>
            :<div className="skeleton h-32 w-full"></div>
            }
        </div>
        </dialog>
    </div>
    </div>

    <div className="flex-1 card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
        <img
        src={olaImage}
        alt="Shoes" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">OLA
        {min===y && <div className="badge badge-secondary">BEST</div>}
        </h2>
        <p className='text-lg'>Price: {(y*props.kms).toFixed(2)}Rs</p>
        <div className="card-actions justify-end">
        <button className="btn btn-primary"  onClick={()=>document.getElementById('my_modal_2').showModal()}>Book Now</button>
        </div>
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Booked Successfully!!</h3>
            <p className="py-4 text-lg">Price: {(y*props.kms).toFixed(2)}Rs</p>
            <div className="modal-action">
            <div className='flex justify-between items-center w-full'>
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-outline btn-error">Close</button>  
            </form>
            
            </div>  
            </div>
        </div>
        </dialog>
    </div>
    </div>

    <div className="flex-1 card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
        <img
        src={rapImage}
        alt="Shoes" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">RAPIDO
        {min===z && <div className="badge badge-secondary">BEST</div>}
        </h2>
        <p className='text-lg'>Price: {(z*props.kms).toFixed(2)}Rs</p>
        <div className="card-actions justify-end">
        <button className="btn btn-primary"  onClick={()=>document.getElementById('my_modal_3').showModal()}>Book Now</button>
        </div>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Booked Successfully!!</h3>
            <p className="py-4 text-lg">Price: {(z*props.kms).toFixed(2)}Rs</p>
            <div className="modal-action">
            <div className='flex justify-between items-center w-full'>
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-outline btn-error">Close</button>  
            </form>
           
            </div>  
            </div>
        </div>
        </dialog>
    </div>
    </div>

    </div>
    </div>
  )
}
