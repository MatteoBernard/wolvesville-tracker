import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux";
import { useEffect, useState } from "react";
import { fetchRoles, fetchRolesRotations } from "../redux/slices";
import { Template } from "./Template";
import { Clan, Player } from "../types";
import { searchClan, searchPlayer } from "../utils/vw-api";
import { Link } from "react-router-dom";

export const Home = () => {
    const dispatch: AppDispatch = useDispatch();
    const { lastFetched } = useSelector((state: RootState) => state.roles);

    const [isPlayerSelected, setIsPlayerSelected] = useState(true);
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<Player | Clan[] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
        const shouldFetch = !lastFetched || (Date.now() - lastFetched > THREE_DAYS_IN_MS);

        if (shouldFetch) {
            dispatch(fetchRoles());
            dispatch(fetchRolesRotations());
        }
    }, [dispatch, lastFetched]);

    const handleSearch = async () => {
        setError('');
        setResult(null);
        try {
            if (isPlayerSelected) {
                const player = await searchPlayer(query);
                if (player) {
                    setResult(player);
                } else {
                    setError('No player found with that name.');
                }
            } else {
                const clans = await searchClan(query);
                if (clans && clans.length > 0) {
                    setResult(clans);
                } else {
                    setError('No clans found with that name.');
                }
            }
        } catch (err) {
            setError('An error occurred while searching.');
        }
    };

    return (
        <Template>
            <div className={"flex flex-col justify-center items-center p-6 m-16 border rounded-lg border-wv-red border-8 max-w-2xl mx-auto bg-wv-white"}>
                <h1 className={"text-2xl m-4 font-bold"}>{isPlayerSelected ? "Search for a player" : "Search for a clan"}</h1>
                <div className={"flex gap-6 mb-6"}>
                    <button
                        onClick={() => {
                            setIsPlayerSelected(true);
                            setResult(null);
                        }}
                        className={`px-6 py-3 text-md rounded ${isPlayerSelected ? 'bg-wv-red text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Player
                    </button>
                    <button
                        onClick={() => {
                            setIsPlayerSelected(false);
                            setResult(null);
                        }}
                        className={`px-6 py-3 text-md rounded ${!isPlayerSelected ? 'bg-wv-red text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Clan
                    </button>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={"search-input px-6 py-3 border rounded w-80 mb-6 text-md"}
                />
                <button
                    onClick={() => handleSearch()}
                    className={"px-6 py-3 bg-wv-red text-white rounded text-md"}
                >
                    Search
                </button>
                {error && <p className={"text-red-500 mt-6 text-lg"}>{error}</p>}
                {result && (
                    <div className={"result-container mt-6 w-1/2 flex justify-center"}>
                        {isPlayerSelected ? (
                            <Link
                                to={`/player/${(result as Player).id}`}
                                className={"bg-gray-100 p-6 rounded cursor-pointer text-md"}
                            >
                                {(result as Player).username}
                            </Link>
                        ) : (
                            result && (
                                <ul className={"max-h-96 overflow-y-auto"}>
                                    {(result as Clan[]).map(clan => (
                                        <li key={clan.id} className={"bg-gray-100 p-4 rounded text-lg m-2"}>
                                            <Link
                                                to={`/clan/${clan.id}`}
                                                className={"cursor-pointer"}
                                            >
                                                {clan.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )
                        )}
                    </div>
                )}
            </div>
        </Template>
    );
};