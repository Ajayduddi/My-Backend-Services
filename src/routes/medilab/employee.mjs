import { Router } from 'express';
import { validationResult, matchedData, checkSchema, body } from 'express-validator';
import { employeeSchema } from '../../utils/validationSchema.mjs';
import { createEmployeeId, hashPassword } from '../../utils/helper.mjs';
import { Employee } from '../../mongoose/medilab/employee.mjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();
const jwtauth = passport.authenticate('jwt', { session: false });

// login
router.post('/login', [
        body('email').isEmail().withMessage('Enter a valid email').notEmpty().withMessage('Email is required'),
        body('password').isLength({ min: 6, max: 255 }).withMessage('Password must be between 6 to 255 characters').notEmpty().withMessage('Password is required')
    ], async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            res.status(400).send({ result: false, message: errors.array(), data: null });
        }

        const data = matchedData(req);
        const employee = await Employee.findOne({ email: data.email });

        if (employee) {
            try {
                const token = jwt.sign({
                    id: employee.id,
                    email: employee.email
                },process.env.SECRET);
                res.status(200).send({ result: true, message: 'Login successful', data: { token: `Bearer ${token}`,role:employee.role,name:employee.name } });
            } catch (error) {
                res.status(500).send({ result: false, message: 'Internal server error', data: null });
            }
        }
        else {
            res.status(400).send({ result: false, message: 'Invalid email or password', data: null });
        }
});

// Create a new employee
router.post('/createEmployee',checkSchema(employeeSchema), async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        res.status(400).send({ result: false, message: errors.array(), data: null });
    }

    const data = matchedData(req);

    const ixExists = await Employee.findOne({ email: data.email });
    if (ixExists) {
        res.status(400).send({ result: false, message: 'Employee already exists', data: null });
    }
    else {
        const id = createEmployeeId();
        const password = hashPassword(data.password);
    
        if (id && password) {
            try {
                data.id = id;
                data.password = password;
                const employee = await Employee.create(data);
                res.status(201).send({ result: true, message: 'Employee created successfully', data: employee });
            } catch (error) {
                console.log("error");
                res.status(500).send({ result: false, message: 'Internal server error while creating employee', data: null });
            }
        }
        else {
            res.status(500).send({ result: false, message: 'Internal server error while hashing or id genaration', data: null });
        }
    }
});

// Get all employees
router.get('/getAllEmployees', passport.authenticate('jwt', { session: false }), async (req, res) => { 
    try {
        const employees = await Employee.find();   
        res.status(200).send({ result: true, message: 'Employees fetched successfully', data: employees });
    } catch (error) {
        res.status(500).send({ result: false, message: 'Internal server error while fetching employees', data: null });
    }
});

// Get employee details by id
router.get('/getEmployee/:id', jwtauth, async (req, res) => { 
    const id = String(req.params.id);
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            res.status(404).send({ result: false, message: 'Employee not found, Invalid id', data: null });
        }
        res.status(200).send({ result: true, message: 'Employee fetched successfully', data: employee });
    } catch (error) {
        res.status(500).send({ result: false, message: 'Internal server error while fetching employee', data: null });
    }
});

// update employee details
router.put('/editEmployee/:id', jwtauth ,checkSchema(employeeSchema), async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({result:false,message:error.array() ,data:null})
    }

    const id = String(req.params.id);
    const data = matchedData(req);
    const user = await Employee.findById(id);
    if (user) {
        const hash = hashPassword(data.password);
        data.password = hash;
        try {
            const result = await Employee.findByIdAndUpdate(id, data)
            res.status(200).send({ result: true, message: "Employee updated successfully", data: null });
        } catch (error) {
            console.log(error);
            res.status(500).send({ result: false, message: "Internal server error while updating the data", data: null });
        }
    } else {
        res.status(404).send({ result: false, message: "user not found", data: null });
    }
});

// delete employee details
router.delete('/deleteEmployee/:id', jwtauth, async (req, res) => {
    const id = String(req.params.id);
    try {
        if (await Employee.findByIdAndDelete(id)) {
            res.status(200).send({ result: true, message: "Employee deleted successfully", data: null });
        }
        else {
            res.status(404).send({ result: false, message: "Employee not found", data: null });
        }
    } catch (error) {
        res.status(500).send({ result: false, message: "Internal server error while deleting employee", data: null });
    }
});


export default router;