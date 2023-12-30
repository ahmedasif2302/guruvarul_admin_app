import { Route, Redirect } from "react-router";
import { isValidElement } from "../../Utils/helpers";

const RestrictedRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    (isValidElement(user?.token) && isValidElement(user?.user))
                        ? <Component {...props} />
                        : <Redirect to={{ pathname: '/login' }} />
                )
            }
            }
        />
    )
}

export default RestrictedRoute;


