import React, { FunctionComponent, useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import Loader from '../components/loader';
import UserService from '../services/users-service';
import { User } from './users';
import UpdateForm from '../components/Update-form';
 
type Params = { id: number };
  
const UserEdit: FunctionComponent = () => {
  let params = useParams()
  const [user, setUser] = useState<User|null>(null);

  const getData = async() => {
    await UserService.getUserById(+params.id).then(user => setUser(user))
  }
  
  useEffect(() => {
    getData()
  }, [+params.id]);
    
  return (
    <div>
      { user ? (
        <div className="row">
            <h2 className="header center">Éditer { user.firstname }</h2>
            <UpdateForm user={user} />
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default UserEdit;