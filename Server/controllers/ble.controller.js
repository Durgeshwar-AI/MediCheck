import createHealthReport, { checkHealth } from "../services/ble.service.js";

const healthData = async (req,res)=>{
  const { heartRate, oxygen, bp, steps, sleep } = req.body;
  try {
    const healthData = { heartRate, oxygen, bp, steps, sleep };
    const report = await checkHealth(healthData);
    res.status(200).json({report});
  }catch(err){
    console.log(err);
    res.status(500).json({report:"OK"})
  }
}

export default healthData

const report = async (req,res)=>{
  const { heartRate, oxygen, bp, steps, sleep } = req.body;

  try {
    const healthData = { heartRate, oxygen, bp, steps, sleep };
    const report = await createHealthReport(healthData);
    res.status(200).json({ report });
  } catch (error) {
    console.error('Error in generateReport controller:', error.message);
    if (error.message.includes('Invalid format')) {
       return res.status(400).json({ error: error.message });
    }
    res.status(500).json({
      error: error.message || 'Failed to generate health report due to a server error.',
    });
  }
}

export {report}