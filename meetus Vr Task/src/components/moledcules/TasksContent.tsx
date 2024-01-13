import React, { useState } from 'react'
import { useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from '../../store/Apislice'
import { Button } from 'react-bootstrap'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import InputForm from '../atoms/Input'
import { Formik } from 'formik'
import InfoPopup from '../atoms/InfoPopup'

const TasksContent = () => {

    const {data,isLoading} = useGetTasksQuery()   
    const [deleteMutation] = useDeleteTaskMutation()
    const [updateMutation] = useUpdateTaskMutation()

    const [editMode,setEditMode] = useState<{id:string,edit:boolean}| null>()
    const [deletePopup ,setDeletePoup] = useState(false)
    const [deleteID,setDeleteID] = useState('')
    const handleDelete =(id:string) => {
        deleteMutation(id)
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
              setDeleteID('')
              setDeletePoup(false)
            }
          })
        

    }
    const changeStatus =(id:string,status:string) => {
        const taskId = id 
        const taskStatus = status=== 'completed' ? 'pending' : 'completed' 
        updateMutation({taskId,status:taskStatus})
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
    }
    const handleEditTask = (values:{task:string},id:string) => {
        const {task} = values
        updateMutation({taskId:id,updatedTask:task})
        .then((response:any) => {
            if ('error' in response) {
              const error = response.error as FetchBaseQueryError | SerializedError;
              if (error && 'status' in error && error.status === 401) {
              //   handleError();
              console.log(error)
              }
            } else {
              // handleSuccess()
              setEditMode(null)
            }
          })
    }
    const getStatusStyles =(status:string) => {
        if(status === 'completed') {
            return 'bg-success'
        }
        return 'bg-yellow'
    }
    const getContent = () => {
        if(data?.tasks.length !== 0) {
            console.log(data?.tasks)
            return (
                <>
                {data?.tasks.map((task,index)=>(
                    <div className='task-record '  key={task.id}>
                        {/* <div >{index}</div> */}
                        <div>

                            {editMode?.id === task.id && editMode?.edit ? 
                                <Formik initialValues={{task:task.task}}        
                                onSubmit={(values) =>handleEditTask(values,task.id)}
                               >
                                 {({values,errors,handleChange,handleBlur,handleSubmit})=>(
                                   <form className='d-flex  justify-content-between edit-form align-items-center' onSubmit={handleSubmit}>
                                       <InputForm placeholder='Add New Task'  name="task" type="text" value={values.task} handleChange={handleChange} handleBlur={handleBlur} error={undefined} />
                                       <Button type='submit'>Save </Button>
                                   </form>
                                 )}
                                 </Formik>
                            
                            :task.task}
                        </div>
                        <Button className={getStatusStyles(task.status)} onClick={()=>changeStatus(task.id,task.status)}>{task.status}</Button>

                        <Button className=' edit-task ' onClick={()=>{setEditMode({id:task.id,edit:true}); }}>Edit</Button>
                        <Button className="delete-task" onClick={()=>{setDeletePoup(true);setDeleteID(task.id)}}> Delete </Button>
                    </div>
                ))}
                </>
            ) 
        }
        return (
            <div className='empty-state'>
                There Are No Tasks Available, Please Add Tasks
            </div>
        )
    }
  return (
    <div className='tasks-content'>
        {deletePopup && (
            <InfoPopup btnColor='danger' handleClose={()=>setDeletePoup(false)} infoMsg='Are You sure you want to delete this Task ? ' showModal={deletePopup} status={null} handleConfirm={()=>handleDelete(deleteID)}  />
        )}
        {getContent() }
    </div>
  )
}

export default TasksContent