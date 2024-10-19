import { Template } from "./Template";
import { useEffect, useState } from "react";
import { getPlayer } from "../utils/vw-api";
import { Link, useParams } from "react-router-dom";
import { Player } from "../types";
import { getFormattedDate, isWithinFiveMinutes } from "../utils";
import rose from "../assets/img/rose.png";

export const ShowPlayer = () => {
    const { id } = useParams<{ id: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlayer = async () => {
            if (id) {
                try {
                    const player = await getPlayer(id);
                    setPlayer(player);
                } catch (err) {
                    setError('An error occurred while fetching the player.');
                }
            } else {
                setError('No player ID provided in the URL.');
            }
        };
        fetchPlayer();
    }, [id]);

    const formatCount = (count: number) => count === -1 ? "private" : count;

    return (
        <Template>
            {error ? (
                <p className={"text-red-500 text-lg"}>{error}</p>
            ) : player && (
                <div className={"m-3"}>
                    <div
                        className={"flex flex-col items-center p-6 m-12 border rounded-lg border-wv-red border-8 max-w-4xl mx-auto bg-wv-white"}>
                        <h1 className={"text-4xl font-bold mb-2"}>{player.username}</h1>
                        <p className={"text-sm italic mb-2"}>{player.personalMessage}</p>

                        <img src={player.equippedAvatar.url} width={player.equippedAvatar.width * 1.5}
                             height={player.equippedAvatar.height * 1.5} alt={`${player.username}'s avatar`}
                             className={"mb-2 bg-wv-blue border-4 border-wv-grey rounded-lg"}/>

                        <div className={"flex flex-col md:flex-row justify-between w-full"}>
                            <div className={"w-full md:w-1/2 p-4"}>
                                <h2 className={"text-2xl font-bold mb-2"}>Player Info</h2>
                                <ul className={"list-none"}>
                                    <li className={"mb-4"}>
                                        <strong>Level</strong> {player.level}
                                    </li>
                                    <li className={"mb-4"}>
                                        <strong>Account Created at</strong> {getFormattedDate(player.creationTime)}
                                    </li>
                                    <li className={"mb-4 flex"}>
                                        <strong>Roses Sent:&nbsp;</strong> {player.sentRosesCount}
                                        <img alt={"rose"} src={rose} height={16} width={16}/></li>
                                    <li className={"mb-4 flex"}><strong>Roses
                                        Received:&nbsp;</strong> {player.receivedRosesCount}
                                        <img alt={"rose"} src={rose} height={16} width={16}/></li>
                                    <li className={"flex items-center gap-2 mb-2"}>
                                        <strong>Status</strong> {isWithinFiveMinutes(player.lastOnline) ? "Online" : "Offline"}<span
                                        className={`h-3 w-3 rounded-full ${isWithinFiveMinutes(player.lastOnline) ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    </li>
                                    <li className={"mb-4"}>
                                        <strong>Clan: </strong>
                                        {player.clanId ? (
                                            <Link to={`/clan/${player.clanId}`}
                                                  className={"text-blue-500 underline p-1"}>
                                                View Clan
                                            </Link>
                                        ) : (
                                            "No clan"
                                        )}
                                    </li>
                                </ul>
                            </div>

                            <div className={"w-full md:w-1/2 p-4"}>
                                <h2 className={"text-2xl font-bold mb-2"}>Game Stats</h2>
                                <table
                                    className={"table-fixed w-full border-collapse border border-gray-400 rounded-lg"}>
                                    <tbody>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Total wins</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.totalWinCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Total losses</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.totalLoseCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Village wins</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.villageWinCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Village losses</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.villageLoseCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Werewolf wins</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.werewolfWinCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Werewolf losses</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.werewolfLoseCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Solo wins</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.soloWinCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Solo losses</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.soloLoseCount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>Total playtime</td>
                                        <td className={"border-2 px-4 py-2 border-wv-red"}>{formatCount(player.gameStats.totalPlayTimeInMinutes)} minutes</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Template>
    );
};