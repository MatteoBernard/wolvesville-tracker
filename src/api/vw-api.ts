import axios from 'axios';
import {Clan, ClanInfos, ClanMember, Player, RolesResponse, RolesRotationResponse} from "../types";

const API_KEY = 'SECRET_KEY';
const API_URL = 'https://api.wolvesville.com/';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bot ' + API_KEY
}

export const getRoles = async (): Promise<RolesResponse> => {
    try {
        const response = await axios.get<RolesResponse>(API_URL + 'roles', { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getRolesRotations = async (): Promise<RolesRotationResponse> => {
    try {
        const response = await axios.get<RolesRotationResponse>(API_URL + 'rolesRotations', { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const searchPlayer = async (username: string): Promise<Player | null | undefined> => {
    try {
        const response = await axios.get<Player>(API_URL + 'players/search?username=' + username, { headers: headers });
        console.log(response.data);
        if (response.status === 404) {
            return null;
        }
        return response.data;
    } catch (error) {
        console.log('Player not found.');
    }
}

export const searchClan = async (name: string): Promise<Clan[] | null | undefined> => {
    try {
        const response = await axios.get<Clan[]>(API_URL + 'clans/search?name=' + name, { headers: headers });
        console.log(response.data);
        if (response.status === 404) {
            return null;
        }
        return response.data;
    } catch (error) {
        console.log('Clan not found');
    }
}

export const getPlayer = async (id: string): Promise<Player | null> => {
    try {
        const response = await axios.get<Player>(API_URL + 'players/' + id, { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getClan = async (id: string): Promise<ClanInfos | null> => {
    try {
        const response = await axios.get<ClanInfos>(API_URL + 'clans/' + id + '/info', { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getClanMembers = async (id: string): Promise<ClanMember[]> => {
    try {
        const response = await axios.get<ClanMember[]>(API_URL + 'clans/' + id + '/members', { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getClanMemberInfos = async (clanId: string, playerId: string): Promise<ClanMember | null> => {
    try {
        const response = await axios.get<ClanMember>(API_URL + 'clans/' + clanId + '/members/' + playerId, { headers: headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}