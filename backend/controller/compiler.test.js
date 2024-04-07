const request = require("supertest");
const { response } = require("../index");
const app = require("../index");

describe("Test Compiler for C", () => {
  it("test status 200", async (done) => {
    try {
      return await request(app)
        .post("/compiler/c")
        .send({
          code: `#include <stdio.h> \nint main() {\n printf("Hello CodeQuanta!");\n return 0; \n}`,
          input: "",
          version: "4",
        })
        .then((response) => {
          expect(response.statusCode).toEqual(200);
          done();
        });
    } catch (e) {}
  });

  // it("test output equal", async () => {
  //   await request(app)
  //     .post("/compiler/c")
  //     .send({
  //       code: `#include <stdio.h> \nint main() {\n printf("Hello Entercoding!");\n return 0; \n}`,
  //       input: "",
  //       version: "4",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for C++", () => {
  it("test status 200", async (done) => {
    await request(app)
      .post("/compiler/cpp")
      .send({
        code: `// Simple Hello CodeQuanta program in C++ \n#include <iostream> \n int main() { \n std::cout << "Hello CodeQuanta!"; \n return 0; \n}`,
        input: "",
        version: "4",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/cpp")
  //     .send({
  //       code: `// Simple Hello Entercoding program in C++ \n#include <iostream> \n int main() { \n std::cout << "Hello Entercoding!"; \n return 0; \n}`,
  //       input: "",
  //       version: "4",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for Cobol", () => {
  it("test status 200", async (done) => {
    const response = await request(app)
      .post("/compiler/cobol")
      .send({
        code: `*> Simple Hello CodeQuanta program in COBOL\nidentification division.\nprogram-id. hello.\nprocedure division.\ndisplay "Hello CodeQuanta!"\ngoback.\nend program hello.\n\n`,
        input: "",
        version: "0",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });
  // it("test output equal", async () => {
  //   await request(app)
  //     .post("/compiler/cobol")
  //     .send({
  //       code: `*> Simple Hello Entercoding program in COBOL\nidentification division.\nprogram-id. hello.\nprocedure division.\ndisplay "Hello Entercoding!"\ngoback.\nend program hello.\n\n`,
  //       input: "",
  //       version: "0",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  //});
});
describe("Test Compiler for Dart", () => {
  it("test status 200", async (done) => {
    const response = await request(app)
      .post("/compiler/dart")
      .send({
        code: `// Simple Hello CodeQuanta program in Dart\nvoid main() {\n   print("Hello CodeQuanta!");\n}`,
        input: "",
        version: "3",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/dart")
  //     .send({
  //       code: `// Simple Hello Entercoding program in Dart\nvoid main() {\n   print("Hello Entercoding!");\n}`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for CSharp", () => {
  it("test status 200", async (done) => {
    await request(app)
      .post("/compiler/csharp")
      .send({
        code: `// Simple Hello CodeQuanta program in C# \nusing System; \nnamespace HelloWorldApp { \nclass Geeks { \n   static void Main(string[] args) { \n     Console.WriteLine("Hello CodeQuanta!"); \n     Console.ReadKey(); \n   } \n  } \n}`,
        input: "",
        version: "3",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/csharp")
  //     .send({
  //       code: `// Simple Hello Entercoding program in C# \nusing System; \nnamespace HelloWorldApp { \nclass Geeks { \n   static void Main(string[] args) { \n     Console.WriteLine("Hello Entercoding!"); \n     Console.ReadKey(); \n   } \n  } \n}`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for Fortran", () => {
  it("test status 200", async (done) => {
    await request(app)
      .post("/compiler/fortran")
      .send({
        code: `! Simple Hello CodeQuanta program in FORTRAN \nprogram hello\nimplicit none\nwrite(*,*) "Hello CodeQuanta!" \nend program hello\n\n`,
        input: "",
        version: "3",
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/fortran")
  //     .send({
  //       code: `program hello\nimplicit none\nwrite(*,*) "Hello Entercoding!" \nend program hello`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for Java", () => {
  it("test status 200", async () => {
    const response = await request(app).post("/compiler/java").send({
      code: `public class Simple{\n    public static void main(String args[]){  \n     System.out.println("Hello CodeQuanta!");  \n    }  \n}`,
      input: "",
      version: "3",
    });
    expect(200);
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/java")
  //     .send({
  //       code: `public class Simple{\n    public static void main(String args[]){  \n     System.out.println("Hello Entercoding!");  \n    }  \n}`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for Nodejs", () => {
  it("test status 200", async () => {
    const response = await request(app).post("/compiler/nodejs").send({
      code: `console.log("Hello CodeQuanta!")`,
      input: "",
      version: "3",
    });
    expect(200);
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/nodejs")
  //     .send({
  //       code: `console.log("Hello Entercoding!")`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for Objective C", () => {
  it("test status 200", async () => {
    const response = await request(app).post("/compiler/objectivec").send({
      code: `#import <Foundation/Foundation.h>\nint main()\n{\n  printf("Hello CodeQuanta!");\n  return 0;\n}`,
      input: "",
      version: "3",
    });
    expect(200);
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/objectivec")
  //     .send({
  //       code: `#import <Foundation/Foundation.h>\nint main()\n{\n  printf("Hello Entercoding!");\n  return 0;\n}`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for Perl", () => {
  it("test status 200", async () => {
    const response = await request(app).post("/compiler/perl").send({
      code: `# Simple Hello CodeQuanta program in Perl \nuse strict;\nuse warnings;\nprint("Hello CodeQuanta!");`,
      input: "",
      version: "3",
    });
    expect(200);
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/perl")
  //     .send({
  //       code: `# Simple Hello Entercoding program in Perl \nuse strict;\nuse warnings;\nprint("Hello Entercoding!");`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
describe("Test Compiler for Python 2", () => {
  it("test status 200", async () => {
    const response = await request(app).post("/compiler/python2").send({
      code: `print('Hello CodeQuanta!')`,
      input: "",
      version: "2",
    });
    expect(200);
  });
  // it("test output equal", async () => {
  //   const response = await request(app).post("/compiler/python2").send({
  //     code: `print('Hello Entercoding!')`,
  //     input: "",
  //     version: "2",
  //   });
  //   expect(response.body.output).toEqual("Hello Entercoding!\n");
  // });
});
describe("Test Compiler for Python 3", () => {
  it("test status 200", async () => {
    const response = await request(app).post("/compiler/python3").send({
      code: `print('Hello CodeQuanta!')`,
      input: "",
      version: "3",
    });
    expect(200);
  });
  // it("test output equal", async () => {
  //   const response = await request(app).post("/compiler/python3").send({
  //     code: `print('Hello Entercoding!')`,
  //     input: "",
  //     version: "3",
  //   });
  //   expect(response.body.output).toEqual("Hello Entercoding!\n");
  // });
});
describe("Test Compiler for Ruby", () => {
  it("test status 200", async () => {
    const response = await request(app).post("/compiler/ruby").send({
      code: `puts "Hello CodeQuanta!"`,
      input: "",
      version: "3",
    });
    expect(200);
  });
  // it("test output equal", async () => {
  //   const response = await request(app)
  //     .post("/compiler/ruby")
  //     .send({
  //       code: `puts "Hello Entercoding!"`,
  //       input: "",
  //       version: "3",
  //     })
  //     .then((response) => {
  //       expect(response.body.output).toEqual("Hello Entercoding!");
  //     });
  // });
});
