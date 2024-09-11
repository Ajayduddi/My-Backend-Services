import bcrypt from 'bcrypt';

// encrypt password
export const hashPassword = (password) => {
    const salt = parseInt(process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

// compare password
export const comparePassword = (password, hash) => { 
    bcrypt.compareSync(password,hash).then((result) => {
        return result;
    }).catch((err) => {
        console.error(err);
        return false;
    });
};

// create employee id
export const createEmployeeId = () => { 
    const prefix = 'EMP';
    const p1 = Math.round(Math.random() * 100)+1;
    const p2 = Math.round(Math.random() * 10)+1 ;

    return `${prefix}-${p1}${p2}`;
}

// create Test id
export const createTestId = () => {
    const prefix = 'TEST';
    const p1 = Math.round(Math.random() * 100) + 1;
    const p2 = Math.round(Math.random() * 10) + 1;

    return `${prefix}-${p1}${p2}`;
}

//create appointment id
export const createAppointmentId = () => {
    const prefix = 'REQ';
    const p1 = Math.round(Math.random() * 10000) + 1;
    const p2 = Math.round(Math.random() * 100) + 1;

    return `${prefix}${p1}${p2}`;
}

// convert files into base64
export const convertFileToBase64 = (file) => {
    return new Promise((reslove, reject) => {
        const reader = new FileReader(); // create a new FileReader object 
        reader.readAsDataURL(file); // read the file as a data URL
        reader.onload = () => {
            reslove(reader.result); // return the result of reading the file as base64 format
        }
        reader.onerror = (error) => {
            reject(error); // return the error if something went wrong
        }
    })
}