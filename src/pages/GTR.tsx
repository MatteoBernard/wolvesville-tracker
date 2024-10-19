import { Template } from "./Template";
import { RootState } from "../redux";
import { useSelector } from "react-redux";
import { GTR as GTRModel, Role } from "../types";
import { useState } from "react";
import { transformRoleId, transformString } from "../utils";

export const GTR = () => {
    const roles = useSelector((state: RootState) => state.roles);
    const [game, setGame] = useState<GTRModel | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [proposedRoles, setProposedRoles] = useState<Role[]>([]);
    const [roleFound, setRoleFound] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(0);

    const startGame = () => {
        if (roles.data) {
            setGame(new GTRModel(roles.data.roles));
            setProposedRoles([]);
            setSearchTerm('');
            setRoleFound(false);
            setAttempts(0);
        } else {
            console.error('Roles not loaded');
        }
    };

    const handleRoleSubmit = () => {
        if (!searchTerm) {
            console.error('Search term is empty');
            return;
        }

        const role = roles.data?.roles.find(role => transformRoleId(role.id) === searchTerm);

        if (role && game) {
            setProposedRoles([...proposedRoles, role]);
            setSearchTerm('');
            setAttempts(attempts + 1);
            if (game.submitRole(role)) {
                setRoleFound(true);
            }
        } else {
            console.error('Invalid role selected');
        }
    };

    const filteredRoles = roles.data
        ? roles.data.roles.filter((role) => role.id.includes(searchTerm) && !role.id.includes('random'))
        : [];

    return (
        <Template>
            <div className={"wv-red p-6 m-12 border rounded-lg border-wv-red border-8 max-w-4xl mx-auto bg-wv-white"}>
                <h1 className={"text-4xl font-bold mb-6 text-center"}>Guess the role</h1>

                {!game ? (
                    <div className={"flex justify-center mt-6"}>
                        <button className={"bg-wv-blue p-4 rounded-lg"} onClick={startGame}>Start Game !</button>
                    </div>) : (
                    <>
                        <div className={"mb-4"}>
                            <div className={"flex w-full gap-2"}>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search roles..."
                                    className={"p-2 border border-gray-300 rounded-l w-full"}
                                    list="roles-list"
                                    disabled={roleFound}
                                    style={{ height: '40px' }}
                                />
                                <button className={"p-2 bg-wv-blue rounded-r text-sm"} onClick={handleRoleSubmit} disabled={roleFound} style={{ height: '40px' }}>
                                    Try
                                </button>
                            </div>
                            <datalist id="roles-list">
                                {filteredRoles.map((role, index) => (
                                    <option key={index} value={transformRoleId(role.id)}>
                                        {transformRoleId(role.id)}
                                    </option>
                                ))}
                            </datalist>
                        </div>

                        {roleFound && (
                            <div className={"text-center text-green-500 m-4"}>
                                Congratulations! You have found the correct role.
                            </div>
                        )}

                        {!roleFound && attempts >= 5 && game.getChosenRole() && (
                            <div className={"text-center text-red-500 mb-4"}>
                                Hint: {game.getChosenRole()?.description}
                            </div>
                        )}

                        <table className={`min-w-full bg-white border border-gray-300 ${attempts === 0 && "hidden"}`}>
                            <thead>
                            <tr>
                                <th className={"py-2 text-center border-b border-gray-300"}>Icon</th>
                                <th className={"py-2 text-center border-b border-gray-300"}>Name</th>
                                <th className={"py-2 text-center border-b border-gray-300"}>Team</th>
                                <th className={"py-2 text-center border-b border-gray-300"}>Aura</th>
                            </tr>
                            </thead>
                            <tbody>
                            {proposedRoles.map((role, index) => {
                                return (
                                    <tr key={index} className={"text-center"}>
                                        <td className={`py-2 border-b border-gray-300 ${game?.getChosenRole()?.image.url === role.image.url ? 'bg-green-400' : 'bg-red-400'}`}>
                                            <img
                                                src={role.image.url}
                                                alt={transformRoleId(role.id)}
                                                className={"w-8 h-8 mx-auto"}
                                            />
                                        </td>
                                        <td className={`py-2 border-b border-gray-300 ${game?.getChosenRole()?.id === role.id ? 'bg-green-400' : 'bg-red-400'}`}>{transformRoleId(role.id)}</td>
                                        <td className={`py-2 border-b border-gray-300 ${game?.getChosenRole()?.team === role.team ? 'bg-green-400' : 'bg-red-400'}`}>{transformString(role.team)}</td>
                                        <td className={`py-2 border-b border-gray-300 ${game?.getChosenRole()?.aura === role.aura ? 'bg-green-400' : 'bg-red-400'}`}>{transformString(role.aura)}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        {roleFound && (
                            <div className={"flex justify-center mt-6"}>
                                <button className={"bg-wv-blue p-4 rounded-lg"} onClick={startGame}>Restart Game</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Template>
    );
};