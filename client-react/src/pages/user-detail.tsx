import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../services/users-service";
import context from "../context/context";
import { Box, Button } from "@material-ui/core";
import { User } from "./users";


const UsersDetail: FunctionComponent = () => {
  let params = useParams()
  const [user, setUser] = useState<User | null>(null);
  const { isAuthenticatedUser } = useContext(context);
  const history = useNavigate();

  useEffect(() => {
    UserService.getUserById(+params.user).then((user) => setUser(user));
  }, [+params.id]);

  const handleDelete = () => {
    UserService.deleteUser(+params.user);
    history("/users");
  };
  return (
    <div>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <h2 className="header center">{user.firstname}</h2>
          <div className="card hoverable">
            <div className="card-image ">
              {isAuthenticatedUser && (
                <Link
                  to={`/users/edit/${user._id}`}
                  className="btn btn-floating halfway-fab waves-effect waves-light"
                >
                  <i className="material-icons">edit</i>
                </Link>
              )}
            </div>

            <div className="card-stacked">
              <div className="card-content ">
                <table className="bordered striped ">
                  <tbody>
                    <tr>
                      <td>Prenom</td>
                      <td>
                        <strong>{user.firstname}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Nom</td>
                      <td>
                        <strong>{user.lastname}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        <strong>{user.email}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="card-action ">
                  <Link to="/fighters">Retour</Link>

                  <Link to="/fighters" className="band-logo right">
                    <Box>
                      <Button
                        onClick={handleDelete}
                        color="secondary"
                        variant="contained"
                      >
                        Supprimer
                      </Button>
                    </Box>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersDetail;
