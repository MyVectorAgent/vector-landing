(function () {
  "use strict";

  function initTimelineSection() {
    var section = document.getElementById("timeline-section");
    if (!section) return;
    function reveal() {
      section.classList.add("is-in-view");
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              reveal();
              io.disconnect();
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      io.observe(section);
    } else {
      reveal();
    }
  }

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

  var FEATURES = {
    brief: {
      title: "Daily execution brief",
      sub: "See what matters, in 30 secs",
      body:
        "Vector scans Slack, GitHub, Linear, and your team’s activity, and surfaces only what needs your attention. No dashboards. No digging through threads.",
      proof: function () {
        return (
          '<div class="proof"><ul style="margin:0;padding-left:1.1rem"><li>2 PRs waiting · 1 at risk · reviewer already nudged</li></ul></div>'
        );
      },
    },
    drift: {
      title: "Execution drift prevention",
      sub: "Fix issues before they become blockers",
      body:
        "Vector catches early signals: missing owners, stalled PRs, unclear threads. It takes action before things slip. No more surprises at standup.",
      proof: function () {
        return '<div class="proof"><p style="margin:0;font-weight:600">Auth PR stalled → reviewer pinged → back on track</p></div>';
      },
    },
    slack: {
      title: "In-channel teammate",
      sub: "Vector follows up for you",
      body:
        "It reaches out, asks for updates, nudges reviewers, and keeps work moving in Slack. No more chasing people.",
      proof: function () {
        return (
          '<div class="proof proof--slack">Hey, quick check: still on track for today?' +
          '<span class="slack-dots" aria-hidden="true"><span></span><span></span><span></span></span></div>'
        );
      },
    },
    escalation: {
      title: "Smart escalation",
      sub: "You’re only pulled in when it matters",
      body:
        "Vector handles day-to-day execution and only escalates when a real decision is needed. No noise. No unnecessary pings.",
      proof: function () {
        return '<div class="proof proof--esc">Checkout launch at risk: need your call on scope</div>';
      },
    },
  };

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function initEmpowers() {
    var grid = document.getElementById("empowers-grid");
    var expanded = document.getElementById("empowers-expanded");
    var detail = document.getElementById("empower-detail-content");
    var compact = document.getElementById("empower-compact-row");
    if (!grid || !expanded || !detail || !compact) return;

    function renderDetail(id) {
      var f = FEATURES[id];
      if (!f) return;
      detail.innerHTML =
        '<button type="button" class="close" id="empower-close">Overview</button>' +
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
      document.getElementById("empower-close").addEventListener("click", closeDetail);
    }

    function buildCompact(currentId) {
      compact.innerHTML = "";
      Object.keys(FEATURES).forEach(function (key) {
        if (key === currentId) return;
        var f = FEATURES[key];
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "empower-compact";
        btn.innerHTML = "<h4>" + escapeHtml(f.title) + "</h4><p>" + escapeHtml(f.sub) + "</p>";
        btn.addEventListener("click", function () {
          openDetail(key);
        });
        compact.appendChild(btn);
      });
    }

    function openDetail(id) {
      grid.classList.add("is-hidden");
      expanded.classList.add("is-open");
      renderDetail(id);
      buildCompact(id);
    }

    function closeDetail() {
      expanded.classList.remove("is-open");
      grid.classList.remove("is-hidden");
      detail.innerHTML = "";
      compact.innerHTML = "";
    }

    grid.querySelectorAll(".empower-card").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openDetail(btn.dataset.feature);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initChat();
    initTimelineSection();
    initEmpowers();
  });
})();
