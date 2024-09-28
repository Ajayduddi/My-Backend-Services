import { Router } from 'express';
import { Gender } from '../../mongoose/gender.mjs';
import employeeRouter from './employee.mjs';
import testRouter from './tests.mjs';
import appointmentRouter from './appointments.mjs';
import passport from 'passport';

// sub routes
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from medilab!');
});

router.post('/addgender',passport.authenticate('jwt', { session: false }), async (req, res) => {
    const data = req.body;
    await Gender.create(data).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
})

router.get('/getgender',passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Gender.find().then((result) => {
        res.status(200).send({result:true, data:result});
    }).catch((err) => {
        res.status(500).send({result:false, data:err});
    });
})

//employee sub router
router.use('/employee', employeeRouter);
router.use('/test', testRouter);
router.use('/appointment', appointmentRouter);

export default router;