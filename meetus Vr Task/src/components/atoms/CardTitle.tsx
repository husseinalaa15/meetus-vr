import React from 'react'



type IProps = {
    title:string
}
const CardTitle:React.FC<IProps> = ({title}) => {
  return (
    <div className='card-title'> {title} </div>
    )
}

export default CardTitle