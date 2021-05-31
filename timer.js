
window.snake.prettyTimer = function(format = 'MM:SS:sss') {
  const scripts = document.body.getElementsByTagName('script');

  for(let script of scripts) {
    const req = new XMLHttpRequest();
    req.open('GET', script.src);
    req.onload = function() {
      if(this.responseText.indexOf('"#A2') !== -1)
        processCode(this.responseText);
    };
    req.send();
  }
  
  const processCode = function(code) {
    eval(
      code.match(
        /[a-zA-Z0-9_$]{1,6}\.prototype\.[a-zA-Z0-9_$]{1,6}=function\(a\){a=void 0===a\?!0:a;[^]*?a&&[^]?[a-zA-Z0-9_$]{1,6}\(this,!1\)}/
      )[0].replace(
        '--:--:---',
        format === 'MM:SS.sss' 
          ? '--:--.---'
        : format === 'M:SS.sss'
          ? '-:--.---'
        : format === 'S.sss'
          ? '-.---'
        : format === 'M:SS:sss'
          ? '-:--:---'
        : format === 'S:sss'
          ? '-:---'
        :
          '--:--:---'
      )
    );
    eval(
      code.match(
        /[a-zA-Z0-9_$]{1,6}=function\(a\){a=Math\.floor\(a\);[^}]*?3,"0"\)}/
      )[0].replace(
        "00:00:000",
        format === 'MM:SS.sss'
          ? "00:00.000"
        : format === 'M:SS.sss'
          ? "0:00.000"
        : format === 'S.sss'
          ? "0.000"
        : format === 'M:SS:sss'
          ? "0:00:000"
        : format === 'S:sss'
          ? "0:000"
        :
          "00:00:000"
      ).replace(
        /99<b[^]*\(3,"0"\)/,
        format === 'S.sss'
          ? `
          (b===0?"":b.toString())
          +(b===0?"":":")
          +(Math.floor(a/1E3) % 60).toString().padStart(b===0?1:2,"0")
          +"."
          +(a % 1E3).toString().padStart(3,"0")`
        : format === 'S:sss'
          ? `
          (b===0?"":b.toString())
          +(b===0?"":":")
          +(Math.floor(a/1E3) % 60).toString().padStart(b===0?1:2,"0")
          +":"
          +(a % 1E3).toString().padStart(3,"0")`
        : format === 'M:SS.sss'
          ? `
          b.toString().padStart(1, "0")
          +":"
          +(Math.floor(a/1E3) % 60).toString().padStart(2,"0")
          +"."
          +(a % 1E3).toString().padStart(3,"0")`
        : format === 'M:SS:sss'
          ? `
          b.toString().padStart(1, "0")
          +":"
          +(Math.floor(a/1E3) % 60).toString().padStart(2,"0")
          +":"
          +(a % 1E3).toString().padStart(3,"0")`
        : format === 'MM:SS.sss'
          ? `
          b.toString().padStart(2, "0")
          +":"
          +(Math.floor(a/1E3) % 60).toString().padStart(2,"0")
          +"."
          +(a % 1E3).toString().padStart(3,"0")`
        : `
        b.toString().padStart(2, "0")
        +":"
        +(Math.floor(a/1E3) % 60).toString().padStart(2,"0")
        +":"
        +(a % 1E3).toString().padStart(3,"0")`

      )
    );
    
  };

};