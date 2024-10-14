import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux";
import {useEffect} from "react";
import {fetchRoles, fetchRolesRotations} from "../redux/slices";

export const Home = () => {

    const dispatch: AppDispatch = useDispatch();
    const { data, lastFetched } = useSelector((state: RootState) => state.roles);

    useEffect(() => {
        const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
        const shouldFetch = !lastFetched || (Date.now() - lastFetched > THREE_DAYS_IN_MS);

        if (shouldFetch) {
            dispatch(fetchRoles());
            dispatch(fetchRolesRotations());
        }
    }, [dispatch, lastFetched]);


    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}