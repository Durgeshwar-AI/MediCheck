import React from "react";
import PropTypes from "prop-types"; 

const metriclst = [
  {
    img: "",
    data: "72 bpm",
    name: "Heart Rate",
  },
  {
    img: "",
    data: "98%",
    name: "Oxygen Level",
  },
  {
    img: "",
    data: "120/80",
    name: "Blood Pressure",
  },
  {
    img: "",
    data: "8547",
    name: "Steps Today",
  },
  {
    img: "",
    data: "7h 20m",
    name: "Sleep Duration",
  },
  {
    img: "",
    data: "72.5 kg",
    name: "Weight",
  },
];

const applst = [
    {
        date: 15,
        month: "Mar",
        name: "Dr. Smith - Cardiology",
        time: "9:00 AM",
        location: "Memorial Hospital"
    },
    {
        date: 23,
        month: "Mar",
        name: "Blood Work",
        time: "11:30 AM",
        location: "City Lab Center"
    }
];

const recordlst = [
    {
        name: "Annual Check-up",
        date: "Feb 10, 2025"
    },
    {
        name: "Blood Test Results",
        date: "Jan 25, 2025"
    },
]

function Main() {
  return (
    <>
      <span className="m-10 p-2 border border-dashed rounded-full text-center">
        Smartwatch Connected
      </span>
      <div className="m-5 grid grid-cols-5 gap-3">
        <Metrics />
        <Sidebar />
      </div>
    </>
  );
}

function Metrics() {
  const metrics1 = metriclst;

  return (
    <div className="col-span-3 border rounded-md">
      <MenuTop data= {"Current Health Metrics"} />
      <div className="grid grid-cols-4 grid-rows-2 gap-6 p-6">
        {metrics1.map((metric) => (
          <MetricComponent metricObj={metric} key={metric.name} />
        ))}
      </div>
    </div>
  );
}


function Sidebar() {
    const apps = applst;
    const records = recordlst;

  return (
    <div className="border rounded-md col-span-2">
      <MenuTop data={"Upcoming Appointments"} />
      <div>
        {apps.map((app)=>
            <Appointment appObj={app} key={app.name}/> )}
      </div>
      <MenuTop data={"Recent Medical History"}/>
      {records.map((rec)=> ( <Record recObj={rec} key={rec.name} /> ))}
    </div>
  );
}

MetricComponent.propTypes = {
    metricObj: PropTypes.shape({
      data: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

function MetricComponent({ metricObj }) {
  return (
    <div className="border rounded-lg text-center p-5 px-10 flex flex-col items-center justify-between h-50">
      <div className="border-2 rounded-full bg-orange-200 w-16 h-16"></div>
      <p>{metricObj.data}</p>
      <p>{metricObj.name}</p>
    </div>
  );
}

MenuTop.propTypes = {
    data: PropTypes.string.isRequired
};

function MenuTop(props) {
  return (
    <div className="p-6 border-b flex justify-between ">
      <span className="font-bold text-2xl">{props.data}</span>
      <button>View All</button>
    </div>
  );
}

Appointment.propTypes = {
    appObj : PropTypes.shape({
        date: PropTypes.number.isRequired,
        month: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired
    })
};
Record.propTypes = {
    recObj : PropTypes.shape({
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    })
};

function Record({recObj}){
    return (
        <div className="border rounded-md m-4 p-4 px-7 flex justify-between">
            <p className="text-lg">{recObj.name}</p>
            <p>{recObj.date}</p>
        </div>
    )
}

function Appointment({appObj}){

    return (
        <div className="grid grid-cols-5 p-4 m-4 border rounded-md">
            <div className="border rounded-sm w-15 h-15 p-2 grid grid-rows-2 items-center justify-center text-center">
            <p>{appObj.date}</p>
            <p>{appObj.month}</p>
            </div>
            <div className="col-span-4">
                <p className="font-bold text-lg mb-2">{appObj.name}</p>
                <p>{appObj.time} - {appObj.location}</p>
            </div>
        </div>
    )
}

export default Main;
