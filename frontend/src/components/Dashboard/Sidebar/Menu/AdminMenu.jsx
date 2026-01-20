import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'
import {MdOutlineManageHistory, MdAnalytics } from 'react-icons/md'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
       <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Scholarship'
        address='add-scholarship'
      />
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

export default AdminMenu
