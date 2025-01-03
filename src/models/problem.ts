export interface ProblemRes {
    id: number,
    title: string,
    explaination: string,
    difficulty: number,
    numOfAcceptance: number,
    numOfSubmission: number,
    functionName: string,
    tag: string[],
    returnType: string,
    isSolved: boolean,
    avarageRating: number,
    createdAt: Date
}

export interface TestCase {
    id: number;
    input: string;
    output: string;
    isExample?: boolean;
  
}

export interface SubmitReq {
    problemID: number;
    sourceCode: string;
    language: string;
}

export interface CreateProblemReq {
    title: string,
    explaination: string,
    difficulty: number,
    functionName: string,
    returnType: string,
    tags: string[];
    input: string[];
    output: string[];
}