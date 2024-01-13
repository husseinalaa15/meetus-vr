import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from '../atoms/CardTitle'
import Logo from '../atoms/Logo'


type IProps = {
    title:string,
    children: React.ReactNode
}
const LoginCard:React.FC<IProps> = ({title,children}) => {
  return (
    <Card className='card'>
        <CardTitle title={title} /> 
        {children}
        <Logo />
    </Card>
  )
}

export default LoginCard