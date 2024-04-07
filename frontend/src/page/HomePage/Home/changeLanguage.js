export const changeLanguage = (code, language) => {
  var ar = code.split("\n");
  var newCode = "";

  switch (language.label) {
    case "JAVA":
      for (var i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `//Simple Hello CodeQuanta program in Java\npublic class Simple{\n    public static void main(String args[]){  \n     System.out.println("Hello CodeQuanta!");  \n    }  \n}    \n\n//Your Previous code is : \n\n${newCode}\n\n`;

    case "C++":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `// Simple Hello CodeQuanta program in C++ \n#include <iostream> \n int main() { \n std::cout << "Hello CodeQuanta!"; \n return 0; \n} \n\n//Your Previous code is :\n\n${newCode}\n\n`;
    case "Python2":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "# " + ar[i] + "\n";
        }
      }
      return `#Simple Hello CodeQuanta program in Python 2 \nprint('Hello CodeQuanta!') \n\n#Your Previous code is : \n\n${newCode}\n\n`;
    case "Python3":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "# " + ar[i] + "\n";
        }
      }
      return `#Simple Hello CodeQuanta program in Python 3 \nprint('Hello CodeQuanta!')\n\n#Your Previous code is : \n\n${newCode}\n\n`;
    case "C":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `//Simple Hello CodeQuanta program in C \n#include <stdio.h> \nint main() {\n printf("Hello CodeQuanta!");\n return 0; \n} \n\n//Your Previous code is : \n\n${newCode}\n\n`;
    case "C#":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `// Simple Hello CodeQuanta program in C# \nusing System; \nnamespace HelloWorldApp { \nclass Geeks { \n   static void Main(string[] args) { \n     Console.WriteLine("Hello CodeQuanta!"); \n     Console.ReadKey(); \n   } \n  } \n} \n\n//Your Previous code is : \n\n${newCode}\n\n`;
    case "COBOL":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "*> " + ar[i] + "\n";
        }
      }
      return `*> Simple Hello CodeQuanta program in COBOL\nidentification division.\nprogram-id. hello.\nprocedure division.\ndisplay "Hello CodeQuanta!"\ngoback.\nend program hello.\n\n*>Your Previous code is : \n\n${newCode}\n\n`;
    case "Dart":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `// Simple Hello CodeQuanta program in Dart\nvoid main() {\n   print("Hello CodeQuanta!");\n}\n\n//Your Previous code is : \n\n${newCode}\n\n`;
    case "FORTRAN":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "! " + ar[i] + "\n";
        }
      }
      return `! Simple Hello CodeQuanta program in FORTRAN \nprogram hello\nimplicit none\nwrite(*,*) "Hello CodeQuanta!" \nend program hello\n\n! Your Previous code is : \n\n${newCode}\n\n`;
    case "Kotlin":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `// Simple Hello CodeQuanta program in Kotlin \nfun main(args : Array<String>) {\n  println("Hello CodeQuanta!")\n}\n\n// Your Previous code is : \n\n${newCode}\n\n`;
    case "Node Js":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `// Simple Hello CodeQuanta program in Node JS \nconsole.log("Hello CodeQuanta!")\n\n// Your Previous code is : \n\n${newCode}\n\n`;
    case "Objective C":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "// " + ar[i] + "\n";
        }
      }
      return `// Simple Hello CodeQuanta program in Objective C\n#import <Foundation/Foundation.h>\nint main()\n{\n  printf("Hello CodeQuanta!");\n  return 0;\n}\n\n// Your Previous code is : \n\n${newCode}\n\n`;
    case "Perl":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "# " + ar[i] + "\n";
        }
      }
      return `# Simple Hello CodeQuanta program in Perl \nuse strict;\nuse warnings;\nprint("Hello CodeQuanta!");\n\n# Your Previous code is : \n\n${newCode}\n\n`;
    case "Ruby":
      for (i = 0; i < ar.length; i++) {
        if (ar[i] !== "") {
          newCode = newCode + "# " + ar[i] + "\n";
        }
      }
      return `# Simple Hello CodeQuanta program in Ruby \nputs "Hello CodeQuanta!"\n\n# Your Previous code is : \n\n${newCode}\n\n`;
    default:
      return `//Simple Hello CodeQuanta program in Java\npublic class Simple{\n    public static void main(String args[]){  \n     System.out.println("Hello CodeQuanta!");  \n    }  \n}    \n\n//Your Previous code is : \n\n${newCode}\n\n`;
  }
};
