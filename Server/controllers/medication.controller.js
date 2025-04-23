import medication from "../models/medication.model.js"

export const addMedication = async (req,res)=>{
    const user = req.user.id
    const {name,dosage,schedule,date,month,year} = req.body

    try{
        const medicine = new medication({
            user,
            name,
            dosage,
            schedule,
            date,
            month,
            year,
        })

        await medicine.save()
        res.status(200).json({message:"Medicine added"});
    }catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }
}

export const getMedication = async (req,res)=>{
    try {
        const medicine = await medication.find({ user: req.user.id });
        res.json(medicine);
      } catch (err) {
        console.error('Retrieval error:', err);
        res.status(500).json({ error: 'Failed to fetch records' });
      }
}

export const deleteMedication = async (req,res)=>{
    try {
        const medicine = await medication.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    
        res.json({ message: 'Medicine deleted' });
      } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: 'Failed to delete' });
      }
}