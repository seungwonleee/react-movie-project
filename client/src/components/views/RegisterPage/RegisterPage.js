import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
function RegisterPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onPasswordHanlder = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        }

        let body = {
            email: email,
            name: name,
            password: password
        }

        dispatch(registerUser(body))
            .then(res => {
                if (res.payload.success) {
                    props.history.push('/login')// 회원가입 성공시 로그인페이지로 이동
                } else {
                    alert('Faild to sign up')
                }
            })
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column'
            }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type='email' value={email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type='text' value={name} onChange={onNameHandler} />

                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHanlder} />

                <label>Confirm Password</label>
                <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} />
                < br />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage);
