import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Login.scss';
import newRequest from '../../utils/newRequest';
import Swal from 'sweetalert2';
import {useTranslation} from 'react-i18next';

function Login() {

    const countryOptions = [
        // { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
        // { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
        // { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
        // { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
        // { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
        // { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
        // { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
        // { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
        // { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
        // { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
        // { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
        // { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
        // { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
        // { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
        // { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
        // { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
        // { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
        // { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
        // { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
        // { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
        // { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
        // { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
        // { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },

    ];

    const {t, i18n} = useTranslation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [language, setLanguage] = useState("");

    const navigate = useNavigate();

    const handleAlert = (error) => {
        Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
            confirmButtonText: t("okButton"),
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newRequest.post("/auth/login", {username,password});
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            setLanguage(i18n.language);
            navigate('/');
            console.log(res.data);
            console.log(res.data.flag);
        } catch (error) {
            setError(error.response.data + 'error...');
            // setError('error...');
            handleAlert(error.response.data);
            console.log(error.response.data);
        }

    }

    return (
        <div className='loginContainer'>
            <div className="loginWrapper">
                <form action="" onSubmit={handleSubmit}>
                    <h1>{t("loginTitle")}</h1>
                    <div className="form-group">
                        <label htmlFor="username" className="form-control-label">{t("usernameLabelLoginText")}</label>
                        <input type="text" name="username" id="username" className="form-control-input" placeholder={t("usernameInputLoginPlaceholder")} onChange={(e)=>setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-control-label">{t("passwordLabelLoginText")}</label>
                        <input type="password" name="password" id="password" className="form-control-input" placeholder={t("passwordInputLoginPlaceholder")} onChange={(e)=>setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="form-control-button">{t("loginBtn")}</button>
                    </div>
                    <div className='form-group flex-row'>
                        <Link className='' to={'/register'}>{t("notHaveAcountYetText")}</Link>
                        <Link className='' to={'/forgotPassword'}>{t("forgotYourPassword")}</Link>
                    </div>
                    {/* <div>{error && error}</div> */}
                    {/* <div>{handleAlert()}</div> */}
                </form>
            </div>
        </div>
    );
}

export default Login;