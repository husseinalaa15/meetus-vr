import React, { useState } from "react";
import Layout from "../../components/templates/Layout";
import { Formik } from "formik";
import LoginCard from "../../components/moledcules/Card";
import { Form, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SignupSchema } from "./ValidationSchema";
import { useSignupMutation } from "../../store/Apislice";
import InputForm from "../../components/atoms/Input";
import InfoPopup from "../../components/atoms/InfoPopup";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const Registeration = () => {
  const [signupMutation] = useSignupMutation()

  const [status, setStatus] = useState<"success"|"failure" | null>(null);
  const [showModal,setShowModal] = useState(false)

  const navigate = useNavigate()

  const handleSuccess =  () => {
    setStatus('success');
    setShowModal(true);
  };

  const handleError = () => {
    setStatus('failure');
    setShowModal(true);
  };
  return (
    <Layout>
       {
        showModal && (
          <InfoPopup
          btnColor={status === 'success' ? 'success' : 'danger'}
          handleClose={() => {setShowModal(false); 
            if(status === 'success'){
    navigate("/login")
              
            }
          }}
          showModal={showModal}
          infoMsg={status === 'success' ? 'Signed up Successfully' : 'Something Went Wrong'}
          status={status}
        />
        )
      }
      <LoginCard title="Sign Up">
        <Formik
          initialValues={{ email: "", password: "", repassword: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            signupMutation(values) 
            .then((response) => {
              if ('error' in response) {
                const error = response.error as FetchBaseQueryError | SerializedError;
                if (error && 'status' in error && error.status === 401) {
                  handleError();
                }
              } else {
                handleSuccess();
              }
            })
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label htmlFor="email">Email:</label>
                  <InputForm name="email" type="email" value={values.email} handleChange={handleChange} handleBlur={handleBlur} error={errors.email} />
                </div>
                <div className="input-container">
                  <label htmlFor="password">Password:</label>
                  <InputForm name="password" type="password" value={values.password} handleChange={handleChange} handleBlur={handleBlur} error={errors.password} />
                </div>
                <div className="input-container">
                  <label htmlFor="repassword">Re-password:</label>
                  <InputForm name="repassword" type="repassword" value={values.repassword} handleChange={handleChange} handleBlur={handleBlur} error={errors.repassword} />
                </div>
              <Button type="submit" className="submit-btn">
                Sign up
              </Button>
              </form>
            </>
          )}
        </Formik>
      </LoginCard>
    </Layout>
  );
};

export default Registeration;
