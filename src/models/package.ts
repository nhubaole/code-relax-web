export interface Package {
    id: number;
    content: string; 
    update_At: Date; 
    numberParticipants: number; 
    levels: string[]; 
    icon: string;
    color: string;
}

export interface ProblemInfor {
    id: number,
    isSolved: boolean,
    title: string,    
    difficulty: number,
    numOfAcceptance: number,
    numOfSubmission: number,
    averageRating: number,
    tag:string[],
}