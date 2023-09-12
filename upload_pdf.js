lpTag.external = lpTag.external || {};
lpTag.external.uploadPdf = {
  // handle incoming messages
  afterGetLines: function (data) {
    try {
      if (data.data.lines.length > 0) {
        data.data.lines.forEach(function (line) {
          if (line.source === "agent" && line.type === "line" && line.text.indexOf("data:application/pdf;base64") > -1) {
            const newLine = line.text.slice(line.text.indexOf("data:application/pdf;base64"));
            line.text = line.text.slice(0, line.text.indexOf("data:application/pdf;base64")) + "<a href=" + newLine + " " + "download=Benefit" + ">within this PDF</a>";
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
};

lpTag.hooks.push({
  name: "AFTER_GET_LINES",
  callback: lpTag.external.uploadPdf.afterGetLines,
});

function hideWrapperLine() {
  const line = document.getElementsByClassName("lp_time lp_chat_line_auto_message lpc_message-area__timestamp lpc_message-area__timestamp_auto lpc_desktop lp_underline");
  console.log(line.length, "LINE");
  //line[0].style.visibility = "hidden";
  line[line.length - 1].style.visibility = "hidden";
}
