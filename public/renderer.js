const baseCss = `
    .live2ai_story_overview_wrapper, .live2ai_strousel_overview_wrapper, .productList {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
    }
    .live2ai_story_overview_wrapper::-webkit-scrollbar, .live2ai_strousel_overview_wrapper::-webkit-scrollbar, .productList::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
    .live2ai_title_subtitle_wrapper {
        margin-bottom: 30px;
    }
    .live2ai-title-web {
        font-family: 'Inter', sans-serif !important;
    }
    .live2ai-sub-title-web {
        --live2ai-font-size-sub-title-web: 16px;
        --live2ai-font-weight-sub-title-web: 400;
    }
    .story_item {
        width: calc(140px - 15px);
    }
    .story_title {
        font-size: 14px;
    }
    .strousel_item {
        width: calc(125px - 15px);
        aspect-ratio: 9 / 16;
    }
    .live2ai_carousel_item {
        width: 197px;
        aspect-ratio: 9 / 16;
    }
    .live2ai_story_item_container {
      background: linear-gradient(200deg, #FF005C 0%, #A57CFC 100%);
    }
    @media screen and (max-width: 767px) {
        .story_item {
            width: calc(85px - 15px);
        }
        .strousel_item {
            width: calc(92px - 15px);
        }
        .story_title {
            width: 85px;
            font-size: 12px;
            margin-top: 4px;
        }
        .live2ai_story_wrapper {
            margin-left: 10px;
        }
        .live2ai_carousel_item {
          width: 168px;
        }
    }
    @media (min-width: 320px) {
        .live2ai-container {
            margin-top: 40px;
            margin-bottom: 40px;
        }
        .live2ai_title_subtitle_wrapper {
            margin-bottom: 20px;
        }
        .live2ai-title-web {
            --live2ai-font-size-title-web: 24px;
        }
        .live2ai-sub-title-web {
            --live2ai-font-size-sub-title-web: 14px;
            --live2ai-font-weight-sub-title-web: 400;
        }
    }
`;

const globalCss = `
    .live2ai-floating-video-player {
      width: 197px !important;
      aspect-ratio: 9 / 16;
      height: auto !important;
    }

    @media screen and (max-width: 767px) {
      .live2ai-floating-video-player {
        width: 150px !important;
      }
    }
`;

function embedScript(src) {
  const live2script = document.createElement("script");
  live2script.setAttribute("src", src);
  document.head.appendChild(live2script);
}

function embedGoogleFont(src) {
  const live2Font = document.createElement("link");
  live2Font.setAttribute("href", src);
  live2Font.setAttribute("rel", "stylesheet");
  document.head.appendChild(live2Font);
}

function renderSection(
  fullXPath = null,
  embedId = null,
  teamId = null,
  customCss = null,
  hrefIncludes = null,
  layoutType = null,
  sectionTitle = null
) {
  if (!fullXPath || !embedId || !teamId) return;
  if (hrefIncludes && !window.location.href.includes(hrefIncludes)) return;

  const observer = new MutationObserver((mutationsList, observer) => {
    const target = document.evaluate(
      fullXPath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    // If the target element exists, disconnect the observer and run the existing code
    if (target) {
      console.log(
        `%cTarget element found for embed: ${embedId}`,
        "color: green"
      );
      observer.disconnect();

      const customCssEl = document.createElement("div");
      customCssEl.setAttribute("class", "live2-custom-css");
      customCssEl.setAttribute("style", "display: none !important;");

      customCssEl.innerHTML = baseCss + (customCss || "");

      const l2c = document.createElement("div");
      l2c.setAttribute("class", "live2-container");

      const newDiv = document.createElement("div");
      newDiv.setAttribute("data-live2-embed", "1");
      newDiv.setAttribute("data-live2-picked-up", "0");
      newDiv.setAttribute("data-live2-loaded", "0");
      newDiv.setAttribute("data-live2-embed-id", embedId);
      newDiv.setAttribute("data-live2-team-id", teamId);

      if (layoutType) {
        newDiv.setAttribute("data-live2-layout-type", layoutType);
      }
      if (sectionTitle) {
        newDiv.setAttribute("data-live2-embed-title", sectionTitle);
      }

      newDiv.append(l2c);
      newDiv.append(customCssEl);

      target.parentNode.insertBefore(newDiv, target);

      embedScript(
        "https://cdn.live2.ai/assets/sdk/latest/live2ai-embed-sdk.js"
      );
    } else {
      console.log(
        `%cTarget element not found for embed: ${embedId}`,
        "color: red"
      );
    }
  });

  // Start observing the document with the observer
  observer.observe(document, { childList: true, subtree: true });
}

embedGoogleFont(
  "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
);

const globalCssEl = document.createElement("style");
globalCssEl.innerHTML = globalCss;
document.head.appendChild(globalCssEl);

// Example of how to use the renderSection function:
// renderSection("/html/body/div[2]/main/section[2]", "dpiihkq7oi", TEAM_ID);

// Example of how to use the renderSection function in a specific url:
// renderSection("/html/body/div[2]/main/section[2]", "dpiihkq7oi", TEAM_ID, null, "https://www.example.com", "story");

// const TEAM_ID = "65b8e3a8885468de58b7c862";

// renderSection("/html/body/main/div[3]/div/div[2]/div/div/div/div[2]", "udse1myoee", TEAM_ID);
// renderSection("/html/body/main/div[3]/div/div[2]/div/div/div/div[2]", "uiv2d5s2xp", TEAM_ID);
// renderSection("/html/body/main/div[5]/div/div", "0cahravyxc", TEAM_ID);
// renderSection("/html/body/main/div[5]/div/div", "0cahravyxc", TEAM_ID);