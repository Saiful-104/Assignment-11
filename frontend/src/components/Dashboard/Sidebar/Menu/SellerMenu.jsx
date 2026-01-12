import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory, MdAnalytics } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Scholarship'
        address='add-scholarship'
      />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Scholarships'
        address='manage-scholarships'
      />
      <MenuItem
       icon={MdAnalytics}
        label='Analytics'
        address='Analytics'
      />
    </>
  )
}

export default SellerMenu
