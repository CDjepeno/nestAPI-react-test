import { FunctionComponent, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { User } from '../pages/users';
import UserService from '../services/users-service';


type Props = {
    user : User 
    borderColor?: string
}

const UserCard : FunctionComponent<Props> = ({user, borderColor = '#ff0000'}) => {

    const [color, setColor] = useState<string>();
    const history = useNavigate();

    const showBorder = () => {
        setColor(borderColor)
    }
    
    const hideBorder = () => {
        setColor('#f5f5f5') // Ont remet la bordure initiale
    }

    const goToUser = (_id: any) => {
        history(`/users/${_id}`)
    } 


    return ( 
        <div id="card" className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder} onClick={() => goToUser(user._id)}>
            <div className="card horizontal hoverable" style={{ borderColor: color }}>
                <div className="card-image col">
                    <img  src={user.email} alt=""/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p className="center b={-5}">{user.firstname}</p>
                        <p className="center b={-5}">{user.lastname}</p>
                            {/* <span className={formatType(user.type)}>{fighter.type}</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserCard;

