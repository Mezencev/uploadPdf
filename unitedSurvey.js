lpTag.external = lpTag.external || {};
const LAST_MESSAGE = "Please provide your confirmation or reference number, full name and a sentence summarizing the assistance you need.";
var restartFlag = false;

lpTag.external.surveyBot = {
  // handle incoming messages
  afterGetLines: function (data) {
    try {
      if (data.data.lines.length > 0) {
        if (data.data && data.data.lines && data.data.lines.length && data.data.lines[0].isWelcomeMessage && restartFlag) {
          console.log("new welcome message");
          setTimeout(hideWrapperLine, 30);
          console.log(`DATA: ${JSON.stringify(data.data.lines[0])}`);
          delete data.data.lines[0].quickReplies;
          delete data.data.lines[0].text;
        } else if (data.data && data.data.lines && data.data.lines.length && data.data.lines[0].by == "Survey Bot" && data.data.lines[0].text.startsWith(LAST_MESSAGE)) {
          console.log("survey");
          restartFlag = true;
        } else if (data.data && data.data.lines && data.data.lines.length && data.data.lines[0].text && data.data.lines[0].state == "SENT") {
          //console.log("new message", data.data.lines[0]);
          restartFlag = false;
        }
        
      }
    } catch (e) {
      console.error(e);
    }
  },
};

lpTag.hooks.push({
  name: "AFTER_GET_LINES",
  callback: lpTag.external.surveyBot.afterGetLines,
});


function hideWrapperLine() {
  const line = document.getElementsByClassName("lp_time lp_chat_line_auto_message lpc_message-area__timestamp lpc_message-area__timestamp_auto lpc_desktop lp_underline");
  console.log(line.length, "LINE");
  line[line.length - 1].style.display = "none";
}
