# ♡ girl dinner

A simple, phone-friendly web app that answers the question of what to make for dinner when you don't really know how to cook. It uses the ingredients you already have, so there's no trip to the supermarket after a long day.

## How it works

Everything happens on one page, laid out like a flow chart of three "guest checks" joined by arrows:

1. **What are you in the mood for?** Pick a mood: Honestly, anything (the default), Cozy & comforting, Light & fresh, Quick & easy, Bold & flavorful, or Breakfast for dinner.
2. **What's in your kitchen?** Tap the ingredients you have. They're grouped into sections you can open and close, and there's a search box to find one fast. Salt, pepper, cooking oil and water are assumed. Some recipes accept swaps; for example, garlic powder counts for garlic and mozzarella counts for cheese.
   - The search box knows other names: "spaghetti" finds Pasta, "scallions" finds Green onion, "garbanzo" finds Canned chickpeas, and so on.
   - **Not on the list?** If nothing matches, tap **+ Add "…" to my kitchen** (or press Enter). It goes under **Your extras** and is remembered. Tap it to remove it. No recipes use extras yet; to make one count, add it to `recipes.js`.
3. **Here's your girl dinner** updates **live**. As you tap moods and ingredients, recipe cards fade in and out:
   - **Ready to cook:** you have every ingredient you need.
   - **You're just missing a few things:** one or two ingredients short. The card shows which ones, and says "you have a swap for this" if something you ticked can stand in.
   - If nothing fits, the app says so and offers buttons that jump back up to change your mood or add ingredients. It never switches your mood for you.

A live count sits next to the ingredient search box (for example, "18 ideas ↓") and jumps down to the results. Outside the kitchen section, a small floating button does the same. Neither ever covers the ingredient list.

**Tap anywhere on a recipe card** to open it. Each recipe page shows:
- **Prep, cook and total time** listed separately, plus the difficulty level.
- **What you need**, with "✓ have it" or "missing" for each ingredient. Under each missing one, **What can I substitute?** lists swaps (for example, Greek yogurt for sour cream or mayo) and highlights any you already have.
- **Beginner-friendly steps**, plus a **New to cooking?** box explaining the words in that recipe (medium heat, simmering, chopping, draining and so on) and **How to tell it's done** (for example, chicken: no pink, 165°F).

Then rate it with two very different buttons:
- ♥ **Loved it** (bold red): shows a ♥ on the card, but it isn't pinned to the top.
- ✕ **Not for me** (quiet, dashed outline): hides it from your results. You can bring it back with "Show hidden recipes."

**Keeping it varied:** the order of results is shuffled each time you open the app, and **Surprise me** won't pick any of your last 3 suggestions.

## The look

Cream paper with one raspberry-red "ink" used for everything: diner guest checks with ruled lines, hand-lettered capitals, scribbled notes ("cheers!", "xoxo", "on the house!") and little line doodles (wine glass, lemon, strawberry, baguette, bottle). Emoji are tinted to match the ink. Dark mode switches to mauve and plum with pink ink.

## Privacy and setup

- No AI service, no accounts, no secret keys. The only outside request is for the free Google Fonts; without internet, the app still works with standard fonts.
- Works offline after the first visit (see "Installing on a phone").
- Your ingredients and ratings are saved only in this browser on this device (`localStorage`). **Reset app**, at the bottom of the page, clears them.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The main page, including the doodle drawings |
| `style.css` | How the app looks (phone first, with dark mode) |
| `app.js` | The logic: the flow page, live matching, animations, ratings and saving |
| `recipes.js` | The "cookbook": about 100 ingredients, their other names (`OTHER_NAMES`) and 55 recipes. Edit this file to add more. |
| `manifest.json` | Tells the phone the app's name, icon and colors, and to open it in its own window |
| `sw.js` | The offline helper: saves a copy of the app on the phone so it works without internet |
| `icons/` | The home-screen icons (a cream heart on raspberry) |

## Installing on a phone

This works once the app is online at an `https://` address (for example GitHub Pages). It does not work from a double-clicked file.

- **iPhone (Safari):** open the app, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open the app, tap the **⋮** menu, then **Add to Home screen** or **Install app**.

The app then opens from its own icon in its own window, without the browser's address bar. After the first visit it also works with no internet connection.

**Changed a file later?** Open `sw.js` and change `whatsfordinner-v1` to `whatsfordinner-v2` (and so on), so phones pick up the new version.

## Running it

Double-click `index.html` to open it in any browser. Nothing needs to be installed.

To see the phone layout on a laptop, open the browser's developer tools (Chrome: right-click → **Inspect**), then click the phone/tablet icon.

## Publishing on GitHub Pages (later)

1. Upload these files to the repository `klimontas1/girldinner`.
2. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
3. After a minute, the app will be live at **https://klimontas1.github.io/girldinner/**

All file links are relative, so nothing has to change for this to work.

## Test checklist

| # | Try this | What should happen |
| --- | --- | --- |
| 1 | Open the app | You see three guest checks joined by dashed arrows: "What are you in the mood for?" → "What's in your kitchen?" → "Here's your girl dinner" |
| 2 | Don't tick anything | Step 3 says "Tap a few ingredients above…", and the count by the search box says "0 ideas" |
| 3 | Pick **Breakfast for dinner**, tick **Eggs**, **Bread** and **Butter** | **Scrambled Eggs on Toast** fades in under "Ready to cook" |
| 4 | Same as #3 | Other recipes appear under "You're just missing a few things" and show what's missing |
| 5 | Now untick **Butter** | Scrambled Eggs moves from "Ready to cook" to "You're just missing a few things" right away |
| 6 | Switch the mood to **Honestly, anything** | More cards fade in; switching back makes them fade out |
| 7 | Pick **Light & fresh**, tap **Clear all**, then tick only **Banana** | "Nothing for “Light & fresh” yet" appears with two buttons, and the mood does **not** change |
| 8 | Pick **Quick & easy** | Every recipe shown takes 15 minutes or less |
| 9 | Open a recipe, tap ✕ **Not for me**, then tap **Back to the flow** | You return to the same spot, that recipe is gone, and "Show hidden recipes (1)" appears |
| 10 | Tap "Show hidden recipes," open the recipe and tap ✕ again | The recipe returns to the normal results |
| 11 | Tap ♥ **Loved it** on a recipe, then go back | The card shows ♥ |
| 12 | Reload the page a few times | The order of the cards changes |
| 13 | Tap **Surprise me** several times, going back each time | It doesn't repeat any of the last 3 picks (if there are more than 3 options) |
| 14 | Tick some ingredients, then reload the page | Your mood, ticked ingredients and ratings are still there |
| 15 | Tap **Reset app** at the bottom and confirm | All ticks and ratings are cleared |
| 16 | Type "mozz" in the search box | Only Mozzarella is shown; clearing the box brings everything back |
| 17 | Tick **Bread**, **Butter** and **Mozzarella** (no cheddar) | **Classic Grilled Cheese** is "Ready to cook", because mozzarella counts as cheese |
| 18 | On a small phone, scroll through the ingredient list | Nothing covers the ingredients; the live count stays beside the search box |
| 19 | View on a phone (or in phone view) | Nothing is cut off, and there's no sideways scrolling |
| 20 | Tick **Canned tuna**, **Tortillas**, **Lettuce** and **Plain / Greek yogurt** | Tuna Salad Wrap says "you have a swap for this"; on its page, "What can I substitute?" is open with yogurt marked "you have this!" |
| 21 | Open **Honey Garlic Chicken** | Separate Prep / Cook / Total times, a "New to cooking?" box (medium-high heat, chopping…) and "How to tell it's done" for chicken |
| 22 | Tap the picture or the right edge of any recipe card | The recipe opens (the whole card is clickable) |
| 23 | On the published site, use **Add to Home Screen**, then open the app from its icon | It opens in its own window with no address bar, and the heart icon is on the home screen |
| 24 | Open the installed app once, turn on airplane mode, close it and open it again | The app still loads and works (with standard fonts) |
| 25 | Type "spaghetti" in the search box | Only Pasta is shown |
| 26 | Type "eggplant" and tap **+ Add "Eggplant" to my kitchen** | It appears under **Your extras**, the search box clears, and it's still there after a reload |
| 27 | Tap **Eggplant ✕** under Your extras | It disappears (and the Your extras section goes away if it was the only one) |

## Safety note

These are simple home-cooking guides. Always cook chicken and ground beef until no pink is left inside, and check labels for allergies.
