// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './LoginValidation';
// import axios from 'axios';

// function Login() {

//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     });

//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});
//     const [validationPerformed, setValidationPerformed] = useState(false);

//     const handleInput = (event) => {
//         setValues(prev => ({...prev, [event.target.name]: event.target.value}));
//     };

//     useEffect(() => {
//         console.log("sono dentro , non può entrareee");
//         if (validationPerformed) {
//             const handleValidation = () => {
//                 if (errors.email === "" && errors.password === "") {
//                     axios.post("https://esempio-sito.onrender.com/login", values).then(res => {
//                         if (res.data === "Success") {
//                             navigate("/home");
//                         } else {
//                             alert("Errore");
//                         }
//                     })
//                     .catch(err => console.log(err));
//                 } else {
//                     console.log("Some problem");
//                 }
//             };
//             handleValidation();
//         }
//     }, [errors, navigate, validationPerformed, values]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const validationErrors = Validation(values);
//         setErrors(validationErrors);
//         setValidationPerformed(true);
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <h2> Login </h2>
//                 <form action='' onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor='email'><strong>Email</strong></label>
//                         <input type='email' name='email' placeholder='enter email' 
//                         onChange={handleInput} className='form-control rounded-0' />
//                         {errors.email && <span className='text-danger'> {errors.email} </span>}
//                     </div>
//                     <br />
//                     <div className='mb-3'>
//                         <label htmlFor='password'><strong>Password</strong></label>
//                         <input type='password' placeholder='enter password' id='password' name='password' onChange={handleInput} className='form-control rounded-0' />
//                         {errors.password && <span className='text-danger'> {errors.password} </span>}
//                     </div>
//                     <span className='text-danger' id='errorAccess'></span>
//                     <br />
//                     <button type="submit" className='btn btn-success w-100'>Login</button>
//                     <br />
//                     <p>  You are agree with our policies</p>
//                     <Link to="/Signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create account</Link>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [validationPerformed, setValidationPerformed] = useState(false);
    const [loginError, setLoginError] = useState(false); // New state to track login error

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    useEffect(() => {
        if (validationPerformed) {
            const handleValidation = () => {
                if (errors.email === "" && errors.password === "") {
                    axios.post("https://esempio-sito.onrender.com/login", values).then(res => {
                        if (res.data === "Success") {
                            navigate("/home");
                        } else {
                            setLoginError(true); // Set login error state to true if login fails
                        }
                    })
                    .catch(err => console.log(err));
                }
            };
            handleValidation();
        }
    }, [errors, navigate, validationPerformed, values]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        setValidationPerformed(true);
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2> Login </h2>
                <p>{loginError && <span className='text-danger'>Errore credenziali, Riprova.</span>}</p>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' name='email' placeholder='enter email' 
                        onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'> {errors.email} </span>}
                    </div>
                    <br />
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='enter password' id='password' name='password' onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'> {errors.password} </span>}
                    </div>
                    <br />
                    <button type="submit" className='btn btn-success w-100'>Login</button>
                    <br />
                    <p>  You are agree with our policies</p>
                    <Link to="/Signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
