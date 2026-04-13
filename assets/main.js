(function () {
  "use strict";

  function initChat() {
    var thread = document.querySelector(".wrap.hero .chat-thread");
    if (!thread) return;
    var steps = thread.querySelectorAll("[data-seq]");
    var between = [420, 580, 560, 1350, 920];
    var t = 0;
    for (var i = 0; i < steps.length; i++) {
      (function (n, startAt) {
        setTimeout(function () {
          steps[n].classList.add("is-visible");
        }, startAt);
      })(i, t);
      if (i < steps.length - 1) t += between[i] || 500;
    }
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /** Shared Slack-style thread for empowers panel (matches hero / #stack chat UI). */
  function empowerVectorThread(ariaLabel, time, bubbles) {
    var bubbleHtml = "";
    for (var i = 0; i < bubbles.length; i++) {
      bubbleHtml += '<div class="bubble">' + bubbles[i] + "</div>";
    }
    return (
      '<div class="chat-card" role="region" aria-label="' +
      escapeHtml(ariaLabel) +
      '">' +
      '<div class="chat-shell">' +
      '<div class="chat-thread">' +
      '<div class="chat-block chat-row">' +
      '<img class="avatar" src="./assets/vector-hero-avatar.png" alt="" />' +
      '<div class="flex-1">' +
      '<div class="bubble-meta">' +
      '<span style="font-size: 14px; font-weight: 600">Vector</span>' +
      '<span style="font-size: 13px; color: #a1a1aa">' +
      escapeHtml(time) +
      "</span>" +
      "</div>" +
      bubbleHtml +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  var FEATURES = {
    visibility: {
      title: "Execution visibility",
      sub: "Instantly know what matters",
      renderPanel: function () {
        return empowerVectorThread("Execution visibility example in Slack", "8:02 AM", [
          "Morning Alex, quick overview ✨",
          "<strong>Checkout:</strong><br />• PR waiting on review since yesterday<br />• Auth migration is unblocked and moving",
          "I nudged for a reviewer and aligned ownership.",
          "Everything else is on track.",
        ]);
      },
    },
    drift: {
      title: "Drift detection",
      sub: "Catch issues before they slow you down",
      renderPanel: function () {
        return empowerVectorThread("Drift detection example in Slack", "3:14 PM", [
          "Heads up: small drift detected.",
          "The auth service PR has been inactive for ~1 day and no reviewer is clearly assigned.",
          "I'm resolving it now before it blocks anything.",
        ]);
      },
    },
    handling: {
      title: "Execution handling",
      sub: "Vector moves work forward for you",
      renderPanel: function () {
        return empowerVectorThread("Execution handling example in Slack", "11:08 AM", [
          "I handled this in <strong>#eng-shipping</strong> so you don't have to.",
          "→ Assigned Sam as reviewer<br />→ Clarified ownership in Linear<br />→ Scheduled a follow-up if no activity",
          "I'll keep things moving and update you if needed.",
        ]);
      },
    },
    escalation: {
      title: "Smart escalation",
      sub: "Vector only involves you when a decision is needed",
      renderPanel: function () {
        return empowerVectorThread("Smart escalation example in Slack", "4:47 PM", [
          "One item needs your input.",
          "Checkout launch scope and timeline don't align.",
          "Options:<br />• Move the release date<br />• Reduce scope for this cycle",
          "Tell me what you prefer, and I'll handle the rest.",
        ]);
      },
    },
  };

  function initEmpowers() {
    var nav = document.querySelector(".empowers-nav");
    var detail = document.getElementById("empower-detail-content");
    var panel = document.getElementById("empower-panel");
    if (!nav || !detail || !panel) return;

    var tabs = nav.querySelectorAll('.empower-nav-item[data-feature]');

    function renderDetail(id) {
      var f = FEATURES[id];
      if (!f) return;
      if (typeof f.renderPanel === "function") {
        detail.innerHTML = f.renderPanel();
        return;
      }
      detail.innerHTML =
        "<h3>" +
        escapeHtml(f.title) +
        "</h3>" +
        '<p class="sub">' +
        escapeHtml(f.sub) +
        "</p>" +
        '<p class="body">' +
        escapeHtml(f.body) +
        "</p>" +
        f.proof();
    }

    function selectFeature(id) {
      var f = FEATURES[id];
      if (!f) return;
      tabs.forEach(function (btn) {
        var on = btn.dataset.feature === id;
        btn.classList.toggle("is-selected", on);
        btn.setAttribute("aria-selected", on ? "true" : "false");
      });
      panel.setAttribute("aria-labelledby", "empower-tab-" + id);
      renderDetail(id);
    }

    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectFeature(btn.dataset.feature);
      });
    });

    selectFeature("visibility");
  }

  function initProblemBanner() {
    var el = document.querySelector(".problem-banner");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-inview");
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    );
    obs.observe(el);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initChat();
    initEmpowers();
    initProblemBanner();
  });
})();
