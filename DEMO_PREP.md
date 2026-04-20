# Student Paths — Science Fair Demo Prep

A cheat-sheet for Easton and Dray. Keep this open on a phone during the fair and skim it between judge visits. Everything judges might ask, in one place.

---

## The one-sentence pitch

> We built a web app that asks kids 15 questions and tells them what kind of thinker they are — based on a real career-theory called Holland RIASEC — so they can explore careers that actually fit how their brain works, instead of picking a major at 18 and hoping.

---

## The 60-second elevator pitch

> Kids get asked "what do you want to be when you grow up" from age five, but nobody gives them tools to figure it out. The research says the average person changes careers five to seven times — and most pick a first one based on a parent, a TV show, or whatever's closest. We wanted to build something that asks better questions.
>
> Our app uses the Holland Occupational Themes — RIASEC — a framework that's been used in career counseling for 60 years. It groups people into six profiles based on how they solve problems. We adapted those six profiles into kid-friendly names like "Builder," "Thinker," and "Creator," and wrote 15 age-adjusted questions for each of three grade levels — elementary, junior high, and high school.
>
> After the survey, students see their top two aptitudes, a personalized action plan with books to read and activities to try, and six career paths with the exact college courses each would need. There's also a live dashboard tracking how many students have taken it and which profiles are most common.

---

## What judges will ask (and how to answer)

### "How does this work?"

1. Student picks a theme (just a visual skin — neon, forest, sunset, etc. — doesn't affect results).
2. Enters their first name and picks their grade level.
3. Gets 15 questions, each with 4 options. Every option is tagged with one of six aptitudes.
4. The app counts which aptitude got the most picks. That's their top result.
5. They see their top two aptitudes, a chart of all six scores, career paths, and an action plan.

### "Why 15 questions?"

Short enough that kids don't give up. Long enough that one random answer doesn't dominate the result. We rebalanced the question bank so every aptitude gets exactly 10 answer options across the 15 questions in each age group — 60 total — so no profile has a statistical advantage.

### "What's RIASEC?"

The Holland Occupational Themes, developed by Dr. John Holland in 1959. It says people and work environments both fall into six categories: Realistic, Investigative, Artistic, Social, Enterprising, Conventional. Used by the U.S. Department of Labor's O*NET database. We renamed them to Builder, Thinker, Creator, Helper, Persuader, and Organizer so they're kid-friendly.

The mapping:
- **Builder** → Realistic (hands-on, tools, outdoors)
- **Thinker** → Investigative (research, analysis, data)
- **Creator** → Artistic (expressive, original, free-form)
- **Helper** → Social (teaching, supporting, healing)
- **Persuader** → Enterprising (leading, selling, pitching)
- **Organizer** → Conventional (order, accuracy, logistics)

### "Is this scientifically valid?"

We're using the RIASEC *framework* — the idea that people sort into these six profiles. The actual questions are ours, and they're designed for kids, not validated the way a professional assessment would be. This is a student project inspired by RIASEC, not a diagnostic tool. That's important to say plainly — judges respect honesty.

### "How did you collect the data?"

Students take the survey on our iPad right here at the booth. The app sends anonymized data to a Google Sheet — first initial only, never full names, never dates of birth. Age group is grade level (elementary / jr high / high school), not a specific age. The dashboard on this iPad pulls from that sheet and refreshes every 30 seconds.

### "What does the dashboard show?"

- **Total Submissions** — how many students have taken it.
- **Today** — how many today (live).
- **Avg Time** — average completion time.
- **Top Aptitude** — the most common result overall.
- **Aptitude Leaderboard** — ranked distribution of all 6 profiles.
- **Radar Chart** — same data, different view.
- **Age Group × Aptitude** — a stacked bar showing how preferences shift between elementary, jr high, and high school. This is the most interesting chart — judges love it.
- **Submissions Over Time** — the rate of submissions over the day.

### "What surprised you while building it?"

(Pick what's actually true.) Possible true answers:
- Making the survey work for elementary kids was harder than for high schoolers — we had to rewrite questions to use kid-language without making them feel babyish.
- The first version had Helper as an option in only 6 of 60 high school questions, so kids who were naturally Helpers literally couldn't score well. We had to go back and rebalance.
- Getting the Spanish translation right required real care — machine translation got the structure wrong for career and aptitude descriptions.

### "What would you do next?"

- Expand to more age groups (college, adults).
- Track results over time for the same student to see how aptitudes develop.
- Partner with a school counselor to validate the questions against an actual RIASEC assessment.
- Add more career paths — each aptitude only shows 3 careers right now; real life has dozens.

### "How does this help the financial literacy problem on your poster?"

**⚠ Be ready for this question.** See the "Poster Review" section below — the problem and solution on the poster don't quite line up. Honest answer: "The financial literacy stat is context for why schools don't prepare kids for real life. Our survey is one piece of that — helping kids find careers they'd actually be good at, which is one part of being prepared. The full solution would need personal-finance education too, which is outside our scope."

### "Is there a way to share results?"

Yes. There's a "Share" button that copies a link, and a QR code for phone-scanning. Parents love this — they take it home to keep.

### "Does it work in Spanish?"

Yes — full translation including all questions, aptitude descriptions, careers, and action plans. Toggle available on the theme-select screen.

---

## The demo walk-through (for judge visits)

Pick the fastest path that shows off the most:

1. **(10 sec)** "Here's the app — pick a theme. Don't worry about this, it's just visual."
2. **(10 sec)** "Enter your first name — we only keep the first initial. Pick your grade level."
3. **(30 sec)** "Here's a question. Every option is tagged with one of 6 aptitudes." Let the judge answer 2-3 questions.
4. **Skip-to-results.** In a demo, you can answer 15 real questions OR jump straight to results. If judges are in a hurry: take it yourself on the second iPad beforehand, leave that result on screen, and say "here's an example result."
5. **(45 sec)** Walk through the results: "Top aptitude is X. Here's the chart of all 6 scores. Here are 3 careers for that aptitude, each with the exact college courses."
6. **(30 sec)** Open the Admin tab → Dashboard. Point at the Age Group × Aptitude chart. "This is the most interesting part — we can see which aptitudes are dominant at each grade level."

Target total: under 2 minutes per judge. Longer if they have questions.

---

## Privacy & data handling (if asked directly)

Answer confidently:

- We store **first initial only** — never full names.
- We store **grade level** (elementary / jr high / high school) — never exact age or birthday.
- Data lives in a Google Sheet owned by our class project — not shared with third parties.
- No advertising, no tracking pixels, no accounts.
- The share link encodes the results into the URL itself — not stored on our server.
- Source code is open on GitHub: github.com/browningtons/youth-aptitude-survey

---

## Technical talking points (for judges who want the geeky version)

- **Stack**: React + TypeScript + Tailwind, built with Vite.
- **Hosted**: GitHub Pages (static) — no server to maintain.
- **Analytics**: Google Apps Script web app writing to a Google Sheet. No database, no login, ~0 operating cost.
- **Bundle size**: Initial JS download is ~192 KB gzipped — we lazy-load the admin dashboard, PDF export, and QR modal so students never download code they don't use.
- **Accessibility**: Keyboard-navigable (press 1-4 to answer, ← to go back), ARIA landmarks throughout, visible focus rings.
- **Resilience**: Mid-survey state is persisted to sessionStorage — if the iPad's battery dies, the student resumes where they left off.
- **Kiosk mode**: Results screen auto-resets after 90s of inactivity so the next student gets a fresh iPad.
- **Privacy-first**: Data shipped off-device is the bare minimum — first initial, grade level, top aptitude, theme choice, completion time. No names, no DOB.

---

## Poster Review — problem/solution mismatch (read before the fair)

**The issue:** Panel 1 ("The Problem") talks about financial literacy gaps — kids not learning taxes, budgeting, credit, loans. Panel 2 ("The Solution") is an aptitude survey based on RIASEC, which helps kids discover careers that match how they think.

A judge will ask: **"How does a career aptitude survey solve financial literacy gaps?"** That's a hard question to answer cleanly because the two topics are related but different.

**Two ways to handle it:**

1. **Update the poster** to match the actual solution. Reframe "The Problem" as:
   > Kids are asked "what do you want to be?" for years but never get tools to figure it out. By the time they pick a major at 18, most do it based on a parent, a TV show, or what pays. The result: the average American changes careers 5-7 times, and two-thirds of graduates say they'd pick a different major.

   Keep a couple of the same kinds of stats (one per bullet) but replace them with career-discovery stats:
   - Only ~20% of U.S. high schools employ a full-time career counselor.
   - The average person changes careers 5-7 times in their life.
   - 61% of college graduates would choose a different major if they could.
   - Most kids can name 5 brands before 5 career paths.

2. **Keep the poster as-is** and have the ready-made answer from the FAQ above: "The financial literacy stat is context for why schools don't prepare kids for real life. Our survey is one piece of that puzzle — helping kids find careers they'd actually be good at."

Option 1 is stronger for judges. Option 2 is fine if the poster is already printed. Choose based on what's feasible.

**Other poster notes:**

- The **Elon Musk quote** in Panel 3 is spicy. Fine if you're comfortable defending it; swap it out if you'd rather avoid a side-conversation. A safer replacement with the same theme: *"Education is not the filling of a pail, but the lighting of a fire." — W.B. Yeats*
- Panel 3 has two quotes but no data or visual. Consider adding a small screenshot of the dashboard chart or a single stat like "X students have taken it so far." Judges like seeing results, not just philosophy.
- The QR code on Panel 2 is great. Consider adding a **second QR code** on Panel 3 that links to the Admin dashboard (or methodology page) so curious judges can see the data story without you needing to navigate.

---

## Before you leave the booth

End-of-day checklist:

- [ ] Clear any dry-run rows from the Google Sheet (filter Column A = "Z" and delete).
- [ ] Take a screenshot of the final dashboard for the project write-up.
- [ ] Note how many submissions + top aptitudes + anything surprising you saw.
- [ ] Plug the iPad in (overnight fair days are brutal on battery).

Good luck.
