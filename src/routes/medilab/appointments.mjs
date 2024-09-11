import { Router } from 'express';
import { validationResult, matchedData, checkSchema } from 'express-validator';
import { appointmentSchema } from '../../utils/validationSchema.mjs';
import { Appointment } from '../../mongoose/medilab/appointment.mjs';
import { createAppointmentId } from '../../utils/helper.mjs';
import passport from 'passport';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

// get all appointments
router.get('/getAllAppointments', async (req, res) => { 
    try {
        const appointments = await Appointment.find();
        res.status(200).send({result:true,message:"Appointments fetched successfully",data:appointments});
    } catch (error) {
        res.status(500).send({result:false,message:"Internal server error while fetching appointments",data:null});
    }
});

// get appointment details by id
router.get("/getAppointment/:id", async (req, res) => { 
    const id = String(req.params.id);
    try {
        const test = await Appointment.findById(id);
        if (test) {
            res.status(200).send({ result: true, message: "appointment fetched successfully", data: test });
        } else {
            res.status(404).send({result:false,message:"Appointment not found",data:null});
        }
    } catch (error) {
        res.status(500).send({result:false,message:"Internal server error while fetching appointment details",data:null});
    }
});

// create appointment
router.post('/createAppointment', checkSchema(appointmentSchema), async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({ result: false, message: error.array(), data: null });
    }

    const data = matchedData(req);
    const id = createAppointmentId();
    if (id) {
        try {
            data.id = id;
            const appointment = await Appointment.create(data);
            res.status(201).send({ result: true, message: "Appointment created successfully", data: appointment });
        } catch (error) {
            res.status(500).send({ result: false, message: "Internal server error while creating the appointment", data: null });
        }
    }
    else {
        res.status(500).send({result:false,message:"Internal server error while creating appointment id",data:null});
    }
});
 
// update appointment details
router.put('/editAppointment/:id', checkSchema(appointmentSchema), async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({result:false,message:error.array(),data:null});
    }

    const data = matchedData(req);
    const id = String(req.params.id);
    await Appointment.findByIdAndUpdate(id, data).then((result) => {
        res.status(200).send({result:true,message:"Appointment updated successfully",data:result});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({result:false,message:"Internal server error while updating appointment",data:null});
    });
});
 
// delete appointment details
router.delete("/deleteAppointment/:id", async(req, res) =>{
    const id = String(req.params.id);
    try {
        if(await Appointment.findByIdAndDelete(id)) {
            res.status(200).send({result:true,message:"Appointment deleted successfully",data:null});
        }
        else {
            res.status(404).send({result:false,message:"Appointment not found",data:null});
        }
    } catch (error) {
        res.status(500).send({result:false,message:"Internal server error while deleting appointment",data:null});
    }
}) 

export default router;