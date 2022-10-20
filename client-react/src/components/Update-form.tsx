import React, { FunctionComponent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { UpdateUser, User } from '../pages/users';
import UserService from '../services/users-service';

  
type Props = {
  user: User 

};

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {
  firstname: Field,
  lastname: Field,
  email: Field,
}
  
const UpdateForm: FunctionComponent<Props> = ({user}) => {
  
    const [form, setForm] = useState<Form>({
        firstname : {value: user.firstname},
        lastname    : {value: user.lastname, isValid:true},
        email      : {value: user.email, isValid:true},
    })    
    const history = useNavigate();
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Si nos champs sont valide redirection
    const userUpdated = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      email: form.email.value,
    }
    
      UserService.updateUser(userUpdated, user._id).then(() => history(`/users/${user._id}`))
    
  }

  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-stacked">
              <div className="card-content">
                {/* user firstname */}
                <div className="form-group">
                  <label htmlFor="firstname">Prenom</label>
                  <input id="firstname" name="firstname" type="text" className="form-control" value={form.firstname.value} onChange={e => handleInputChange(e)}></input>
                  {form.firstname.error && 
                    <div className="card-panel red accent-1">
                        {form.firstname.error}
                    </div>
                  }
                </div>
                {/* user lastname */}
                <div className="form-group">
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" name="lastname" type="text" className="form-control" value={form.lastname.value} onChange={e => handleInputChange(e)}></input>
                  {form.lastname.error && 
                    <div className="card-panel red accent-1">
                        {form.lastname.error}
                    </div>
                  }
                </div>
                {/* user email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="text" className="form-control" value={form.email.value} onChange={e => handleInputChange(e)}></input>
                  {form.email.error && 
                    <div className="card-panel red accent-1">
                        {form.email.error}
                    </div>
                  }
                </div>
                
                <div className="card-action ">
                    <Link to="/users">Retour</Link>
                  </div>
                <div className="center">
                  {/* Submit button */}
                  <button className="btn" type="submit" >Valider</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default UpdateForm;