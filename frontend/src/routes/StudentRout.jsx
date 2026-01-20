import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router';

const StudentRout = () => {
     const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'student') return children
  return <Navigate to='/' replace='true' />
};

export default StudentRout;