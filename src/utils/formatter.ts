import { TestCase } from "../models/problem";

export function testCaseFormatter(
  apiResponse: Array<{
    id: number;
    input: string;
    output: string;
    isExample?: boolean;
  }>
): TestCase[] {
  return apiResponse.map(({ id, input, output, isExample }) => {
    const parsedInput = JSON.parse(input);
    const parsedOutput = JSON.parse(output).output;

    // Dynamically construct the input string from the keys and values in parsedInput
    const formattedInput = Object.entries(parsedInput)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = "${value}"`;
        } else if (Array.isArray(value)) {
          return `${key} = ${JSON.stringify(value)}`;
        } else {
          return `${key} = ${value}`;
        }
      })
      .join(", ");

    return {
      id,
      input: formattedInput,
      output: JSON.stringify(parsedOutput),
      isExample, // Now this can be undefined without causing an error
    };
  });
}
