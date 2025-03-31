lpTag.external = lpTag.external || {};
lpTag.external.uploadPdf = {
  // handle incoming messages
  afterGetLines: function (data) {
    console.log("DATA")
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
