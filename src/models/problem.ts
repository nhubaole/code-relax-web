export interface ProblemRes {
    id: number,
    title: string,
    explaination: string,
    difficulty: number,
    numOfAcceptance: number,
    numOfSubmission: number,
    functionName: string,
    returnType: string,
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