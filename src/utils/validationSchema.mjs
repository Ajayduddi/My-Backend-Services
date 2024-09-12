export const employeeSchema = {
    name: {
        notEmpty: {
            withMessage: 'Name is required'
        },
        isLength: {
            options: {
                min: 3,
                max: 255
            },
            withMessage: 'Name must be between 3 to 255 characters'
        },
        isString: {
            withMessage: 'Enter a valid name'
        }
    },
    phoneNo: {
        notEmpty: {
            withMessage: 'Phone number is required'
        },
        isLength: {
            options: {
                min: 10,
                max: 10
            },
            withMessage: 'Phone number must be of 10 digits'
        },
        isNumeric: {
            withMessage: 'Enter a valid phone number'
        }
    },
    email: {
        notEmpty: {
            withMessage: 'Email is required'
        },
        isEmail: {
            withMessage: 'Enter a valid email'
        }
    },
    password: {
        notEmpty: {
            withMessage: 'Password is required'
        },
        isLength: {
            options: {
                min: 6,
                max: 255
            },
            withMessage: 'Password must be between 6 to 255 characters'
        }
    },
    address: {
        notEmpty: {
            withMessage: 'Address is required'
        },
       isString: {
            withMessage: 'Enter a valid address'
        }
    },
    gender: {
        notEmpty: {
            withMessage: 'Gender is required'
        },
        isString: {
            withMessage: 'Enter a valid gender'
        }
    },
    role: {
        notEmpty: {
            withMessage: 'Role is required'
        },
        isString: {
            withMessage: 'Enter a valid role'
        }
    }
}

export const testSchema = {
    title: {
        isString: {
            withMessage: 'Enter a valid title'
        },
        notEmpty: {
            withMessage: 'Title is required'
        }
    },
    description: {
        isString: {
            withMessage: 'Enter a valid description'
        },
        notEmpty: {
            withMessage: 'Description is required'
        }
    },
    price: {
        isNumeric: {
            withMessage:"Enter a valid price"
        },
        notEmpty: {
            withMessage:"Price is requried"
        }
    }
}

export const appointmentSchema = {
    name: {
        isString: {
            withMessage: 'Enter a valid name'
        },
        notEmpty: {
            withMessage: 'Name is required'
        }
    },
    gender: {
        isString: {
            withMessage: 'Enter a valid gender'
        },
        notEmpty: {
            withMessage: 'Gender is required'
        }
    },
    date_of_birth: {
        isDate: {
            withMessage: 'Enter a valid date of birth'
        },
        notEmpty: {
            withMessage: 'Date of birth is required'
        }
    },
    phoneNo: {
        isNumeric: {
            withMessage: 'Enter a valid phone number'
        },
        notEmpty: {
            withMessage: 'Phone number is required'
        },
        isLength: {
            options: {
                min: 10,
                max: 10
            },
            withMessage: 'Phone number must be of 10 digits'
        }
    },
    email: {
        isEmail: {
            withMessage: 'Enter a valid email'
        },
        notEmpty: {
            withMessage: 'Email is required'
        }
    },
    appointment_date: {
        isDate: {
            withMessage: 'Enter a valid appointment date'
        },
        notEmpty: {
            withMessage: 'Appointment date is required'
        }
    },
    appointment_time: {
        isString: {
            withMessage: 'Enter a valid appointment time'
        },
        notEmpty: {
            withMessage: 'Appointment time is required'
        }
    },
    prescription: {
        isString: {
            withMessage: 'Enter a valid prescription'
        }
    }
}