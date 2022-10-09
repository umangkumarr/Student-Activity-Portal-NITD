import React from 'react'

import AppDev from '../img/AppDev.png'

const Event = () => {
    return (
        <div>
            <div className="m-8 w-[60%] max-w-[1000px] h-[350px] bg-[#e1e9f1] rounded p-5">
                <div className="rounded flex items-center justify-center">
                    <div className="w-[40%] items-right p-2">
                        <img className="rounded-md border-[2px] border-[#5c5ca5] object-cover h-[300px] w-[300px]" src={AppDev} alt="" ></img>
                    </div>

                    <div className="w-[60%] h-[300px] px-[40px] py-1 ">
                        <div className="font-bold text-[20px]">App Developement <span> [ GDSC Club ] </span></div>
                        <div className="my-4 text-[14px]"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, deserunt? Accusantium inventore at ut deserunt tempora sequi non labore laudantium quibusdam! Possimus tempora iure delectus quia quis tenetur similique sunt?</div>
                        <div className="font-semibold text-[15px] my-2">Schedule</div>
                        <div className="gapx-4 grid grid-cols-2">
                            <div className="text-[12px]">Date: 26-09-22 </div>
                            <div className="text-[12px]">Start at: 6:00 PM</div>
                            <div className="text-[12px]">Venue: LT-2 Admin Block</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event
