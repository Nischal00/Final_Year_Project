const express = require("express");
const router = express.Router();

const CompilerController = require("../controller/compiler");

router.get("/compiler", CompilerController.getCompiler);

router.post("/compiler/c", CompilerController.postCCompiler);

router.post("/compiler/cobol", CompilerController.postCobolCompiler);

router.post("/compiler/cpp", CompilerController.postCppCompiler);

router.post("/compiler/csharp", CompilerController.postCSharpCompiler);

router.post("/compiler/dart", CompilerController.postDartCompiler);

router.post("/compiler/fortran", CompilerController.postFortranCompiler);

router.post("/compiler/java", CompilerController.postJavaCompiler);

router.post("/compiler/kotlin", CompilerController.postKotlinCompiler);

router.post("/compiler/nodejs", CompilerController.postNodejsCompiler);

router.post("/compiler/objectivec", CompilerController.postObjectiveCCompiler);

router.post("/compiler/perl", CompilerController.postPerlCompiler);

router.post("/compiler/python2", CompilerController.postPythonTwoCompiler);

router.post("/compiler/python3", CompilerController.postPythonThreeCompiler);

router.post("/compiler/ruby", CompilerController.postRubyCompiler);

module.exports = router;
