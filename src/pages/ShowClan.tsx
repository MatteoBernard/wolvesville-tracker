import { Template } from "./Template";
import { ClanInfos, ClanMember } from "../types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClan, getClanMembers } from "../utils/vw-api";
import { getFormattedDate, transformString } from "../utils";
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
                <div className={"m-3"}>
                    <div className={"flex flex-col items-center p-6 m-12 border rounded-lg border-wv-red border-8 max-w-4xl mx-auto bg-wv-white"}>
                        <h1 className={"text-4xl font-bold mb-2"} id={"clan-name"}>{clan.name}</h1>
                        <p className={"text-sm italic mb-2"} id={"clan-description"}>{clan.description}</p>
                        <div className={"flex flex-col md:flex-row justify-between w-full"}>
                            <div className={"w-full md:w-1/2 p-4"}>
                                <h2 className={"text-2xl font-bold mb-2"}>Clan Info</h2>
                                <ul className={"list-none"}>
                                    <li className={"mb-4"} id={"clan-created-at"}>
                                        <strong>Clan Created at</strong> {getFormattedDate(clan.creationTime)}
                                    </li>
                                    <li className={"mb-4"} id={"clan-xp"}>
                                        <strong>XP</strong> {clan.xp}
                                    </li>
                                    <li className={"mb-4"} id={"clan-language"}>
                                        <strong>Language</strong> {clan.language}
                                    </li>
                                    <li className={"mb-4"} id={"clan-join-method"}>
                                        <strong>Join method</strong> {transformString(clan.joinType)}
                                    </li>
                                    {(clan.gems || clan.gems === 0) && (
                                        <li className={"mb-4"} id={"clan-gems"}>
                                            <strong>Gems</strong> {clan.gems}<img src={gem} alt="gem" className={"inline-block ml-2 w-4 h-4"}/>
                                        </li>
                                    )}
                                    {(clan.gold || clan.gold === 0) && (
                                        <li className={"mb-4"} id={"clan-gold"}>
                                            <strong>Gold</strong> {clan.gold}<img src={gold} alt="gold" className={"inline-block ml-2 w-6 h-6"}/>
                                        </li>
                                    )}
                                    <li className={"mb-4"} id={"clan-members-count"}>
                                        <strong>Clan Members</strong> {clan.memberCount}
                                    </li>
                                </ul>
                            </div>
                            <div className={"w-full md:w-1/2 p-4"}>
                                <h2 className={"text-2xl font-bold mb-2"}>Clan Members</h2>
                                <ul className={"list-none"} id={"clan-members-list"}>
                                    {members.map((member, index) => (
                                        <li key={index} className={"mb-4"}>
                                            <Link to={"/player/" + member.playerId} id={`clan-member-${member.playerId}`}>
                                                {member.username} {clan.leaderId === member.playerId ? ' (Leader)' : ''}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Template>
    );
}