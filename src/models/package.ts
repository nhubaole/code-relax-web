export interface Package {
    id: number;
    content: string; 
    updatedAt: Date; 
    updatedAgo: string; 
    numberProblem: number; 
    levels: string[]; 
    icon: string;
    color: string;
}

export interface Tag {
    id: number,
    name: string,
    problemTags: string[],  
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