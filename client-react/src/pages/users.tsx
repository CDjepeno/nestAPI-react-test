import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import context from '../context/context';
import UserService from '../services/users-service';
import UserCard from '../components/user-card';
import { Link } from 'react-router-dom';

export type User = {
  _id?: number;
  firstname: string;
  lastname: number;
  email: string;
  password?: string
};

export type UpdateUser = {
  _id: number
  firstname: string;
  lastname: number;
  email: string;
};


export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const { isAuthenticatedUser } = useContext(context);

  console.log(isAuthenticatedUser);

  const getData = async () => {
    await UserService.getUsers().then((users) => setUsers(users));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <div className="container">
        <div className="row">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
        {isAuthenticatedUser && (
          <Link
            className="btn-floating btn-large waves-effect waves-light red z-depth-3"
            style={{ position: 'fixed', bottom: '25px', right: '25px' }}
            to="/fighter/add"
          >
            <i className="material-icons">add</i>
          </Link>
        )}
      </div>
    </div>
  );
};

