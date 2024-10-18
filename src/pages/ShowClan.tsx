import {Template} from "./Template";
import {ClanInfos, ClanMember} from "../types";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getClan, getClanMembers} from "../utils/vw-api";
import {getFormattedDate, transformString} from "../utils";
import gem from "../assets/img/gem.png";
import gold from "../assets/img/gold.png";

export const ShowClan = () => {

    const { id } = useParams<{ id: string }>();
    const [clan, setClan] = useState<ClanInfos | null>(null);
    const [members, setMembers] = useState<ClanMember[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClan = async () => {
            if (id) {
                try {
                    const clan = await getClan(id);
                    setClan(clan);
                    console.log(clan?.leaderId)
                    const members = await getClanMembers(id);
                    setMembers(members);
                } catch (err) {
                    setError('An error occurred while fetching the clan.');
                }
            } else {
                setError('No player ID provided in the URL.');
            }
        }
        fetchClan();
    }, [id]);

    return (
        <Template>
            {error ? (
                <p className={"text-red-500 text-lg"}>{error}</p>
            ) : (clan && members) && (
                <div className={"flex flex-col items-center p-6 m-12 border rounded-lg border-wv-red border-8 max-w-4xl mx-auto bg-wv-white"}>
                    <h1 className={"text-4xl font-bold mb-2"}>{clan.name}</h1>
                    <p className={"text-sm italic mb-2"}>{clan.description}</p>
                    <div className={"flex justify-between w-full"}>
                        <div className={"w-1/2 p-4"}>
                            <h2 className={"text-2xl font-bold mb-2"}>Clan Info</h2>
                            <ul className={"list-none"}>
                                <li className={"mb-4"}>
                                    <strong>Clan Created at</strong> {getFormattedDate(clan.creationTime)}
                                </li>
                                <li className={"mb-4"}>
                                    <strong>XP</strong> {clan.xp}
                                </li>
                                <li className={"mb-4"}>
                                    <strong>Language</strong> {clan.language}
                                </li>
                                <li className={"mb-4"}>
                                    <strong>Join method</strong> {transformString(clan.joinType)}
                                </li>
                                {(clan.gems || clan.gems === 0) && (
                                    <li className={"mb-4"}>
                                        <strong>Gems</strong> {clan.gems}<img src={gem} alt="gem" className={"inline-block ml-2 w-4 h-4"}/>
                                    </li>
                                )}
                                {(clan.gold || clan.gold === 0) && (
                                    <li className={"mb-4"}>
                                        <strong>Gold</strong> {clan.gold}<img src={gold} alt="gold" className={"inline-block ml-2 w-6 h-6"}/>
                                    </li>
                                )}
                                <li className={"mb-4"}>
                                    <strong>Clan Members</strong> {clan.memberCount}
                                </li>
                            </ul>
                        </div>
                        <div className={"w-1/2 p-4"}>
                            <h2 className={"text-2xl font-bold mb-2"}>Clan Members</h2>
                            <ul className={"list-none"}>
                                {members.map((member, index) => (
                                    <li key={index} className={"mb-4"}>
                                        <Link to={"/player/" + member.playerId}>
                                            <p>{member.username}</p>{clan.leaderId === member.playerId ? ' (Leader)' : ''}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Template>
    );
}