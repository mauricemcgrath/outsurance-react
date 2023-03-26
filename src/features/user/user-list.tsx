import React, { useState, useEffect, useCallback } from 'react';
import { Spinner } from "reactstrap";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { User } from "../../models/user";
import {
  fetchUsersAsync,
  selectUsers,
  selectUsersStatus,
} from './user-slice';
import  './css/user-list.css';

export function UserList() {

  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUsersStatus);
  const dispatch = useAppDispatch();
  const [init, setInit] = useState("");

  const loadUsers = useCallback(() => {
    dispatch(fetchUsersAsync());
  }, [init]);

  useEffect(() => {
    if(!users || users.length === 0) {
        loadUsers(); 
    }
  }, [loadUsers]);

  return (
    <div>
      <div className="progress-spinner">
        {status === 'loading' ? <div><Spinner size="sm"></Spinner> Loading users...</div> : null }
      </div>

      <div className="users-list">
        {users &&
          users.map((user:User, index: Number) => (
            <div key={index.toString()} className="user-item">
              <div>
                <div className="avatar-outer">
                  <img
                    className="avatar"
                    alt={user.first_name + "" + user.last_name}
                    src={user.avatar}
                  ></img>
                </div>

                <div className="user-name">
                  {user.first_name} {user.last_name}
                  <div>
                    <a href={"mailto:" + user.email}>Email</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}