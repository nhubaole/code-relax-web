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

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  // Lấy các giá trị giờ, phút, ngày, tháng, năm
  const hours = date.getHours().toString().padStart(2, "0"); // Định dạng 2 chữ số
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Định dạng 2 chữ số
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Ghép thành chuỗi theo định dạng yêu cầu
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}