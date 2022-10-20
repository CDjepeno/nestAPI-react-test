import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../pages/users';
import AuthenticationService from '../services/Authentification-service';
import UserService from '../services/users-service';

  
type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {
  firstname: Field,
  lastname: Field,
  email: Field,
  password: Field,
}
  
const RegisterForm: React.FC = () => {
  
  const [form, setForm] = useState<Form>({
      firstname : {value: ""},
      lastname    : {value: ""},
      email      : {value: ""},
      password      : {value: ""},
  })

  const history = useNavigate();
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: {value: fieldValue} };

    setForm({ ...form, ...newField});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const user: User = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      email: form.email.value,
      password: form.password.value,
    }

    AuthenticationService.register(user).then(() => history('/users'));
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
                </div>
                {/* user lastname */}
                <div className="form-group">
                  <label htmlFor="lastname">Nom</label>
                  <input id="lastname" name="lastname" type="number" className="form-control" value={form.lastname.value} onChange={e => handleInputChange(e)}></input>
                </div>
                {/* user email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="number" className="form-control" value={form.email.value} onChange={e => handleInputChange(e)}></input>
                </div>
                {/* user password */}
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input id="password" name="password" type="number" className="form-control" value={form.password.value} onChange={e => handleInputChange(e)}></input>
                </div>
                <div className="card-action ">
                    <Link to="/fighters">Retour</Link>
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
   
export default RegisterForm;