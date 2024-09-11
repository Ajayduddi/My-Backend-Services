import { Router } from 'express';
import { Gender } from '../../mongoose/gender.mjs';
import employeeRouter from './employee.mjs';
import testRouter from './tests.mjs';
import appointmentRouter from './appointments.mjs';

// sub routes
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from medilab!');
});

router.post('/addgender', (req, res) => {
    const data = req.body;
    Gender.create(data).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
})

//employee sub router
router.use('/employee', employeeRouter);
router.use('/test', testRouter);
router.use('/appointment', appointmentRouter);

export default router;