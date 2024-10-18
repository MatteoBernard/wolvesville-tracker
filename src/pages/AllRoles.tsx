import { Template } from "./Template";
import { Role } from "../types";
import { useState } from "react";
import { transformRoleId } from "../utils";
import defaultImage from '../assets/img/wv-logo-nobg.png';
import { RoleDialog } from "../component";
import { RootState } from "../redux";
import { useSelector } from "react-redux";

export const AllRoles = () => {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const roles = useSelector((state: RootState) => state.roles);

    return (
        <Template>
            <div className="wv-red p-6 m-12 border rounded-lg border-wv-red border-8 max-w-4xl mx-auto bg-wv-white">
                <h1 className="text-4xl font-bold mb-6 text-center">Roles</h1>
                <div className="grid grid-cols-4 gap-4">
                    {roles.data ? (
                        roles.data.roles
                            .filter((role) => !role.id.includes('random'))
                            .map((role) => (
                                <div
                                    key={role.id}
                                    className="flex flex-col items-center p-4 border border-2 rounded-lg bg-wv-white cursor-pointer"
                                    onClick={() => setSelectedRole(role)}
                                >
                                    <img
                                        src={role.image.url || defaultImage}
                                        alt={role.id}
                                        className="w-16 h-16 mb-2"
                                        onError={(e) => (e.currentTarget.src = defaultImage)}
                                    />
                                    <h2 className="text-lg font-bold text-center">{transformRoleId(role.id)}</h2>
                                </div>
                            ))
                    ) : (
                        <p className="text-lg">Loading...</p>
                    )}
                </div>
                {selectedRole && (
                    <RoleDialog role={selectedRole} onClose={() => setSelectedRole(null)} />
                )}
            </div>
        </Template>
    );
};