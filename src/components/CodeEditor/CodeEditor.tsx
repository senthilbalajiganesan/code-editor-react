import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { themes, languages } from "./Constants";
import { PropsModel } from "./Type";
import { Button } from "../Button/Button";

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const getParams = (params: any) =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

const CodeEditor = (props: PropsModel) => {
  const [value, changeValue] = useState(`def print_start(n):
  print("*" * n)
  
for i in range(10):
  print_start(i)`);
  const [output, changeOutput] = useState("");
  return (
    <>
      <AceEditor
        width={`auto`}
        height={`400px`}
        placeholder={"# your code here"}
        mode={"python"}
        theme={"tomorrow"}
        name="blah2"
        fontSize={"18px"}
        onChange={changeValue}
        value={value}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
      />
      <Button
        onClick={() => {
          fetch("/run/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: getParams({
              client_secret: "609e4ff7825e470eec06d6e604bd692073151faa",
              source: value,
              lang: "PYTHON"
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.compile_status !== "OK") {
                changeOutput(data.compile_status);
                return;
              }
              changeOutput(
                data.run_status.exit_code === "0"
                  ? data.run_status.output
                  : data.run_status.stderr
              );
            });
        }}
      >
        Run Code
      </Button>
      <pre>{output}</pre>
    </>
  );
};

export default CodeEditor;
