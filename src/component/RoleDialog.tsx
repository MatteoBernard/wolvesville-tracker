import React from 'react';
import { Role } from '../types';
import {transformRoleId, transformString} from "../utils";
import defaultImage from '../assets/img/wv-logo-nobg.png';


interface RoleDialogProps {
    role: Role;
    onClose: () => void;
}

export const RoleDialog: React.FC<RoleDialogProps> = ({ role, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/2 flex justify-center flex-col items-center">
                <h2 className="text-2xl font-bold mb-4" id={"role-name"}>{transformRoleId(role.id)}</h2>
                <img src={role.image.url || defaultImage} alt={role.id} className="w-32 h-32 mb-4" id={"role-img"} onError={(e) => (e.currentTarget.src = defaultImage)} />
                <p className={"p-4"} id={"role-description"}>{role.description}</p>
                <p className={"p-4"} id={"role-aura"}>Aura : {transformString(role.aura)}</p>
                <p className={"p-4"} id={"role-team"}>Team : {transformString(role.team)}</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-wv-blue text-white rounded" id={"close-btn"}>Close</button>
            </div>
        </div>
    );
};