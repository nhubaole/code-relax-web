export const generateInitialCode = (functionName:string, returnType:string, selectedLanguage:string) => {
  let initialCode = "";

  if (returnType === "int") {
    switch (selectedLanguage) {
      case "Python":
        initialCode = `def ${functionName}() -> int:`;
        break;
      case "Java":
        initialCode = `public static int ${functionName}() {\n\n}`;
        break;
      case "C++":
      default:
        initialCode = `int ${functionName}() {\n\n}`;
    }
  } else if (returnType === "string") {
    switch (selectedLanguage) {
      case "Python":
        initialCode = `def ${functionName}() -> str:`;
        break;
      case "Java":
        initialCode = `public static String ${functionName}() {\n\n}`;
        break;
      case "C++":
      default:
        initialCode = `string ${functionName}() {\n\n}`;
    }
  } else if (returnType === "list<int>") {
    switch (selectedLanguage) {
      case "Python":
        initialCode = `def ${functionName}() -> list[int]:`;
        break;
      case "Java":
        initialCode = `public static int[] ${functionName}() {\n\n}`;
        break;
      case "C++":
      default:
        initialCode = `vector<int> ${functionName}() {\n\n}`;
    }
  } else if (returnType === "list<string>") {
    switch (selectedLanguage) {
      case "Python":
        initialCode = `def ${functionName}() -> list[str]:`;
        break;
      case "Java":
        initialCode = `public static String[] ${functionName}() {\n\n}`;
        break;
      case "C++":
      default:
        initialCode = `vector<string> ${functionName}() {\n\n}`;
    }
  } else if (returnType === "bool") {
    switch (selectedLanguage) {
      case "Python":
        initialCode = `def ${functionName}() -> bool:`;
        break;
      case "Java":
        initialCode = `public static boolean ${functionName}() {\n\n}`;
        break;
      case "C++":
      default:
        initialCode = `bool ${functionName}() {\n\n}`;
    }
  }

  return initialCode;
};
