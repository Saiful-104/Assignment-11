
import { MdHomeWork, 
   MdAssignment,
  MdRateReview,
  
  
} from 'react-icons/md'
import MenuItem from './MenuItem'
const StudentMenu = () => {
  return (
    <>
     
      {/* <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' /> */}
    
   
      <MenuItem
  icon={MdAssignment}
  label="My Applications"
  address="my-applications"
/>

<MenuItem
  icon={MdRateReview}
  label="My Reviews"
  address="my-reviews"
/>




    </>
  )
}

export default StudentMenu
