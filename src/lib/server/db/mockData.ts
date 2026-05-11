import type { ProfCertification, ProfPrice, ProfProfile, ProfSport, ProfSpot, Review } from "./schema";
import type { ProfWithRelations } from "./relations.schema";

const now = new Date("2025-01-01T00:00:00.000Z");

const profiles: ProfProfile[] = [
    {
        id: "1",
        userId: "user-1",
        firstName: "Jean",
        lastName: "Dupont",
        bio: "Jean Dupont est un passionné de sports nautiques avec plus de 10 ans d'expérience en tant que moniteur de kitesurf et de windsurf. Il a enseigné à des centaines d'élèves, des débutants aux compétiteurs, et est reconnu pour sa pédagogie et sa patience.",
        photoUrl: null,
        isVerified: true,
        isPublished: true,
        city: "Leucate",
        region: "Occitanie",
        phone: null,
        contactEmail: "jean.dupont@example.com",
        contactVisibility: "email_only",
        responseTime: "same_day",
        websites: null,
        equipmentProvided: true,
        equipmentNote: null,
        languages: JSON.stringify(["Français", "English"]),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "2",
        userId: "user-2",
        firstName: "Marie",
        lastName: "Curie",
        bio: "Marie Curie est une professeure de sport passionnée, avec plus de 8 ans d'expérience dans l'enseignement des sports aquatiques. Elle est appréciée pour sa patience et son dévouement.",
        photoUrl: null,
        isVerified: false,
        isPublished: true,
        city: "Gruissan",
        region: "Occitanie",
        phone: null,
        contactEmail: null,
        contactVisibility: "phone_email",
        responseTime: "within_24h",
        websites: null,
        equipmentProvided: false,
        equipmentNote: null,
        languages: JSON.stringify(["Français"]),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "3",
        userId: "user-3",
        firstName: "Pierre",
        lastName: "Martin",
        bio: "Pierre Martin est un instructeur de sports nautiques expérimenté, spécialisé dans le wingfoil. Avec plus de 15 ans d'expérience, il est reconnu pour sa pédagogie et sa capacité à adapter ses cours en fonction des besoins de chaque élève.",
        photoUrl: null,
        isVerified: true,
        isPublished: true,
        city: "Erquy",
        region: "Bretagne",
        phone: null,
        contactEmail: null,
        contactVisibility: "phone_email",
        responseTime: "2h",
        websites: null,
        equipmentProvided: true,
        equipmentNote: "Matériel fourni pour les débutants",
        languages: JSON.stringify(["Français", "English"]),
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "4",
        userId: "user-4",
        firstName: "Sophie",
        lastName: "Durand",
        bio: "Sophie Durand est une instructrice de sports nautiques passionnée, avec plus de 10 ans d'expérience dans l'enseignement du kitesurf et du windsurf. Sophie est appréciée pour sa patience et son dévouement.",
        photoUrl: null,
        isVerified: true,
        isPublished: true,
        city: "Leucate",
        region: "Occitanie",
        phone: null,
        contactEmail: null,
        contactVisibility: "phone_email",
        responseTime: "30min",
        websites: null,
        equipmentProvided: false,
        equipmentNote: null,
        languages: JSON.stringify(["Français", "Español"]),
        createdAt: now,
        updatedAt: now,
    },
];

const sports: ProfSport[] = [
    { id: "s1", profId: "1", sport: "kitesurf", acceptedLevels: JSON.stringify(["beginner", "intermediate"]) },
    { id: "s2", profId: "1", sport: "windsurf", acceptedLevels: JSON.stringify(["all"]) },
    { id: "s3", profId: "2", sport: "kitesurf", acceptedLevels: JSON.stringify(["beginner"]) },
    { id: "s4", profId: "3", sport: "wingfoil", acceptedLevels: JSON.stringify(["intermediate", "advanced"]) },
    { id: "s5", profId: "4", sport: "kitesurf", acceptedLevels: JSON.stringify(["all"]) },
    { id: "s6", profId: "4", sport: "windsurf", acceptedLevels: JSON.stringify(["beginner", "intermediate"]) },
];

const certifications: ProfCertification[] = [
    { id: "c1", profId: "1", type: "BPJEPS", year: 2015, fileName: null, fileUrl: null, status: "verified", createdAt: now, updatedAt: now },
    { id: "c2", profId: "1", type: "IKO L3", year: 2018, fileName: null, fileUrl: null, status: "verified", createdAt: now, updatedAt: now },
    { id: "c3", profId: "2", type: "BPJEPS", year: 2017, fileName: null, fileUrl: null, status: "verified", createdAt: now, updatedAt: now },
    { id: "c4", profId: "3", type: "BPJEPS", year: 2010, fileName: null, fileUrl: null, status: "verified", createdAt: now, updatedAt: now },
    { id: "c5", profId: "3", type: "IKO L3", year: 2014, fileName: null, fileUrl: null, status: "verified", createdAt: now, updatedAt: now },
    { id: "c6", profId: "4", type: "BPJEPS", year: 2016, fileName: null, fileUrl: null, status: "verified", createdAt: now, updatedAt: now },
];

const prices: ProfPrice[] = [
    { id: "p1", profId: "1", description: "Cours individuel", duration: "1h", priceEur: 50, displayOrder: 0 },
    { id: "p2", profId: "1", description: "Stage 3 jours", duration: "3j", priceEur: 120, displayOrder: 1 },
    { id: "p3", profId: "2", description: "Cours individuel", duration: "1h", priceEur: 40, displayOrder: 0 },
    { id: "p4", profId: "3", description: "Cours individuel", duration: "1h", priceEur: 60, displayOrder: 0 },
    { id: "p5", profId: "4", description: "Cours individuel", duration: "1h", priceEur: 55, displayOrder: 0 },
    { id: "p6", profId: "4", description: "Cours en groupe (4 pers.)", duration: "1h", priceEur: 30, displayOrder: 1 },
];

const spots: ProfSpot[] = [
    { id: "sp1", profId: "1", name: "Leucate Plage", isPrimary: true, displayOrder: 0 },
    { id: "sp2", profId: "1", name: "Port-la-Nouvelle", isPrimary: false, displayOrder: 1 },
    { id: "sp3", profId: "2", name: "Gruissan Plage", isPrimary: true, displayOrder: 0 },
    { id: "sp4", profId: "3", name: "Erquy", isPrimary: true, displayOrder: 0 },
    { id: "sp5", profId: "3", name: "Saint-Cast-le-Guildo", isPrimary: false, displayOrder: 1 },
    { id: "sp6", profId: "4", name: "Leucate Plage", isPrimary: true, displayOrder: 0 },
];

const reviews: Review[] = [
    { id: "r1", profId: "1", riderId: null, riderName: "Thomas L.", riderLevel: "beginner", rating: 5, body: "Excellent moniteur, très patient et pédagogue. Je recommande vivement !", createdAt: now },
    { id: "r2", profId: "1", riderId: null, riderName: "Camille R.", riderLevel: "intermediate", rating: 4, body: "Bonne expérience, Jean sait s'adapter au niveau de chaque élève.", createdAt: now },
    { id: "r3", profId: "2", riderId: null, riderName: "Lucas M.", riderLevel: "beginner", rating: 5, body: "Marie est une super prof, j'ai adoré mes cours !", createdAt: now },
    { id: "r4", profId: "3", riderId: null, riderName: "Élodie P.", riderLevel: "intermediate", rating: 5, body: "Pierre est un expert, ses cours sont très bien structurés.", createdAt: now },
    { id: "r5", profId: "3", riderId: null, riderName: "Nathan B.", riderLevel: "advanced", rating: 4, body: "Très bon niveau technique, des conseils précieux pour progresser.", createdAt: now },
    { id: "r6", profId: "4", riderId: null, riderName: "Inès G.", riderLevel: "beginner", rating: 5, body: "Sophie est fantastique, j'ai progressé très vite grâce à elle.", createdAt: now },
];

const buildProfWithRelations = (profile: ProfProfile): ProfWithRelations => ({
    ...profile,
    sports: sports.filter((s) => s.profId === profile.id),
    spots: spots.filter((s) => s.profId === profile.id),
    prices: prices.filter((p) => p.profId === profile.id),
    certifications: certifications.filter((c) => c.profId === profile.id),
    reviews: reviews.filter((r) => r.profId === profile.id),
});

export const getProfs = async (): Promise<ProfWithRelations[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return profiles.map(buildProfWithRelations);
};

export const getProf = async (id: string): Promise<ProfWithRelations | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const profile = profiles.find((p) => p.id === id);
    return profile ? buildProfWithRelations(profile) : undefined;
};
