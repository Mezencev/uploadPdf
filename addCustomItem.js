lpTag.external = lpTag.external || {};
lpTag.external.uploadPdf = {
  // handle incoming messages
  afterGetLines: function (data) {
    console.log("DATA2")
  },
};

lpTag.hooks.push({
  name: "AFTER_GET_LINES",
  callback: lpTag.external.uploadPdf.afterGetLines,
});

      function addCustomMenuItem() {
        const list = document.querySelectorAll(
          '[data-lp-cust-id="action_items_wrapper"]'
        );
        var titleLink = document.querySelector(".lp_title_link");
        if (titleLink) return;

        var li = document.createElement("li");
        li.className = "lp_action_item lpc_menu__item lpc_desktop";
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.justifyContent = "center";

        var a = document.createElement("a");
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.href = "https://www.cegid.com/fr/politique-de-confidentialite/";
        a.tabIndex = 0;
        a.setAttribute("aria-label", "Politique de confidentialité");
        a.style.display = "block";
        a.style.width = "100%";
        a.style.textAlign = "center";

        var spanWrapper = document.createElement("span");
        spanWrapper.className = "lp_action_wrapper";

        var spanTitle = document.createElement("span");
        spanTitle.className = "lp_title_link";
        spanTitle.style.color = "#6d6e71";
        spanTitle.style.fontWeight = "normal";
        spanTitle.style.fontFamily = "Arial,Helvetica,sans-serif";
        spanTitle.style.fontStyle = "normal";
        spanTitle.style.display = "inline-block";
        spanTitle.style.textAlign = "center";
        spanTitle.innerHTML = "Politique de confidentialité";

        spanWrapper.appendChild(spanTitle);
        a.appendChild(spanWrapper);
        li.appendChild(a);
        list.forEach((el, i) => {
          el.appendChild(li);
        });
      }

      function unifiedWindow(data, eventInfo) {
        console.log(
          JSON.stringify(data) + " triggered by: " + JSON.stringify(eventInfo)
        );
        console.log("LP", lpTag);
        const menuContainer = document.querySelector(
          ".lp_actions_bar_container"
        );

        if (menuContainer) {
          const observer = new MutationObserver(() => {
            const isVisible =
              menuContainer.getAttribute("aria-hidden") === "false";
            if (isVisible) {
              addCustomMenuItem();
            }
          });
          observer.observe(menuContainer, {
            attributes: true,
            attributeFilter: ["aria-hidden"],
          });
        }
      }

lpTag.events.bind("lpUnifiedWindow", "state", unifiedWindow);

