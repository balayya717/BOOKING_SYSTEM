import React, {useState} from 'react';
import './Styles.css'
import Home from './Home';
import RegisterUser from './RegisterUser';
import { Link } from 'react-router-dom';
import App from '../App';
import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL

const Login = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [initialValid, setInitialValid]  = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);  // Used to check whether otp is sent to mobile number or not
    const [otpValue, setOtpValue] = useState(''); //Stores the otp value given by user
    const [isOtpValid, setOtpvalid] = useState(true); //To check whether user enters 4 digits numbers or not in front-end
    const [initialOtpValid, setInitialOtp] = useState(false);
    let isRegisteredUser = false;

    const handleInputChange = (event) => {
        const phoneNumber = event.target.value;
        const isValidInput = /^\d{10}$/.test(phoneNumber);

        setPhoneNumber(phoneNumber);
        setIsValid(isValidInput);
        setInitialValid(true);
    }

    const handleSubmitNumber = async(event) => {
        event.preventDefault();
        console.log(phoneNumber);

        await axios.get(`${baseUrl}/user/otp/send-otp`)
        setIsOtpSent(true);
    }

    const handleOTPChange = (event) => {
        const otp = event.target.value;
        const isValidOTP = /^\d{4}$/.test(otp);

        setOtpvalid(isValidOTP);
        setOtpValue(otp);
        setInitialOtp(true);
    }

    const handleOtpSubmit = async(event) => {
        event.preventDefault();
        console.log(otpValue);

        // await axios.get(`${baseUrl}/articles/${type}/${id}`)
    }

    

    return (
        <>  
            <form onSubmit={handleSubmitNumber}>
                <label >
                    <p className='headName'>Mobile number: </p>
                    <input type='tel' value={phoneNumber} onChange={handleInputChange} className='numberEnter'
                           pattern='[0-9]{10}' placeholder='Please enter a valid 10 digit mobile number..'/>

                    <button type='submit' className='btn btn-warning' disabled={!isValid || !initialValid || isOtpSent}>Send OTP</button>
                    <br></br>
                    {!isValid && <p style={{ color: 'red' }}>Please enter a valid 10-digit number.</p>} 

                </label>
            </form>


            {isOtpSent && 
            <form className='otp-field' onSubmit={handleOtpSubmit}>
                <div className='otp-input-filed'>
                    <p className='otpName'>Please enter the OTP sent to +91-XXX-XXX-{phoneNumber.slice(6,10)} : </p>
                    <input type='tel' value={otpValue} onChange={handleOTPChange} className='otpEnter'
                            pattern='[0-9]{4}' placeholder='Enter OTP'/>
                    <br></br>
                </div>
                <button type='submit' className='btn btn-success otp-button' disabled={!isOtpValid || !initialOtpValid}>
                            <Link to = {!isRegisteredUser ? '/register-user' : '/home'}>
                            Submit</Link></button>
            </form>}

            
        </>
    )
}

export default Login