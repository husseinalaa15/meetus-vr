import { Formik } from 'formik'
import React from 'react'
import { Button } from 'react-bootstrap'
import InputForm from '../atoms/Input'
import { useAddTaskMutation } from '../../store/Apislice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

const AddTask = () => {
    const [addTaskMutation] = useAddTaskMutation()
  return (
    <div className="action-btn text-end" >
        <Formik initialValues={{task:""}}        
         onSubmit={(values) => {
            const {task} = values
            addTaskMutation(task) 
            .then((response:any) => {
              if ('error' in response) {
                const error = response.error as FetchBaseQueryError | SerializedError;
                if (error && 'status' in error && error.status === 401) {
                //   handleError();
                console.log(error)
                }
              } else {
                // handleSuccess()
                console.log('success');
              }
            })

         }}
        >
          {({values,errors,handleChange,handleBlur,handleSubmit})=>(
            <form className='d-flex justify-content-center align-items-center' onSubmit={handleSubmit}>
                <InputForm placeholder='Add New Task'  name="task" type="text" value={values.task} handleChange={handleChange} handleBlur={handleBlur} error={undefined} />
                <Button type='submit'>Add Task </Button>
            </form>
          )}
          </Formik>
    </div>  
)
}

export default AddTask