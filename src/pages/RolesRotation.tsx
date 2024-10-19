import { Template } from "./Template";
import { RootState } from "../redux";
import { useSelector } from "react-redux";
import { transformRoleId } from "../utils";

export const RolesRotation = () => {
    const rolesRotations = useSelector((state: RootState) => state.rolesRotations);

    console.log(rolesRotations);

    return (
        <Template>
            <div className={"m-3"}>
                <div className="wv-red p-6 m-6 border rounded-lg border-wv-red border-8 max-w-4xl mx-auto bg-wv-white flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Roles Rotation</h1>
                    {rolesRotations.data ? (
                        <div>
                            {rolesRotations.data.map((gameConfig) => (
                                <div key={gameConfig.gameMode} className="mx-8 my-6">
                                    <p className="text-2xl font-semibold text-gray-700">{transformRoleId(gameConfig.gameMode)}</p>
                                    <ul className="list-none p-2">
                                        {gameConfig.roleRotations.map((roleRotation) => (
                                            <div key={roleRotation.roleRotation.id} className="mt-6">
                                                <p className="text-lg text-gray-600">
                                                    {roleRotation.roleRotation.roles.flat()
                                                        .filter((role) => role.role !== undefined)
                                                        .map((role) => transformRoleId(role.role))
                                                        .join(' - ')}
                                                </p>
                                                <p className="text-sm text-gray-500 m-2">Probability: {roleRotation.probability}</p>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Loading...</p>
                    )}
                </div>
            </div>
        </Template>
    );
};