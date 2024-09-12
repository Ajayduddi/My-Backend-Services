import { Router } from 'express';
import { validationResult, matchedData, checkSchema } from 'express-validator';
import { testSchema } from '../../utils/validationSchema.mjs';
import { Test } from '../../mongoose/medilab/tests.mjs';
import { createTestId } from '../../utils/helper.mjs';
import passport from 'passport';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

// get all tests
router.get('/getAllTests', async (req, res) => { 
    try {
        const tests = await Test.find();
        res.status(200).send({result:true,message:"Tests fetched successfully",data:tests});
    } catch (error) {
        res.status(500).send({result:false,message:"Internal server error while fetching tests",data:null});
    }
});

// get test details by id
router.get('/getTest/:id', async (req, res) => { 
    const id = String(req.params.id);
    try {
        const test = await Test.findById(id);
        if (test) {
            res.status(200).send({ result: true, message: "test featched successfully", data: test });
        } else {
            res.status(404).send({result:false,message:"Test not found",data:null});
        }
    } catch (error) {
        res.status(500).send({ result: false, message: "Internal server error while featching test", data: null });
    }
});

// create test
router.post('/createTest',checkSchema(testSchema), async (req, res) => { 
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({ result: false, message: error.array(), data: null });
    }

    const data = matchedData(req);
    const id = createTestId();
    if (id) {
       try {
           data.id = id;
           const test = await Test.create(data);
           res.status(201).send({ result: true, message: "Test created successfully", data: test });
       } catch (error) {
           res.status(500).send({ result: false, message: "Internal server error while creating the test", data: null });
       }   
    }
    else {
        res.status(500).send({result:false,message:"Internal server error while creating test id",data:null});
    }
});

// update test details
router.put('/editTest/:id', checkSchema(testSchema), async (req, res) => { 
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({result:false,message:error.array(),data:null});
    }

    const id = String(req.params.id);
    const data = matchedData(req);
    Test.findByIdAndUpdate(id, data).then((result) => {
        res.status(200).send({result:true,message:"Test updated successfully",data:null});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({result:false,message:"Internal server error while updating test",data:null});
    });
});

// delete the test details
router.delete("/deleteTest/:id", async(req, res) =>{
    const id = String(req.params.id);
    try {
        if(await Test.findByIdAndDelete(id)) {
            res.status(200).send({result:true,message:"Test deleted successfully",data:null});
        }
        else {
            res.status(404).send({result:false,message:"Test not found",data:null});
        }
    } catch (error) {
        res.status(500).send({result:false,message:"Internal server error while deleting test",data:null});
    }
})

export default router;