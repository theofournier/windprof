import type { Prof } from "$lib/data/types";

const prof1: Prof = {
    id: "1",
    name: "Profesorul 1",
    bio: "Bio pentru profesorul 1"
};
const prof2: Prof = {
    id: "2",
    name: "Profesorul 2",
    bio: "Bio pentru profesorul 2"
};
const profs: Prof[] = [
    prof1,
    prof2
];

export const getProfs = async (): Promise<Prof[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return profs;
};
export const getProf = async (id: string): Promise<Prof | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return profs.find((prof) => prof.id === id);
};