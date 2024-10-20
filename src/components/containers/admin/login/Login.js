import './Login.scss'
import Input from "../../../common/form/input/Input";
import FormGroup from "../../../common/form/formGroup/FormGroup";
import {useFormik} from "formik";
import Button from "../../../common/button/Button";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

const Login = () => {
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const formik = useFormik({initialValues: {}})

    const login = () => {
        setError(null)
        axios.request({url: "/users/sign_in", data: {user: formik.values}, method: "POST"})
            .then(result => {
                localStorage.setItem("token", result.headers.authorization.split(" ")[1])
                navigate("/admin/categories")
            })
            .catch(e => {
                if (e.response?.status === 401) {
                    setError("Wrong credentials")
                } else {
                    throw e
                }
            });
    }

    return <div className="login">
        <FormGroup>
            <Input name='login' formik={formik} label="Login"/>
            <Input name='password' formik={formik} label="Password" type="password"/>
            {error && <span className="error">{error}</span>}

            <Button onClick={login}>Login</Button>
        </FormGroup>
    </div>
}

export default Login