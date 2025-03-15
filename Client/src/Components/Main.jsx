import React from "react";

const metriclst = [
    {
        img: '',
        data: "72 bpm",
        name: "Heart Rate"
    },
    {
        img: '',
        data: "98%",
        name: "Oxygen Level"
    },
    {
        img: '',
        data: "120/80",
        name: "Blood Pressure"
    },
    {
        img: '',
        data: "8547",
        name: "Steps Today"
    },
    {
        img: '',
        data: "7h 20m",
        name: "Sleep Duration"
    },
    {
        img: '',
        data: "72.5 kg",
        name: "Weight"
    }
]

function Main(){

    return (
        <>
            <span className="m-10 p-2 border-1 border-dashed rounded-full text-center">Smartwatch Connected</span>
            <div className="m-5 grid grid-cols-5">
            <Metrics />
            <Sidebar />
            </div>
        </>
    )

}

function Metrics(){
    const metrics1 = metriclst;

    return (<div className="col-span-3 border-1">
    <div className="m-10 flex justify-between ">
        <span className="font-bold text-2xl">Current Health Metrics</span>
        <button>View All</button>
    </div>
    <div className="grid grid-cols-4 grid-rows-2 gap-6 p-6">
    {metrics1.map((metric) => (
            <MetricComponent metricObj={metric} key={metric.name} />
          ))}
    </div>
    </div>)
}

function Sidebar(){
    return (
    <div className="m-8 col-span-2">
        <span>Upcoming Appointments</span>
    </div>)
}

function MetricComponent({metricObj}){
    return (
        <div className="border-1 text-center p-5 px-10 flex flex-col items-center justify-between h-40">
            <div className="border-2 rounded-full bg-orange-200 w-16 h-16"></div>
            <p>{metricObj.data}</p>
            <p>{metricObj.name}</p>
        </div>
    )
}

export default Main;