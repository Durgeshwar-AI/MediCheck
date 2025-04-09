import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAuthHeader } from "../utils/auth";
import Navbar from "../Components/Navbar";

const applst = [
  { date: 15, month: "Mar", name: "Dr. Smith - Cardiology", time: "9:00 AM", location: "Memorial Hospital" },
  { date: 23, month: "Mar", name: "Blood Work", time: "11:30 AM", location: "City Lab Center" }
];

const recordlst = [
  { name: "Annual Check-up", date: "Feb 10, 2025" },
  { name: "Blood Test Results", date: "Jan 25, 2025" },
];

function Main() {
  const [metrics, setMetrics] = useState([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDataFromBLE = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ble/data", getAuthHeader());
      const data = await response.json();

      const formattedMetrics = [
        { name: "Heart Rate", data: `${data.heartRate} bpm` },
        { name: "Oxygen Level", data: `${data.oxygen}%` },
        { name: "Blood Pressure", data: `${data.bp}` },
        { name: "Steps Today", data: `${data.steps}` },
        { name: "Sleep Duration", data: `${data.sleep}` },
        { name: "Weight", data: `${data.weight} kg` },
      ];

      setMetrics(formattedMetrics);
      setConnected(true);
    } catch (err) {
      console.error("Failed to fetch BLE data:", err.message);
      setConnected(false);
    }
  };

  const connectToSmartwatch = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/ble/connect", {
        method: "POST",
        headers: {
          ...getAuthHeader().headers,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        await fetchDataFromBLE();
        alert("✅ Smartwatch connected successfully!");
      } else {
        alert("❌ Failed to connect smartwatch.");
      }
    } catch (err) {
      alert("❌ Error connecting to smartwatch.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchDataFromBLE();
    }
  }, []);

  return (
    <>
      <div className="m-10 text-center">
        <span
          className={`p-2 border border-dashed rounded-full text-center ${
            connected ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {connected ? "✅ Smartwatch Connected" : "⚠️ Smartwatch Not Connected"}
        </span>

        {!connected && (
          <div className="mt-4">
            <button
              onClick={connectToSmartwatch}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect to Smartwatch"}
            </button>
          </div>
        )}
      </div>

      <div className="m-5 sm:grid sm:grid-cols-5 gap-3">
        <Metrics metrics={metrics} connected={connected} />
        <Sidebar />
      </div>
    </>
  );
}

function Metrics({ metrics, connected }) {
  return (
    <div className="sm:col-span-3 border rounded-md">
      <MenuTop data={"Current Health Metrics"} />
      <div className="grid sm:grid-cols-4 sm:grid-rows-2 grid-cols-2 grid-rows-3 gap-6 p-6">
        {connected ? (
          metrics.map((metric) => (
            <MetricComponent metricObj={metric} key={metric.name} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            ⌚ Please connect to your smartwatch to view health data.
          </p>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sm:col-span-2 sm:my-0 my-4">
      <div className="border rounded-md mb-4">
        <MenuTop data={"Upcoming Appointments"} />
        {applst.map((app) => <Appointment appObj={app} key={app.name} />)}
      </div>
      <div className="border rounded-md">
        <MenuTop data={"Recent Medical History"} />
        {recordlst.map((rec) => <Record recObj={rec} key={rec.name} />)}
      </div>
    </div>
  );
}

function MetricComponent({ metricObj }) {
  return (
    <div className="border rounded-lg text-center p-5 px-10 flex flex-col items-center justify-between sm:h-50">
      <div className="border-2 rounded-full bg-orange-200 w-16 h-16"></div>
      <p>{metricObj.data}</p>
      <p>{metricObj.name}</p>
    </div>
  );
}

function MenuTop({ data }) {
  return (
    <div className="p-6 border-b flex justify-between">
      <span className="font-bold text-2xl">{data}</span>
      <button className="text-blue-500">View All</button>
    </div>
  );
}

function Appointment({ appObj }) {
  return (
    <div className="grid sm:grid-cols-5 grid-cols-3 p-4 m-4 border rounded-md">
      <div className="border rounded-sm w-15 h-15 p-2 grid grid-rows-2 items-center justify-center text-center">
        <p>{appObj.date}</p>
        <p>{appObj.month}</p>
      </div>
      <div className="sm:col-span-4 col-span-2">
        <p className="font-bold text-lg mb-2">{appObj.name}</p>
        <p>{appObj.time} - {appObj.location}</p>
      </div>
    </div>
  );
}

function Record({ recObj }) {
  return (
    <div className="border rounded-md m-4 p-4 px-7 flex justify-between">
      <p className="sm:text-lg">{recObj.name}</p>
      <p>{recObj.date}</p>
    </div>
  );
}

// PropTypes
MetricComponent.propTypes = {
  metricObj: PropTypes.shape({
    data: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

MenuTop.propTypes = {
  data: PropTypes.string.isRequired,
};

Appointment.propTypes = {
  appObj: PropTypes.shape({
    date: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }),
};

Record.propTypes = {
  recObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

Metrics.propTypes = {
  metrics: PropTypes.array.isRequired,
  connected: PropTypes.bool.isRequired,
};

export default Main;
