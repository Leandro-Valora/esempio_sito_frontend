import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from "axios";

function Signup() {
    
    const[values, setValues] = useState({
        name : '',
        email : '',
        password : ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [validationPerformed, setValidationPerformed] = useState(false);

    const handleImput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    useEffect(() => {
        if (validationPerformed) {
            const handleValidation = () => {
                if (errors.name === "" && errors.email === "" && errors.password === "") {
                    axios.post("https://esempio-sito.onrender.com/signup", values).then(res => {
                    navigate("/");
                })
                    .catch(err => console.log(err));
                }
                else {
                    console.log("some type Error!");
                }
            };
            handleValidation();
        }
    }, [errors, navigate, validationPerformed, values]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form values:", values); valore dei campi formato json
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        setValidationPerformed(true);
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2> Sign-up</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type='text' placeholder='name' className='form-control rounded-0' 
                    name='name' onChange={handleImput} />
                    {errors.name && <span className='text-danger'> {errors.name} </span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='email@email.it' className='form-control rounded-0' 
                    name='email' onChange={handleImput}/>
                    {errors.email && <span className='text-danger'> {errors.email} </span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='enter password' className='form-control rounded-0' 
                    name='password' onChange={handleImput} />
                    {errors.password && <span className='text-danger'> {errors.password} </span>}
                </div>
                <br />
                <button type='submit' className='btn btn-success w-100 rounded-0'>Signup</button>
                <p>You are agree with our policies</p>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
    )
}

export default Signup;
