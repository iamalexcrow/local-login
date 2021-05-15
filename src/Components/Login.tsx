import React, {useState, useEffect, useRef} from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import {Redirect} from 'react-router-dom';
import {loginData} from '../data';
import {useGlobalContext} from './context';

type FormValues = {
    firstName: string,
    password: string,
    rememberMe: boolean,
    submit: any
}
  
interface Props {
  error?: boolean,
  onChange: any,
}

const Login:React.FC = () => {
  const {Data,setData, isAuth, setIsAuth} = useGlobalContext();
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const {register, handleSubmit,setError, clearErrors, formState: {errors, isSubmitting, isSubmitted}} = useForm<FormValues>();
  const checkUserName = React.useCallback(()=> {
    if (Data.firstName === loginData.email && Data.password === loginData.password) { 
      return setIsAuth(true);
    } else {
      setIsError(true);
    }
  }, [Data, setData, setIsAuth, setError]); 

    // useRef is used to avoid mistakes on the initial render
  const firstUpdate = useRef(true);
  useEffect(()=> {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setError('submit', {
      type: "manual",
      message: `Пользователя ${Data.firstName} не существует или пароль введен неверно`
    })
  }, [isError])


  React.useEffect(() => {
    if(isSubmitting){
      setIsDisabled(true);
      setTimeout(() => {
        checkUserName();
        setIsDisabled(false);
      }, 2000);
    }
  }, [checkUserName, isSubmitting]);
  
  if (isAuth) {
    return <Redirect to={"/"} />
  }
  return (
    <>
    <Form onSubmit={handleSubmit((data) => 
      setData(data)
    )}>
      {errors.submit &&
        <Mistake>
          <div className="danger">!</div>
          <p>{errors.submit.message}</p>
        </Mistake>
      }
      <Box>
        <label htmlFor="firstName">Логин</label>
        <Input error={errors.firstName ? true : false} {...register('firstName', { required: 'Обязательное поле' })} type="email" id="firstName" onChange={() => clearErrors('submit')} />
        {errors.firstName && <p className='error'>{errors.firstName.message}</p>}
      </Box>
      <Box>
        <label htmlFor="password">Пароль</label>
        <Input error={errors.password ? true : false} {...register('password', { required: 'Обязательное поле' })} type="password" id="password" onChange={() => clearErrors('submit')} />
        {errors.password && <p className='error'>{errors.password.message}</p>}
      </Box>
      <Box>
        <input type="checkbox" {...register('rememberMe')} id="rememberMe" />
        <label className="checkBox" htmlFor="rememberMe">Запомнить меня</label>
      </Box>
      <Button disabled={isDisabled} type="submit">Войти</Button>
      
      </Form>
      </>
  )
}

const Box = styled.div`
margin: 0 0 20px 0;
& label {
  font-family: Helvetica Neue;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
}
`
const Form = styled.form`
width: 640px;
display: flex;
flex-direction: column;

.error {
  font-family: Helvetica Neue;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color:rgba(226, 111, 111, 1);
}

.checkBox {
  padding-left: 11px;
}
`
const Button = styled.button`
  width: 100%;
  height: 60px;
  background: ${(props)=> props.disabled ? 'rgba(153, 169, 255, 1)' : 'rgba(74, 103, 255, 1)'};
  border-radius: 8px;
  border: none;
  color: white;
  margin: 20px 0 0 0;
  font-family: Helvetica Neue;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
`

const Mistake = styled.div`
width: 640px;
height: 60px;
background: rgba(245, 233, 233, 1);
border: 1px solid #E26F6F;
box-sizing: border-box;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: flex-start;
margin: 0 0 27px 0;

.danger {
  font-family: Helvetica Neue;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: rgba(238, 101, 101, 1);
  background: rgba(255, 200, 200, 1);
  border-radius: 50px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 14px 20px 20px;
} 

p {
  color: black;
  font-family: Helvetica Neue;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
}
`

const Input = styled.input`
    box-sizing: border-box;
    background: #E5E5E5;
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 8px;
    padding: 0px;
    margin: 10px 0 0 0;
    border: ${(props: Props) => props.error ? '1px solid rgba(226, 111, 111, 1)' : 'none'};
    outline: none;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    padding-left: 20px;
  }
`
export default Login;