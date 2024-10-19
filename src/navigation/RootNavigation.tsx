import {Route, Routes} from "react-router-dom";
import {AllRoles, GTR, Home, RolesRotation, ShowClan, ShowPlayer} from "../pages";

export const RootNavigation = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roles" element={<AllRoles />} />
            <Route path="/rolesRotation" element={<RolesRotation />} />
            <Route path="/player/:id" element={<ShowPlayer />} />
            <Route path="/clan/:id" element={<ShowClan />} />
            <Route path="/guessTheRole" element={<GTR />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}