import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

import "./topBar.scss";

export function TopBar(props) {
    const navigation = useNavigate();
    const { auth, closeSession } = useAuth();
    const displayName = auth.name;

    const goBack = () => {
        navigation(-1);
    };

    return (
        <div className="top-bar">
            <div className="top-bar__left">
                <Icon name="angle left" onClick={goBack} />
            </div>

            <div className="top-bar__right">
                <Icon name="power" onClick={closeSession} link />
            </div>
        </div>
    );
}
