import {  Formik } from 'formik'
import { Button } from 'react-bootstrap'
import Layout from '../../components/templates/Layout'
import LoginCard from '../../components/moledcules/Card'
import { LoginSchema } from './ValidationSchema'
import { useLoginMutation } from '../../store/Apislice'
import { useDispatch } from 'react-redux'
import { setToken } from '../../store/authslice'
import {  useEffect, useState } from 'react'
import InfoPopup from '../../components/atoms/InfoPopup'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { loginResponse } from '../../store/types'
import { useNavigate } from 'react-router'

const Login = () => {
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const [loginMutation ,{ isLoading}] = useLoginMutation()
  const [status, setStatus] = useState<"success"|"failure" | null>(null);
  const [showModal,setShowModal] = useState(false)


  const handleSuccess =  (data:loginResponse) => {
    dispatch(setToken(data.token));
    setStatus('success');
    setShowModal(true);
  };

  const handleError = () => {
    setStatus('failure');
    setShowModal(true);
  };



  const handleModalClose =  () => {
    
     setShowModal(false)

  }


  return (
    <Layout >
      {
        showModal && (
          <InfoPopup
          btnColor={status === 'success' ? 'success' : 'danger'}
          handleClose={handleModalClose}
          showModal={showModal}
          infoMsg={status === 'success' ? 'User Successfully Logged In' : 'Something Went Wrong'}
          status={status}
        />
        )
      }
    
        <LoginCard title='Login'>

        <Formik initialValues={{email:'',password:''}}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          loginMutation(values)
          .then((response:any) => {
            if ('error' in response) {
              // Response with an error
              const error = response.error as FetchBaseQueryError | SerializedError;
              if (error && 'status' in error && error.status === 401) {
                // Handle 401 error
                handleError();
              } 
            } else {
              // Successful response
              handleSuccess(response.data);
            }
          })
        }}
        >
          {({values,errors,handleChange,handleBlur,handleSubmit})=>(
            <>
              <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <label htmlFor='email' >Email:</label>
              <input type='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
              <span className='input-error'>{errors.email}</span>
            </div>
            <div className='input-container'>
              <label htmlFor='email' >Password:</label>
              <input type='password' name='password' onChange={handleChange} onBlur={handleBlur} value={values.password} />
              <span className='input-error'>{errors.password}</span>

            </div>
            <Button type='submit' className='submit-btn'  >
            {isLoading ? 'Logging in...' : 'Login'}

            </Button>
          </form>
            </>
          )}
        </Formik>


        </LoginCard>
        

     
    </Layout>
  )
}

export default Login