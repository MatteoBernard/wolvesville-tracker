import React from 'react';
import { Role } from '../types';
import {transformRoleId, transformString} from "../utils";

interface RoleDialogProps {
    role: Role;
    onClose: () => void;
}

export const RoleDialog: React.FC<RoleDialogProps> = ({ role, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 flex justify-center flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">{transformRoleId(role.id)}</h2>
                <img src={role.image.url} alt={role.id} className="w-32 h-32 mb-4" />
                <p className={"p-4"}>{role.description}</p>
                <p className={"p-4"}>Aura : {transformString(role.aura)}</p>
                <p className={"p-4"}>Team : {transformString(role.team)}</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-wv-blue text-white rounded">Close</button>
            </div>
        </div>
    );
};