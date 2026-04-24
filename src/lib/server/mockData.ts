import type { Prof } from "$lib/data/types";

const prof1: Prof = {
    id: "1",
    name: "Jean Dupont",
    bio: "Jean Dupont est un passionné de sports nautiques avec plus de 10 ans d'expérience en tant que moniteur de kitesurf et de windsurf. Il a enseigné à des centaines d'élèves, des débutants aux compétiteurs, et est reconnu pour sa pédagogie et sa patience. Jean est certifié BPJEPS et IKO L3, ce qui garantit un enseignement de qualité et sécurisé. Basé à Leucate, il connaît parfaitement les conditions locales et peut adapter ses cours en fonction du niveau et des objectifs de chaque élève.",
    isVerified: true,
    location: "Leucate",
    stars: 4.5,
    reviewCount: 120,
    sports: ['Kitesurf', 'Windsurf'],
    price: 50,
    certifications: ['BPJEPS', 'IKO L3']
};
const prof2: Prof = {
    id: "2",
    name: "Marie Curie",
    bio: "Marie Curie est une professeure de sport passionnée, avec plus de 8 ans d'expérience dans l'enseignement des sports aquatiques. Elle a travaillé avec des élèves de tous âges et niveaux, offrant des cours adaptés aux besoins de chaque élève. Elle est appréciée pour sa patience et son dévouement.",
    isVerified: false,
    location: "Gruissan",
    stars: 4.0,
    reviewCount: 80,
    sports: ['Kitesurf', 'Paddle'],
    price: 40,
    certifications: ['BPJEPS']
};
const prof3: Prof = {
    id: "3",
    name: "Pierre Martin",
    bio: "Pierre Martin est un instructeur de sports nautiques expérimenté, spécialisé dans le kitesurf et le windsurf. Avec plus de 15 ans d'expérience, il a enseigné à des élèves de tous niveaux, des débutants aux compétiteurs. Pierre est reconnu pour sa pédagogie et sa capacité à adapter ses cours en fonction des besoins de chaque élève. Il est certifié BPJEPS et IKO L3, garantissant un enseignement de qualité et sécurisé. Basé à Leucate, il connaît parfaitement les conditions locales et peut offrir une expérience d'apprentissage optimale.",
    isVerified: true,
    location: "Erquy",
    stars: 4.8,
    reviewCount: 150,
    sports: ['Wingfoil'],
    price: 60,
    certifications: ['BPJEPS', 'IKO L3']
};
const prof4: Prof = {
    id: "4",
    name: "Sophie Durand",
    bio: "Sophie Durand est une instructrice de sports nautiques passionnée, avec plus de 10 ans d'expérience dans l'enseignement du kitesurf et du windsurf. Elle a travaillé avec des élèves de tous âges et niveaux, offrant des cours adaptés aux besoins de chaque élève. Sophie est appréciée pour sa patience et son dévouement, et elle est certifiée BPJEPS, garantissant un enseignement de qualité et sécurisé.",
    isVerified: true,
    location: "Leucate",
    stars: 4.7,
    reviewCount: 110,
    sports: ['Kitesurf', 'Windsurf'],
    price: 55,
    certifications: ['BPJEPS']
};
const profs: Prof[] = [
    prof1,
    prof2,
    prof3,
    prof4
];

export const getProfs = async (): Promise<Prof[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return profs;
};
export const getProf = async (id: string): Promise<Prof | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return profs.find((prof) => prof.id === id);
};