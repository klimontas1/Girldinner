/*
  girl dinner — recipe and ingredient data
  ------------------------------------------------
  This file is the app's "cookbook". To add a recipe, copy one of the
  recipe blocks below, give it a new unique id, and list its ingredients
  using the ingredient ids from INGREDIENT_GROUPS.

  Recipe fields:
    id          unique short name (letters, numbers, dashes)
    name        what people see
    emoji       a picture for the card
    time        total minutes, roughly (15 or less counts as "Quick & easy")
    difficulty  "Very easy" or "Easy"
    moods       any of: "comfort", "light", "flavor", "breakfast"
                ("fast" is worked out automatically from time)
    ingredients the ingredients you NEED (used for matching).
                Use a list in square brackets for "either one works", e.g.
                ["garlic", "garlic-powder"] means fresh garlic OR garlic powder.
    optional    nice-to-have extras (shown, but not required)
    steps       short, plain-language instructions
    tip         an optional beginner tip
*/

// Things we assume every kitchen has. They are never required to match.
const STAPLES = ["Salt", "Pepper", "Cooking oil", "Water"];

const INGREDIENT_GROUPS = [
  {
    title: "Protein",
    items: [
      { id: "eggs", name: "Eggs" },
      { id: "chicken", name: "Chicken" },
      { id: "ground-beef", name: "Ground beef" },
      { id: "ground-turkey", name: "Ground turkey" },
      { id: "sausage", name: "Sausage" },
      { id: "bacon", name: "Bacon" },
      { id: "nuggets", name: "Frozen chicken nuggets" },
      { id: "deli-ham", name: "Ham / deli meat" },
      { id: "shrimp", name: "Shrimp" },
      { id: "salmon", name: "Salmon" },
      { id: "tuna", name: "Canned tuna" },
      { id: "tofu", name: "Tofu" },
      { id: "black-beans", name: "Canned black beans" },
      { id: "chickpeas", name: "Canned chickpeas" },
      { id: "lentils", name: "Lentils" }
    ]
  },
  {
    title: "Vegetables",
    items: [
      { id: "onion", name: "Onion" },
      { id: "green-onion", name: "Green onion" },
      { id: "garlic", name: "Garlic" },
      { id: "tomato", name: "Tomato" },
      { id: "bell-pepper", name: "Bell pepper" },
      { id: "jalapeno", name: "Jalapeño" },
      { id: "spinach", name: "Spinach" },
      { id: "kale", name: "Kale" },
      { id: "lettuce", name: "Lettuce" },
      { id: "cucumber", name: "Cucumber" },
      { id: "carrot", name: "Carrots" },
      { id: "celery", name: "Celery" },
      { id: "broccoli", name: "Broccoli" },
      { id: "zucchini", name: "Zucchini" },
      { id: "mushrooms", name: "Mushrooms" },
      { id: "corn", name: "Corn" },
      { id: "peas", name: "Peas" },
      { id: "green-beans", name: "Green beans" },
      { id: "cabbage", name: "Cabbage / coleslaw mix" },
      { id: "potato", name: "Potato" },
      { id: "sweet-potato", name: "Sweet potato" },
      { id: "frozen-veg", name: "Frozen mixed veggies" },
      { id: "avocado", name: "Avocado" }
    ]
  },
  {
    title: "Fruit & fresh herbs",
    items: [
      { id: "lemon", name: "Lemon or lime" },
      { id: "banana", name: "Banana" },
      { id: "apple", name: "Apple" },
      { id: "berries", name: "Berries" },
      { id: "cilantro", name: "Cilantro" },
      { id: "basil", name: "Basil" },
      { id: "ginger", name: "Fresh ginger" }
    ]
  },
  {
    title: "Bread, pasta & grains",
    items: [
      { id: "pasta", name: "Pasta" },
      { id: "rice", name: "Rice" },
      { id: "bread", name: "Bread" },
      { id: "tortillas", name: "Tortillas" },
      { id: "tortilla-chips", name: "Tortilla chips" },
      { id: "pita", name: "Pita or naan" },
      { id: "bagel", name: "Bagels" },
      { id: "ramen", name: "Instant ramen" },
      { id: "couscous", name: "Couscous" },
      { id: "quinoa", name: "Quinoa" },
      { id: "oats", name: "Oats" },
      { id: "flour", name: "Flour" },
      { id: "crackers", name: "Crackers" },
      { id: "breadcrumbs", name: "Breadcrumbs / panko" }
    ]
  },
  {
    title: "Dairy & fridge",
    items: [
      { id: "milk", name: "Milk" },
      { id: "butter", name: "Butter" },
      { id: "cheese", name: "Cheddar / shredded cheese" },
      { id: "mozzarella", name: "Mozzarella" },
      { id: "parmesan", name: "Parmesan" },
      { id: "feta", name: "Feta" },
      { id: "cream-cheese", name: "Cream cheese" },
      { id: "sour-cream", name: "Sour cream" },
      { id: "yogurt", name: "Plain / Greek yogurt" },
      { id: "hummus", name: "Hummus" },
      { id: "olives", name: "Olives" },
      { id: "pickles", name: "Pickles" },
      { id: "heavy-cream", name: "Heavy cream" }
    ]
  },
  {
    title: "Sauces & condiments",
    items: [
      { id: "pasta-sauce", name: "Pasta sauce" },
      { id: "pesto", name: "Pesto" },
      { id: "soy-sauce", name: "Soy sauce" },
      { id: "salsa", name: "Salsa" },
      { id: "hot-sauce", name: "Hot sauce / sriracha" },
      { id: "bbq-sauce", name: "BBQ sauce" },
      { id: "ketchup", name: "Ketchup" },
      { id: "mustard", name: "Mustard" },
      { id: "mayo", name: "Mayonnaise" },
      { id: "ranch", name: "Ranch" },
      { id: "vinegar", name: "Vinegar" },
      { id: "sesame-oil", name: "Sesame oil" },
      { id: "honey", name: "Honey" },
      { id: "maple-syrup", name: "Maple syrup" },
      { id: "peanut-butter", name: "Peanut butter" },
      { id: "jam", name: "Jam" }
    ]
  },
  {
    title: "Cans & pantry",
    items: [
      { id: "broth", name: "Chicken or veggie broth" },
      { id: "canned-tomatoes", name: "Canned tomatoes" },
      { id: "coconut-milk", name: "Coconut milk" },
      { id: "sugar", name: "Sugar" },
      { id: "baking-powder", name: "Baking powder" }
    ]
  },
  {
    title: "Spices",
    items: [
      { id: "garlic-powder", name: "Garlic powder" },
      { id: "italian-seasoning", name: "Italian seasoning" },
      { id: "chili-powder", name: "Chili powder" },
      { id: "cumin", name: "Cumin" },
      { id: "paprika", name: "Paprika" },
      { id: "curry-powder", name: "Curry powder" },
      { id: "red-pepper-flakes", name: "Red pepper flakes" },
      { id: "cinnamon", name: "Cinnamon" }
    ]
  }
];

// Other names people might type in the search box. Searching any of
// these finds the ingredient (e.g. "spaghetti" finds Pasta).
// Add more words to any list; the ingredient id goes on the left.
const OTHER_NAMES = {
  "eggs": ["egg"],
  "chicken": ["chicken breast", "chicken thigh", "rotisserie"],
  "ground-beef": ["hamburger", "mince", "minced beef"],
  "sausage": ["chorizo", "kielbasa", "hot dog"],
  "nuggets": ["chicken tenders", "chicken strips"],
  "deli-ham": ["lunch meat", "turkey slices", "salami", "prosciutto"],
  "shrimp": ["prawns"],
  "salmon": ["fish", "cod", "tilapia"],
  "tuna": ["tinned tuna"],
  "black-beans": ["beans", "kidney beans", "pinto beans"],
  "chickpeas": ["garbanzo"],
  "onion": ["shallot", "red onion"],
  "green-onion": ["scallion", "spring onion", "chives"],
  "tomato": ["cherry tomatoes"],
  "bell-pepper": ["capsicum", "peppers"],
  "jalapeno": ["jalapeno", "chili pepper", "chile"],
  "lettuce": ["romaine", "salad greens", "mixed greens", "arugula", "rocket"],
  "zucchini": ["courgette", "squash"],
  "corn": ["sweetcorn"],
  "cabbage": ["slaw"],
  "potato": ["potatoes"],
  "sweet-potato": ["yam"],
  "frozen-veg": ["frozen vegetables", "mixed vegetables"],
  "berries": ["strawberries", "blueberries", "raspberries"],
  "cilantro": ["coriander"],
  "pasta": ["spaghetti", "penne", "macaroni", "noodles", "linguine", "fettuccine", "rigatoni", "fusilli"],
  "rice": ["brown rice", "jasmine", "basmati"],
  "bread": ["toast", "sourdough", "rolls", "buns"],
  "tortillas": ["wraps", "burrito"],
  "tortilla-chips": ["nachos", "chips"],
  "pita": ["flatbread"],
  "ramen": ["cup noodles"],
  "oats": ["oatmeal", "porridge"],
  "cheese": ["cheddar", "monterey jack", "american cheese", "cheese slices"],
  "mozzarella": ["string cheese"],
  "parmesan": ["parmigiano"],
  "yogurt": ["yoghurt"],
  "heavy-cream": ["whipping cream", "double cream", "half and half"],
  "butter": ["margarine"],
  "hummus": ["houmous"],
  "pasta-sauce": ["marinara", "tomato sauce"],
  "soy-sauce": ["tamari", "soya"],
  "hot-sauce": ["tabasco", "chili sauce"],
  "ketchup": ["catsup"],
  "mustard": ["dijon"],
  "mayo": ["mayo", "aioli"],
  "vinegar": ["balsamic", "apple cider vinegar", "rice vinegar"],
  "peanut-butter": ["pb"],
  "jam": ["jelly", "preserves"],
  "broth": ["stock", "bouillon"],
  "canned-tomatoes": ["diced tomatoes", "crushed tomatoes", "tinned tomatoes"],
  "sugar": ["brown sugar"],
  "italian-seasoning": ["oregano", "thyme", "dried herbs"],
  "chili-powder": ["cayenne"],
  "red-pepper-flakes": ["chili flakes", "crushed red pepper"]
};

// Handy "either one works" groups used in recipes below.
const ANY_CHEESE = ["cheese", "mozzarella"];
const ANY_GARLIC = ["garlic", "garlic-powder"];
const ANY_GROUND_MEAT = ["ground-beef", "ground-turkey"];

const RECIPES = [
  // ---------- Comfort food ----------
  {
    id: "garlic-butter-pasta",
    name: "Garlic Butter Pasta",
    emoji: "🍝",
    time: 15,
    difficulty: "Very easy",
    moods: ["comfort"],
    ingredients: ["pasta", "butter", ANY_GARLIC],
    optional: ["cheese", "spinach"],
    steps: [
      "Fill a pot about two-thirds with water, add a big pinch of salt, and bring it to a boil (lots of bubbles).",
      "Add the pasta and cook for the time on the box, stirring now and then so it doesn't stick.",
      "While it cooks, peel and finely chop 2–3 garlic cloves.",
      "Before draining, scoop out a mug of the pasta water. Then drain the pasta.",
      "In the same pot on low heat (dial about a quarter of the way), melt 2–3 spoonfuls of butter and add the garlic. Stir for 1 minute — don't let it go brown.",
      "Add the pasta back plus a splash of the pasta water. Stir until glossy. Add salt, pepper, and cheese if you have it."
    ],
    tip: "Pasta water is salty and starchy — it turns butter into a silky sauce."
  },
  {
    id: "grilled-cheese",
    name: "Classic Grilled Cheese",
    emoji: "🧀",
    time: 10,
    difficulty: "Very easy",
    moods: ["comfort"],
    ingredients: ["bread", ANY_CHEESE, "butter"],
    optional: ["tomato", "bacon"],
    steps: [
      "Spread butter on one side of each slice of bread.",
      "Put one slice butter-side down in a cold pan. Pile cheese on top, then the second slice butter-side up.",
      "Turn the heat to medium-low (dial a bit under halfway).",
      "Cook 3–4 minutes until the bottom is golden. Flip with a spatula.",
      "Cook another 2–3 minutes until golden and the cheese is melted."
    ],
    tip: "Lower heat takes a little longer but melts the cheese before the bread burns."
  },
  {
    id: "tomato-pasta",
    name: "Easy Tomato Pasta",
    emoji: "🍅",
    time: 20,
    difficulty: "Very easy",
    moods: ["comfort"],
    ingredients: ["pasta", ["pasta-sauce", "canned-tomatoes"]],
    optional: ["garlic", "cheese", "ground-beef", "spinach", "basil", "parmesan", "italian-seasoning", "red-pepper-flakes"],
    steps: [
      "Boil salted water in a pot and cook the pasta for the time on the box.",
      "While it cooks, warm the pasta sauce in a small pan on medium-low heat. If you have garlic, fry a chopped clove in a little oil first, then add the sauce.",
      "Drain the pasta and stir it into the sauce.",
      "Top with cheese if you have it."
    ],
    tip: "Have ground beef? Brown it in the pan first, then add the sauce — instant meat sauce."
  },
  {
    id: "egg-fried-rice",
    name: "Egg Fried Rice",
    emoji: "🍳",
    time: 15,
    difficulty: "Easy",
    moods: ["comfort"],
    ingredients: ["rice", "eggs", ["frozen-veg", "peas", "carrot", "corn"], "soy-sauce"],
    optional: ["onion", "garlic", "bacon", "green-onion", "sesame-oil", "peas"],
    steps: [
      "This works best with cooked rice from earlier (even yesterday). If you only have uncooked rice, cook it first following the package.",
      "Heat a spoonful of oil in a large pan on medium-high (dial about two-thirds).",
      "Add a handful of frozen veggies and stir for 3 minutes.",
      "Push the veggies to the side. Crack 2 eggs into the empty space and stir them until scrambled.",
      "Add the rice, break up any clumps, and stir everything together for 3–4 minutes.",
      "Add 1–2 spoonfuls of soy sauce, stir, and taste."
    ],
    tip: "Cold leftover rice fries better than fresh — it won't go mushy."
  },
  {
    id: "loaded-potato",
    name: "Loaded Microwave Potato",
    emoji: "🥔",
    time: 15,
    difficulty: "Very easy",
    moods: ["comfort"],
    ingredients: ["potato", ANY_CHEESE, "butter"],
    optional: ["sour-cream", "bacon", "black-beans"],
    steps: [
      "Wash the potato and poke it all over with a fork (about 8 times).",
      "Microwave on a plate for 5 minutes. Flip it over and microwave 3–5 more minutes until a fork slides in easily.",
      "Careful, it's hot! Cut it open down the middle.",
      "Add butter, salt, pepper, and cheese. Microwave 30 more seconds to melt the cheese.",
      "Top with sour cream or bacon if you have them."
    ]
  },
  {
    id: "stovetop-mac",
    name: "Stovetop Mac & Cheese",
    emoji: "🧀",
    time: 20,
    difficulty: "Easy",
    moods: ["comfort"],
    ingredients: ["pasta", "milk", "butter", "cheese"],
    optional: ["bacon", "hot-sauce"],
    steps: [
      "Cook the pasta in salted boiling water for the time on the box. Drain it.",
      "Put the pot back on low heat (dial about a quarter). Add a spoonful of butter and about half a cup of milk.",
      "Add 2 big handfuls of cheese a bit at a time, stirring until smooth.",
      "Add the pasta back and stir. If it's too thick, add a splash more milk.",
      "Season with salt and pepper."
    ],
    tip: "Keep the heat low once the cheese goes in, or it can turn grainy."
  },
  {
    id: "potato-egg-hash",
    name: "Potato Hash with Eggs",
    emoji: "🥘",
    time: 30,
    difficulty: "Easy",
    moods: ["comfort", "breakfast"],
    ingredients: [["potato", "sweet-potato"], "onion", "eggs"],
    optional: ["bell-pepper", "bacon", "cheese", "paprika", "green-onion"],
    steps: [
      "Cut the potato into small cubes (about the size of dice). Chop half an onion.",
      "Heat 2 spoonfuls of oil in a pan on medium (dial halfway). Add the potato with a pinch of salt.",
      "Cook for about 15 minutes, stirring every few minutes, until golden and soft inside.",
      "Add the onion (and pepper if you have it) and cook 5 more minutes.",
      "Make 2 little gaps in the potatoes and crack an egg into each. Put a lid (or a plate) on top and cook 3–4 minutes until the whites are set."
    ]
  },
  {
    id: "veggie-soup",
    name: "Cozy Veggie Soup",
    emoji: "🍲",
    time: 30,
    difficulty: "Easy",
    moods: ["comfort", "light"],
    ingredients: ["broth", ["frozen-veg", "carrot", "zucchini", "green-beans"], "potato", "onion"],
    optional: ["garlic", "chickpeas", "spinach"],
    steps: [
      "Chop the onion. Cut the potato into small cubes.",
      "Heat a spoonful of oil in a pot on medium (dial halfway). Add the onion and cook 3–4 minutes until soft.",
      "Add the potato and about 4 cups of broth. Turn the heat up until it bubbles, then back down to medium-low.",
      "Simmer (gentle bubbles) for 15 minutes.",
      "Add 2 handfuls of frozen veggies and cook 5 more minutes. Taste and add salt and pepper."
    ],
    tip: "It keeps in the fridge for 3–4 days — tomorrow's lunch is sorted."
  },
  {
    id: "pancakes",
    name: "Simple Pancakes",
    emoji: "🥞",
    time: 25,
    difficulty: "Easy",
    moods: ["breakfast", "comfort"],
    ingredients: ["flour", "milk", "eggs", "baking-powder", "sugar"],
    optional: ["butter", "honey", "banana"],
    steps: [
      "In a bowl, mix 1 cup flour, 2 teaspoons baking powder, 1 spoonful sugar, and a pinch of salt.",
      "In a cup, whisk 1 egg with 1 cup of milk. Pour it into the flour and stir until just mixed — a few lumps are fine.",
      "Heat a pan on medium (dial halfway) with a little butter or oil.",
      "Pour in about a quarter cup of batter per pancake. When bubbles pop on top (about 2 minutes), flip.",
      "Cook 1–2 minutes more until golden. Serve with honey or sliced banana."
    ],
    tip: "The first pancake is always the ugly test one. That's normal."
  },

  // ---------- Something light ----------
  {
    id: "chickpea-salad",
    name: "Lemony Chickpea Salad",
    emoji: "🥗",
    time: 10,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: ["chickpeas", ["cucumber", "bell-pepper"], "tomato", "lemon"],
    optional: ["onion", "avocado", "cheese"],
    steps: [
      "Open the chickpeas, pour them into a strainer, and rinse with water.",
      "Chop the cucumber and tomato into bite-size pieces.",
      "Put everything in a bowl. Squeeze in the juice of half a lemon and add a spoonful of oil.",
      "Add salt and pepper, stir, and taste. Add more lemon if you like."
    ]
  },
  {
    id: "tuna-wrap",
    name: "Tuna Salad Wrap",
    emoji: "🌯",
    time: 10,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: ["tuna", "mayo", ["tortillas", "pita"], ["lettuce", "spinach"]],
    optional: ["cucumber", "tomato", "lemon"],
    steps: [
      "Open the tuna and drain the liquid (press the lid down over the sink).",
      "In a bowl, mix the tuna with 1–2 spoonfuls of mayo, salt, and pepper.",
      "Lay a tortilla flat. Add a few lettuce leaves and the tuna in a line down the middle.",
      "Fold the bottom up, then roll from one side to the other."
    ]
  },
  {
    id: "egg-salad-bowl",
    name: "Big Salad with Boiled Egg",
    emoji: "🥚",
    time: 15,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: [["lettuce", "spinach", "kale"], "eggs", "cucumber", "tomato"],
    optional: ["avocado", "cheese", "lemon", "chickpeas"],
    steps: [
      "Put 1–2 eggs in a small pot, cover with water, and bring to a boil.",
      "Once it boils, turn the heat down a little and set a timer for 9 minutes.",
      "Meanwhile, chop the lettuce, cucumber, and tomato into a bowl.",
      "Move the eggs to cold water for a minute, then peel and slice them.",
      "Add eggs on top. Dress with oil, salt, pepper (and lemon if you have it)."
    ]
  },
  {
    id: "lemon-chicken-spinach",
    name: "Lemon Garlic Chicken & Spinach",
    emoji: "🍋",
    time: 25,
    difficulty: "Easy",
    moods: ["light"],
    ingredients: ["chicken", "lemon", ANY_GARLIC, ["spinach", "kale", "broccoli"]],
    optional: ["rice", "butter"],
    steps: [
      "Cut the chicken into strips about the width of your finger. Sprinkle with salt and pepper.",
      "Heat a spoonful of oil in a pan on medium-high (dial about two-thirds).",
      "Add the chicken and cook 5–7 minutes, turning, until there's no pink inside (cut one piece to check).",
      "Turn the heat to medium. Add 2 chopped garlic cloves and stir for 1 minute.",
      "Add 2 big handfuls of spinach and stir until it shrinks (about 1 minute).",
      "Squeeze half a lemon over the top. Serve with rice if you have it."
    ],
    tip: "Chicken is done when it's white all the way through with clear juices."
  },
  {
    id: "black-bean-bowl",
    name: "Black Bean Rice Bowl",
    emoji: "🍚",
    time: 25,
    difficulty: "Very easy",
    moods: ["light", "flavor"],
    ingredients: [["rice", "quinoa"], "black-beans", "salsa"],
    optional: ["avocado", "cheese", "sour-cream", "lemon"],
    steps: [
      "Cook the rice following the package (or warm up leftover rice).",
      "Drain and rinse the beans. Warm them in a small pot or the microwave with a pinch of salt.",
      "Put rice in a bowl, then beans, then a few spoonfuls of salsa.",
      "Top with avocado, cheese, or sour cream if you have them."
    ]
  },
  {
    id: "spinach-omelette",
    name: "Spinach & Cheese Omelette",
    emoji: "🍳",
    time: 10,
    difficulty: "Easy",
    moods: ["breakfast", "light"],
    ingredients: ["eggs", ["spinach", "mushrooms", "bell-pepper"], ["cheese", "feta", "mozzarella"], "butter"],
    optional: ["tomato", "onion"],
    steps: [
      "Whisk 2–3 eggs in a bowl with a pinch of salt and pepper.",
      "Melt a little butter in a pan on medium (dial halfway). Add a handful of spinach (or chopped mushrooms or pepper) and cook until soft.",
      "Pour in the eggs and tilt the pan so they cover the bottom.",
      "When the edges look set (about 2 minutes), sprinkle cheese on one half.",
      "Fold the other half over with a spatula. Cook 30 seconds more and slide onto a plate."
    ],
    tip: "If it breaks when folding, call it a scramble. Tastes the same!"
  },

  // ---------- Something with flavor ----------
  {
    id: "beef-tacos",
    name: "Weeknight Beef Tacos",
    emoji: "🌮",
    time: 20,
    difficulty: "Easy",
    moods: ["flavor"],
    ingredients: [ANY_GROUND_MEAT, "tortillas", ANY_CHEESE, "salsa"],
    optional: ["lettuce", "onion", "sour-cream", "hot-sauce"],
    steps: [
      "Heat a pan on medium-high (dial about two-thirds). Add the ground beef and break it up with a spoon.",
      "Cook 7–8 minutes, stirring, until there's no pink left. Add salt and pepper.",
      "Stir in 2–3 spoonfuls of salsa and cook 1 more minute.",
      "Warm the tortillas in a dry pan for 20 seconds per side (or 20 seconds in the microwave).",
      "Fill each tortilla with beef and cheese, plus any toppings you have."
    ]
  },
  {
    id: "peanut-noodles",
    name: "Spicy Peanut Noodles",
    emoji: "🍜",
    time: 10,
    difficulty: "Very easy",
    moods: ["flavor"],
    ingredients: ["ramen", "peanut-butter", "soy-sauce", ["hot-sauce", "red-pepper-flakes"]],
    optional: ["garlic", "honey", "cucumber", "eggs"],
    steps: [
      "Cook the ramen noodles in boiling water for 3 minutes. Throw away the flavor packet (or save it for another day).",
      "While they cook, mix in a bowl: 1 big spoonful peanut butter, 1 spoonful soy sauce, a few shakes of hot sauce, and 2 spoonfuls of hot water from the pot.",
      "Stir until smooth.",
      "Drain the noodles and toss them in the sauce."
    ],
    tip: "A little honey in the sauce balances the spice."
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken Stir-Fry",
    emoji: "🥢",
    time: 25,
    difficulty: "Easy",
    moods: ["flavor"],
    ingredients: ["chicken", ["frozen-veg", "broccoli", "bell-pepper"], "soy-sauce", ANY_GARLIC, "rice"],
    optional: ["honey", "bell-pepper", "onion", "hot-sauce"],
    steps: [
      "Start the rice following the package.",
      "Cut the chicken into bite-size pieces.",
      "Heat a spoonful of oil in a big pan on medium-high (dial about two-thirds). Cook the chicken 5–6 minutes until no pink is left inside.",
      "Add 2 handfuls of frozen veggies and 2 chopped garlic cloves. Stir for 4 minutes.",
      "Add 2 spoonfuls of soy sauce (and a little honey if you have it). Stir 1 minute.",
      "Serve over the rice."
    ]
  },
  {
    id: "bean-quesadilla",
    name: "Cheesy Bean Quesadilla",
    emoji: "🫓",
    time: 10,
    difficulty: "Very easy",
    moods: ["flavor"],
    ingredients: ["tortillas", "black-beans", ANY_CHEESE],
    optional: ["salsa", "sour-cream", "hot-sauce", "avocado"],
    steps: [
      "Drain and rinse the beans. Mash about half a cup lightly with a fork.",
      "Lay a tortilla in a dry pan. Spread beans on one half and add a handful of cheese.",
      "Fold the tortilla in half. Turn the heat to medium (dial halfway).",
      "Cook 2–3 minutes until golden, flip, and cook 2 more minutes.",
      "Cut into triangles and dip in salsa or sour cream."
    ]
  },
  {
    id: "honey-garlic-chicken",
    name: "Honey Garlic Chicken",
    emoji: "🍯",
    time: 25,
    difficulty: "Easy",
    moods: ["flavor"],
    ingredients: ["chicken", "honey", "soy-sauce", ANY_GARLIC],
    optional: ["rice", "frozen-veg", "lemon"],
    steps: [
      "Cut the chicken into bite-size pieces and season with a little salt and pepper.",
      "Mix in a cup: 2 spoonfuls honey, 2 spoonfuls soy sauce, and 2 chopped garlic cloves.",
      "Heat a spoonful of oil in a pan on medium-high. Cook the chicken 5–7 minutes until no pink is left inside.",
      "Turn the heat to medium-low. Pour in the sauce and stir for 2 minutes until it gets sticky.",
      "Serve with rice or veggies if you have them."
    ],
    tip: "Honey burns fast — that's why the heat goes down before the sauce goes in."
  },
  {
    id: "spicy-tuna-bowl",
    name: "Spicy Tuna Rice Bowl",
    emoji: "🐟",
    time: 25,
    difficulty: "Very easy",
    moods: ["flavor"],
    ingredients: ["rice", "tuna", "mayo", ["hot-sauce", "red-pepper-flakes"]],
    optional: ["soy-sauce", "cucumber", "avocado", "eggs"],
    steps: [
      "Cook the rice following the package (or warm up leftover rice).",
      "Drain the tuna. In a bowl, mix it with 1 spoonful mayo and as much hot sauce as you like.",
      "Put the rice in a bowl and add the spicy tuna on top.",
      "Add a splash of soy sauce and sliced cucumber or avocado if you have them."
    ]
  },

  // ---------- Breakfast for dinner ----------
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    emoji: "🥑",
    time: 5,
    difficulty: "Very easy",
    moods: ["breakfast", "light"],
    ingredients: [["bread", "bagel"], "avocado"],
    optional: ["lemon", "eggs", "hot-sauce", "tomato"],
    steps: [
      "Toast the bread.",
      "Cut the avocado in half around the pit, twist it open, and scoop the flesh into a bowl.",
      "Mash with a fork. Add salt, pepper, and a squeeze of lemon if you have it.",
      "Spread on the toast. Top with a fried egg for a fuller meal."
    ]
  },
  {
    id: "scrambled-eggs-toast",
    name: "Scrambled Eggs on Toast",
    emoji: "🍞",
    time: 10,
    difficulty: "Very easy",
    moods: ["breakfast"],
    ingredients: ["eggs", "bread", "butter"],
    optional: ["cheese", "spinach", "hot-sauce"],
    steps: [
      "Whisk 2–3 eggs in a bowl with a pinch of salt.",
      "Melt a little butter in a pan on medium-low (dial a bit under halfway).",
      "Pour in the eggs. Gently push them around with a spatula as they set.",
      "Take them off the heat when they still look a little wet — they keep cooking.",
      "Toast and butter the bread, then pile the eggs on top."
    ],
    tip: "Low and slow = soft, creamy eggs. High heat = rubbery."
  },
  {
    id: "breakfast-tacos",
    name: "Breakfast Tacos",
    emoji: "🌮",
    time: 15,
    difficulty: "Very easy",
    moods: ["breakfast", "flavor"],
    ingredients: ["eggs", "tortillas", ANY_CHEESE],
    optional: ["salsa", "bacon", "avocado", "hot-sauce", "potato"],
    steps: [
      "If you have bacon, cook it first in a pan on medium until crispy, then set aside.",
      "Whisk 3 eggs with a pinch of salt and scramble them in a pan on medium-low.",
      "Warm the tortillas in a dry pan or the microwave for 20 seconds.",
      "Fill with eggs and cheese, then add salsa, bacon, or avocado."
    ]
  },
  {
    id: "pb-banana-toast",
    name: "Peanut Butter Banana Toast",
    emoji: "🍌",
    time: 5,
    difficulty: "Very easy",
    moods: ["breakfast"],
    ingredients: [["bread", "bagel"], "peanut-butter", "banana"],
    optional: ["honey", "jam", "cinnamon"],
    steps: [
      "Toast the bread.",
      "Spread a thick layer of peanut butter.",
      "Slice the banana into rounds and lay them on top.",
      "Drizzle with honey if you have it."
    ]
  },

  // ---------- Snacky plates ----------
  {
    id: "girl-dinner-plate",
    name: "Cheese & Cracker Plate",
    emoji: "🥂",
    time: 5,
    difficulty: "Very easy",
    moods: ["light", "comfort"],
    ingredients: [["cheese", "mozzarella", "feta", "parmesan", "cream-cheese"], ["crackers", "bread", "pita", "tortilla-chips", "bagel"]],
    optional: ["deli-ham", "olives", "pickles", "berries", "apple", "cucumber", "hummus", "jam", "honey", "carrot"],
    steps: [
      "Slice or break the cheese into bite-size pieces.",
      "Add your crackers or bread (toast the bread if you're feeling fancy).",
      "Fill the gaps with whatever's around: ham, olives, pickles, fruit, cucumber slices, a little jam or honey.",
      "Eat on the couch. No notes."
    ],
    tip: "Something salty + something crunchy + something sweet = the perfect plate."
  },
  {
    id: "fancy-mac-nuggets",
    name: "Mac & Nuggets",
    emoji: "🦕",
    time: 20,
    difficulty: "Very easy",
    moods: ["comfort"],
    ingredients: ["pasta", ANY_CHEESE, "nuggets"],
    optional: ["milk", "butter", "ketchup", "bbq-sauce", "ranch", "hot-sauce"],
    steps: [
      "Bake the nuggets following the bag (usually 425°F / 220°C for about 15 minutes, flipping halfway).",
      "Meanwhile, cook the pasta in salted boiling water for the time on the box. Drain.",
      "Back in the pot on low heat: add a spoonful of butter, a splash of milk, and 2 big handfuls of cheese. Stir until melty.",
      "Serve with ketchup, BBQ sauce, or ranch for dipping."
    ],
    tip: "Feeling fancy? Serve the mac in a wine glass with a nugget on the rim."
  },
  {
    id: "fries-aioli",
    name: "Fancy Fries & Garlic Aioli",
    emoji: "🍟",
    time: 35,
    difficulty: "Easy",
    moods: ["comfort"],
    ingredients: [["potato", "sweet-potato"], "mayo", ANY_GARLIC],
    optional: ["lemon", "parmesan", "paprika", "italian-seasoning"],
    steps: [
      "Turn the oven on to 425°F (220°C).",
      "Cut the potatoes into thin sticks (leave the skin on). Toss on a baking sheet with 2 spoonfuls of oil, salt, and paprika if you have it.",
      "Spread them out so they don't touch. Bake 25–30 minutes, flipping halfway, until golden and crispy.",
      "Meanwhile, make the aioli: mix 3 spoonfuls of mayo with 1 finely chopped garlic clove (or a shake of garlic powder) and a squeeze of lemon.",
      "Toss the hot fries with grated parmesan and dip away."
    ],
    tip: "Sweet potato fries work too, and they look gorgeous."
  },
  {
    id: "crunchy-slaw",
    name: "Crunchy Lemon Slaw",
    emoji: "🥗",
    time: 10,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: ["cabbage", ["lemon", "vinegar"]],
    optional: ["parmesan", "apple", "carrot", "green-onion", "mayo", "honey", "feta"],
    steps: [
      "Slice the cabbage as thin as you can (or use a bag of coleslaw mix).",
      "Squeeze in the juice of half a lemon (or a spoonful of vinegar) and add 2 spoonfuls of oil, salt, and pepper.",
      "Toss well with your hands or tongs. Let it sit 5 minutes to soften a little.",
      "Top with shaved parmesan, thin apple slices, or a drizzle of honey."
    ]
  },
  {
    id: "hummus-board",
    name: "Hummus Snack Board",
    emoji: "🫒",
    time: 5,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: ["hummus", ["cucumber", "carrot", "bell-pepper", "celery"]],
    optional: ["pita", "crackers", "olives", "feta", "tomato", "red-pepper-flakes"],
    steps: [
      "Spoon the hummus into a bowl and swirl the top with the back of a spoon.",
      "Drizzle a little oil on top and add a pinch of red pepper flakes if you have them.",
      "Cut the veggies into sticks.",
      "Arrange everything around the bowl with pita, crackers, olives, or feta."
    ]
  },
  {
    id: "chips-guac",
    name: "Chips & Easy Guac",
    emoji: "🥑",
    time: 10,
    difficulty: "Very easy",
    moods: ["flavor"],
    ingredients: ["tortilla-chips", "avocado", "lemon"],
    optional: ["onion", "tomato", "cilantro", "jalapeno", "salsa"],
    steps: [
      "Cut the avocados in half, remove the pit, and scoop into a bowl.",
      "Mash with a fork. Squeeze in half a lime or lemon and add a big pinch of salt.",
      "Stir in finely chopped onion, tomato, or cilantro if you have them.",
      "Taste, add more salt or lime, and dig in with chips."
    ]
  },

  // ---------- More recipes (use the bigger ingredient list) ----------
  {
    id: "garlic-butter-shrimp",
    name: "Garlic Butter Shrimp",
    emoji: "🍤",
    time: 15,
    difficulty: "Easy",
    moods: ["flavor", "light"],
    ingredients: ["shrimp", "butter", ANY_GARLIC],
    optional: ["lemon", "red-pepper-flakes", "rice", "pasta", "parmesan", "basil"],
    steps: [
      "If the shrimp are frozen, put them in a bowl of cold water for 10 minutes to thaw, then pat dry with a paper towel.",
      "Melt 2 spoonfuls of butter in a pan on medium (dial halfway). Add 2 chopped garlic cloves (or a few shakes of garlic powder).",
      "Add the shrimp in one layer with a pinch of salt. Cook about 2 minutes until the bottoms turn pink.",
      "Flip and cook 1–2 minutes more until pink all over and curled into a C shape.",
      "Squeeze lemon on top. Eat over rice or toss with pasta."
    ],
    tip: "Shrimp cook fast. A loose C shape means done; a tight O means overcooked."
  },
  {
    id: "sheet-pan-sausage",
    name: "Sheet-Pan Sausage & Veggies",
    emoji: "🌭",
    time: 35,
    difficulty: "Very easy",
    moods: ["comfort"],
    ingredients: ["sausage", ["potato", "sweet-potato"], ["broccoli", "bell-pepper", "zucchini", "green-beans"]],
    optional: ["onion", "italian-seasoning", "paprika", "garlic-powder", "mustard"],
    steps: [
      "Turn the oven on to 425°F (220°C).",
      "Cut the potato into small cubes and the veggies into bite-size pieces. Slice the sausage into coins.",
      "Spread everything on a baking sheet. Drizzle with 2 spoonfuls of oil and sprinkle with salt, pepper, and any seasoning you have. Toss with your hands.",
      "Bake for 25 minutes, stirring once halfway, until the potatoes are soft and golden.",
      "Dip the sausage in mustard if you like."
    ],
    tip: "Only one pan to wash. If you have foil, line the pan first for zero cleanup."
  },
  {
    id: "lemon-salmon",
    name: "Lemony Salmon & Greens",
    emoji: "🐠",
    time: 20,
    difficulty: "Easy",
    moods: ["light"],
    ingredients: ["salmon", "lemon", ["green-beans", "broccoli", "zucchini"]],
    optional: ["garlic", "butter", "rice", "quinoa", "couscous"],
    steps: [
      "Turn the oven on to 400°F (200°C).",
      "Put the salmon skin-side down on a baking sheet. Arrange the veggies around it.",
      "Drizzle everything with oil, salt, and pepper. Lay a few lemon slices on the salmon.",
      "Bake 12–15 minutes, until the salmon flakes apart easily with a fork.",
      "Squeeze more lemon on top. Serve with rice or couscous if you have it."
    ]
  },
  {
    id: "chickpea-curry",
    name: "Coconut Chickpea Curry",
    emoji: "🍛",
    time: 25,
    difficulty: "Easy",
    moods: ["flavor", "comfort"],
    ingredients: ["chickpeas", "coconut-milk", "curry-powder", "onion"],
    optional: ["garlic", "ginger", "spinach", "canned-tomatoes", "rice", "pita", "cilantro"],
    steps: [
      "Chop the onion. Drain and rinse the chickpeas.",
      "Heat a spoonful of oil in a pot on medium (dial halfway). Cook the onion 4–5 minutes until soft. Add chopped garlic and ginger if you have them.",
      "Stir in 1–2 spoonfuls of curry powder and cook 30 seconds until it smells great.",
      "Add the chickpeas and the can of coconut milk (and canned tomatoes if you have them). Simmer 10 minutes.",
      "Stir in a handful of spinach at the end if you have it. Add salt to taste. Serve with rice or warm pita."
    ],
    tip: "Shake the coconut milk can before opening. It separates inside."
  },
  {
    id: "easy-chili",
    name: "One-Pot Chili",
    emoji: "🥣",
    time: 35,
    difficulty: "Easy",
    moods: ["comfort", "flavor"],
    ingredients: [ANY_GROUND_MEAT, "black-beans", "canned-tomatoes", "chili-powder"],
    optional: ["onion", "cumin", "corn", "bell-pepper", "jalapeno", "cheese", "sour-cream", "tortilla-chips", "green-onion"],
    steps: [
      "If you have an onion, chop it and cook in a big pot with a little oil on medium for 4 minutes.",
      "Add the ground meat and break it up with a spoon. Cook 7–8 minutes until no pink is left.",
      "Stir in 2 spoonfuls of chili powder (and a spoonful of cumin if you have it).",
      "Add the canned tomatoes and the drained beans (plus corn if you have it). Stir.",
      "Simmer on low with gentle bubbles for 15–20 minutes, stirring now and then. Taste and add salt.",
      "Top with cheese, sour cream, or crushed tortilla chips."
    ],
    tip: "Chili tastes even better the next day. Leftovers freeze well too."
  },
  {
    id: "sheet-pan-nachos",
    name: "Loaded Nachos",
    emoji: "🌽",
    time: 15,
    difficulty: "Very easy",
    moods: ["flavor", "comfort"],
    ingredients: ["tortilla-chips", ANY_CHEESE, ["black-beans", "ground-beef", "ground-turkey", "chicken"]],
    optional: ["salsa", "jalapeno", "sour-cream", "avocado", "green-onion", "corn", "cilantro"],
    steps: [
      "Turn the oven on to 400°F (200°C). (No oven? Use the microwave in 1-minute bursts.)",
      "If using ground meat or chicken, cook it first in a pan until no pink is left. Beans just need draining and rinsing.",
      "Spread chips on a baking sheet. Scatter beans or meat on top, then lots of cheese.",
      "Bake 5–7 minutes until the cheese is melted and bubbly.",
      "Add cold toppings like salsa, sour cream, and avocado after baking."
    ]
  },
  {
    id: "tofu-broccoli",
    name: "Crispy Tofu & Broccoli",
    emoji: "🥦",
    time: 25,
    difficulty: "Easy",
    moods: ["flavor", "light"],
    ingredients: ["tofu", ["broccoli", "frozen-veg", "bell-pepper"], "soy-sauce", "rice"],
    optional: ["garlic", "ginger", "sesame-oil", "honey", "green-onion", "hot-sauce"],
    steps: [
      "Start the rice following the package.",
      "Drain the tofu, wrap it in a clean towel, and press gently to squeeze out water. Cut into cubes.",
      "Heat 2 spoonfuls of oil in a pan on medium-high (dial about two-thirds). Add tofu in one layer and leave it alone for 3–4 minutes so it gets golden. Flip and repeat.",
      "Add the broccoli and a splash of water. Cover with a lid for 3 minutes to steam.",
      "Add 2 spoonfuls of soy sauce (plus honey and sesame oil if you have them). Stir 1 minute and serve over rice."
    ],
    tip: "Don't move the tofu too early. Patience is what makes it crispy."
  },
  {
    id: "pesto-pasta",
    name: "Pesto Pasta",
    emoji: "🌿",
    time: 15,
    difficulty: "Very easy",
    moods: ["comfort", "light"],
    ingredients: ["pasta", "pesto"],
    optional: ["tomato", "parmesan", "chicken", "spinach", "mozzarella", "lemon"],
    steps: [
      "Cook the pasta in salted boiling water for the time on the box.",
      "Before draining, scoop out a mug of the pasta water. Drain the pasta.",
      "Put the pasta back in the pot (heat off). Add 2–3 spoonfuls of pesto and a splash of pasta water.",
      "Stir until everything is coated. Top with parmesan, chopped tomato, or a squeeze of lemon."
    ]
  },
  {
    id: "caprese-toast",
    name: "Caprese Toast",
    emoji: "🍅",
    time: 10,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: ["bread", "tomato", "mozzarella"],
    optional: ["basil", "pesto", "vinegar", "avocado"],
    steps: [
      "Toast the bread.",
      "Slice the tomato and mozzarella into rounds.",
      "Layer them on the toast. Sprinkle with salt and pepper and drizzle with a little oil.",
      "Add basil leaves, a little pesto, or a few drops of vinegar if you have them."
    ]
  },
  {
    id: "greek-pita",
    name: "Greek-Style Pita",
    emoji: "🫓",
    time: 10,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: ["pita", "cucumber", "tomato", "feta"],
    optional: ["chickpeas", "chicken", "yogurt", "lemon", "lettuce", "onion"],
    steps: [
      "Warm the pita in a dry pan for 30 seconds per side (or 15 seconds in the microwave).",
      "Chop the cucumber and tomato into small pieces. Crumble the feta.",
      "If you have yogurt, mix a few spoonfuls with a squeeze of lemon and a pinch of salt for a quick sauce.",
      "Fill or top the pita with veggies, feta, and sauce. Add chickpeas or chicken for extra protein."
    ]
  },
  {
    id: "cozy-oatmeal",
    name: "Cozy Oatmeal Bowl",
    emoji: "🥣",
    time: 10,
    difficulty: "Very easy",
    moods: ["breakfast", "comfort"],
    ingredients: ["oats", "milk", ["banana", "berries", "apple"]],
    optional: ["honey", "maple-syrup", "cinnamon", "peanut-butter", "yogurt"],
    steps: [
      "Put half a cup of oats and 1 cup of milk in a microwave-safe bowl with a pinch of salt.",
      "Microwave 2 minutes, stir, then 30–60 seconds more until thick. (Or cook in a small pot on medium for 5 minutes, stirring.)",
      "Top with sliced banana, berries, or chopped apple.",
      "Add honey or maple syrup, a shake of cinnamon, or a spoonful of peanut butter."
    ],
    tip: "Use a big bowl. Oats bubble up in the microwave."
  },
  {
    id: "loaded-bagel",
    name: "Loaded Bagel",
    emoji: "🥯",
    time: 5,
    difficulty: "Very easy",
    moods: ["breakfast"],
    ingredients: ["bagel", "cream-cheese"],
    optional: ["eggs", "avocado", "tomato", "cucumber", "green-onion", "bacon"],
    steps: [
      "Slice the bagel in half and toast it.",
      "Spread a thick layer of cream cheese on both halves.",
      "Top with sliced tomato, cucumber, or avocado, and a pinch of salt and pepper.",
      "Want more? Add a fried egg or bacon."
    ]
  },
  {
    id: "french-toast",
    name: "French Toast",
    emoji: "🍞",
    time: 15,
    difficulty: "Easy",
    moods: ["breakfast", "comfort"],
    ingredients: ["bread", "eggs", "milk"],
    optional: ["cinnamon", "maple-syrup", "berries", "butter", "sugar", "banana"],
    steps: [
      "In a wide bowl, whisk 2 eggs, half a cup of milk, a pinch of salt, and a shake of cinnamon if you have it.",
      "Melt a little butter (or oil) in a pan on medium (dial halfway).",
      "Dip a slice of bread into the egg mix for a few seconds per side.",
      "Cook 2–3 minutes per side until golden brown.",
      "Top with maple syrup, berries, or sliced banana."
    ]
  },
  {
    id: "ham-cheese-melt",
    name: "Ham & Cheese Melt",
    emoji: "🥪",
    time: 10,
    difficulty: "Very easy",
    moods: ["comfort"],
    ingredients: ["bread", "deli-ham", ANY_CHEESE, "butter"],
    optional: ["mustard", "tomato", "eggs"],
    steps: [
      "Butter one side of each slice of bread. Spread mustard on the other side if you like.",
      "Build the sandwich with the buttered sides facing out: bread, cheese, ham, cheese, bread.",
      "Cook in a pan on medium-low for 3–4 minutes per side until golden and melty."
    ]
  },
  {
    id: "bbq-chicken-bowl",
    name: "BBQ Chicken Bowl",
    emoji: "🍗",
    time: 25,
    difficulty: "Easy",
    moods: ["flavor", "comfort"],
    ingredients: ["chicken", "bbq-sauce", ["rice", "quinoa"]],
    optional: ["corn", "black-beans", "cheese", "ranch", "lettuce", "avocado", "green-onion"],
    steps: [
      "Start the rice following the package.",
      "Cut the chicken into bite-size pieces and season with salt and pepper.",
      "Cook in a pan with a little oil on medium-high for 5–7 minutes until no pink is left inside.",
      "Turn the heat to low and stir in 3–4 spoonfuls of BBQ sauce until coated.",
      "Serve over rice with corn, beans, cheese, or a drizzle of ranch."
    ]
  },
  {
    id: "lentil-soup",
    name: "Hearty Lentil Soup",
    emoji: "🍲",
    time: 40,
    difficulty: "Easy",
    moods: ["comfort", "light"],
    ingredients: ["lentils", "broth", "onion", ["carrot", "celery"]],
    optional: ["garlic", "canned-tomatoes", "cumin", "spinach", "kale", "lemon"],
    steps: [
      "Chop the onion and carrots (and celery if you have it) into small pieces.",
      "Cook them in a pot with a spoonful of oil on medium for 5 minutes. Add garlic and a pinch of cumin if you have them.",
      "Rinse 1 cup of dry lentils and add them with 4 cups of broth (and canned tomatoes if you have them).",
      "Bring to a boil, then turn down to low and simmer 25 minutes until the lentils are soft.",
      "Stir in spinach or kale for the last 2 minutes. Add salt and a squeeze of lemon."
    ],
    tip: "Using canned lentils? Drain them and simmer just 10 minutes."
  },
  {
    id: "chicken-noodle-soup",
    name: "Quick Chicken Noodle Soup",
    emoji: "🍜",
    time: 35,
    difficulty: "Easy",
    moods: ["comfort"],
    ingredients: ["chicken", "broth", "pasta", ["carrot", "celery", "frozen-veg"]],
    optional: ["onion", "garlic", "italian-seasoning", "lemon"],
    steps: [
      "Chop the carrots, celery, and onion into small pieces. Cut the chicken into small bites.",
      "Cook the veggies in a pot with a spoonful of oil on medium for 5 minutes.",
      "Add 6 cups of broth and bring to a boil. Add the chicken and simmer 10 minutes.",
      "Add a big handful of small pasta and cook for the time on the box.",
      "Check that the chicken has no pink inside. Season with salt, pepper, and a squeeze of lemon."
    ]
  },
  {
    id: "couscous-bowl",
    name: "Lemony Grain Bowl",
    emoji: "🥙",
    time: 20,
    difficulty: "Very easy",
    moods: ["light"],
    ingredients: [["couscous", "quinoa"], "chickpeas", "lemon"],
    optional: ["cucumber", "tomato", "feta", "spinach", "bell-pepper", "parmesan"],
    steps: [
      "Couscous: pour 1 cup of boiling water over 1 cup of couscous, cover, wait 5 minutes, and fluff with a fork. Quinoa: cook following the package (about 15 minutes).",
      "Drain and rinse the chickpeas.",
      "Chop any veggies you have into small pieces.",
      "Mix everything in a bowl with the juice of half a lemon, 2 spoonfuls of oil, salt, and pepper.",
      "Crumble feta on top if you have it."
    ]
  },
  {
    id: "creamy-mushroom-pasta",
    name: "Creamy Mushroom Pasta",
    emoji: "🍄",
    time: 20,
    difficulty: "Easy",
    moods: ["comfort"],
    ingredients: ["pasta", "mushrooms", ["heavy-cream", "cream-cheese"]],
    optional: ["garlic", "parmesan", "spinach", "butter", "italian-seasoning"],
    steps: [
      "Cook the pasta in salted boiling water. Save a mug of pasta water, then drain.",
      "While it cooks, slice the mushrooms. Cook them in a pan with butter or oil on medium-high for 6–8 minutes until browned.",
      "Add chopped garlic for 1 minute, then turn the heat to low.",
      "Stir in half a cup of cream (or 3 big spoonfuls of cream cheese) and a splash of pasta water until smooth.",
      "Add the pasta and toss. Top with parmesan and pepper."
    ],
    tip: "Don't crowd the mushrooms. Give them space in the pan so they brown instead of steaming."
  },
  {
    id: "sweet-potato-tacos",
    name: "Sweet Potato & Black Bean Tacos",
    emoji: "🌮",
    time: 25,
    difficulty: "Easy",
    moods: ["flavor", "light"],
    ingredients: ["sweet-potato", "black-beans", "tortillas"],
    optional: ["cumin", "chili-powder", "avocado", "sour-cream", "cilantro", "lemon", "feta", "cabbage"],
    steps: [
      "Peel the sweet potato and cut it into small cubes.",
      "Cook in a pan with 2 spoonfuls of oil on medium for 12–15 minutes, stirring, until soft. Add salt and a pinch of chili powder or cumin if you have them.",
      "Drain and rinse the beans, add them to the pan, and warm 2 minutes.",
      "Warm the tortillas, fill them, and add avocado, sour cream, or shredded cabbage."
    ]
  },
  {
    id: "upgraded-ramen",
    name: "Upgraded Ramen",
    emoji: "🍥",
    time: 10,
    difficulty: "Very easy",
    moods: ["comfort", "flavor"],
    ingredients: ["ramen", "eggs"],
    optional: ["green-onion", "frozen-veg", "spinach", "mushrooms", "cabbage", "corn", "sesame-oil", "hot-sauce", "soy-sauce"],
    steps: [
      "Bring 2 cups of water to a boil in a small pot.",
      "Add the noodles and any veggies you have (spinach, corn, frozen veggies). Cook 2 minutes.",
      "Crack an egg right into the pot. Don't stir. Let it cook 1–2 minutes until the white is set.",
      "Turn off the heat and stir in half the flavor packet (or soy sauce).",
      "Top with green onion, a few drops of sesame oil, or hot sauce."
    ]
  },
  {
    id: "veggie-frittata",
    name: "Fridge-Clean-Out Frittata",
    emoji: "🥚",
    time: 20,
    difficulty: "Easy",
    moods: ["breakfast", "light"],
    ingredients: ["eggs", ["zucchini", "mushrooms", "spinach", "bell-pepper", "broccoli", "kale"], ["cheese", "feta", "parmesan", "mozzarella"]],
    optional: ["onion", "milk", "deli-ham", "bacon", "tomato"],
    steps: [
      "Whisk 4–6 eggs in a bowl with a splash of milk and a pinch of salt.",
      "Chop whatever veggies you have into small pieces. Cook them in an oven-safe pan with a little oil on medium for 5 minutes.",
      "Pour in the eggs and sprinkle cheese on top. Turn the heat to low and cook without stirring for 8–10 minutes until the edges are set.",
      "If the top is still runny, cover with a lid for 2–3 minutes (or put the pan under the oven broiler for 2 minutes).",
      "Slice like a pizza."
    ],
    tip: "Leftover slices make a great lunch the next day, cold or reheated."
  },
  {
    id: "sloppy-joes",
    name: "Sloppy Joes",
    emoji: "🍔",
    time: 20,
    difficulty: "Easy",
    moods: ["comfort"],
    ingredients: [ANY_GROUND_MEAT, "ketchup", "bread"],
    optional: ["onion", "bell-pepper", "mustard", "sugar", "cheese", "garlic-powder"],
    steps: [
      "If you have an onion or bell pepper, chop it and cook it in a pan with a little oil on medium for 3 minutes.",
      "Add the ground meat, break it up, and cook 7–8 minutes until no pink is left.",
      "Stir in half a cup of ketchup, a spoonful of mustard, and a pinch of sugar if you have them.",
      "Simmer on low for 5 minutes until thick.",
      "Pile onto toasted bread or buns."
    ]
  },
  {
    id: "crispy-chicken-tenders",
    name: "Crispy Chicken Tenders",
    emoji: "🍗",
    time: 25,
    difficulty: "Easy",
    moods: ["comfort"],
    ingredients: ["chicken", "breadcrumbs", "eggs"],
    optional: ["parmesan", "paprika", "garlic-powder", "honey", "mustard", "bbq-sauce", "ranch"],
    steps: [
      "Turn the oven on to 425°F (220°C). Lightly oil a baking sheet.",
      "Cut the chicken into strips. Season with salt (and paprika or garlic powder if you have them).",
      "Beat an egg in one bowl. Put the breadcrumbs (mixed with parmesan if you have it) in another.",
      "Dip each strip in egg, then press into the crumbs. Place on the baking sheet.",
      "Bake 15–18 minutes, flipping halfway, until golden and no pink is left inside.",
      "Dip in honey mustard (honey + mustard), BBQ sauce, or ranch."
    ]
  }
];

/* ------------------------------------------------------------------
   Prep and cook times (minutes), listed separately.
   "Prep" = washing, chopping, mixing. "Cook" = time on the heat / in the oven.
   The total (prep + cook) is what decides "Quick & easy" (15 min or less).
------------------------------------------------------------------- */
const TIMES = {
  "garlic-butter-pasta": [5, 10], "grilled-cheese": [2, 8], "tomato-pasta": [5, 15],
  "egg-fried-rice": [5, 10], "loaded-potato": [2, 13], "stovetop-mac": [5, 15],
  "potato-egg-hash": [8, 22], "veggie-soup": [10, 20], "pancakes": [10, 15],
  "chickpea-salad": [10, 0], "tuna-wrap": [10, 0], "egg-salad-bowl": [5, 10],
  "lemon-chicken-spinach": [10, 15], "black-bean-bowl": [5, 20], "spinach-omelette": [3, 7],
  "beef-tacos": [5, 15], "peanut-noodles": [3, 7], "chicken-stir-fry": [10, 15],
  "bean-quesadilla": [3, 7], "honey-garlic-chicken": [10, 15], "spicy-tuna-bowl": [5, 20],
  "avocado-toast": [3, 2], "scrambled-eggs-toast": [3, 7], "breakfast-tacos": [5, 10],
  "pb-banana-toast": [3, 2], "girl-dinner-plate": [5, 0], "fancy-mac-nuggets": [5, 15],
  "fries-aioli": [10, 25], "crunchy-slaw": [10, 0], "hummus-board": [5, 0],
  "chips-guac": [10, 0], "garlic-butter-shrimp": [5, 10], "sheet-pan-sausage": [10, 25],
  "lemon-salmon": [5, 15], "chickpea-curry": [10, 15], "easy-chili": [10, 25],
  "sheet-pan-nachos": [5, 10], "tofu-broccoli": [10, 15], "pesto-pasta": [3, 12],
  "caprese-toast": [5, 5], "greek-pita": [8, 2], "cozy-oatmeal": [3, 7],
  "loaded-bagel": [3, 2], "french-toast": [5, 10], "ham-cheese-melt": [3, 7],
  "bbq-chicken-bowl": [10, 15], "lentil-soup": [10, 30], "chicken-noodle-soup": [10, 25],
  "couscous-bowl": [10, 10], "creamy-mushroom-pasta": [5, 15], "sweet-potato-tacos": [10, 15],
  "upgraded-ramen": [2, 8], "veggie-frittata": [8, 12], "sloppy-joes": [5, 15],
  "crispy-chicken-tenders": [10, 15]
};

RECIPES.forEach(r => {
  const t = TIMES[r.id];
  if (t) { r.prep = t[0]; r.cook = t[1]; r.time = t[0] + t[1]; }
  else { r.prep = r.time; r.cook = 0; }
});

/* ------------------------------------------------------------------
   Beginner notes. If a recipe's steps mention one of these words,
   the recipe page explains what it means.
------------------------------------------------------------------- */
const KITCHEN_NOTES = [
  { term: "Medium-high heat", match: /medium-high|two-thirds/i,
    text: "Turn the dial about two-thirds of the way. The oil will look shimmery, and food should sizzle loudly as soon as it touches the pan." },
  { term: "Medium heat", match: /\bmedium(?![-\w])|dial halfway/i,
    text: "Turn the dial about halfway. A drop of water should sizzle gently, not jump and spit." },
  { term: "Low / medium-low heat", match: /\blow\b|medium-low|quarter/i,
    text: "A quarter to just under halfway. Use it for eggs, cheese and garlic, which burn easily. If it's spitting or browning fast, turn it down." },
  { term: "Boiling", match: /\bboil/i,
    text: "Big bubbles rolling across the whole surface that don't stop when you stir. Put a lid on to get there faster." },
  { term: "Simmering", match: /simmer/i,
    text: "Small, lazy bubbles around the edges. If it's bubbling hard, turn the heat down." },
  { term: "Chopping", match: /chop/i,
    text: "Cut into small pieces. \"Finely chopped\" = about the size of a grain of rice (garlic). \"Chopped\" = about the size of a pea or dice. Hold the food with your fingertips curled under, away from the knife." },
  { term: "Cubes & bite-size pieces", match: /cube|bite-size|dice/i,
    text: "Roughly 1–2 cm (half an inch), small enough to eat in one bite. Keeping pieces a similar size helps them cook evenly." },
  { term: "Slicing", match: /slice/i,
    text: "Cut into thin, flat pieces. Put the flat side down on the board first so the food doesn't roll." },
  { term: "Draining", match: /drain/i,
    text: "Pour into a colander or strainer in the sink. For a can, press the lid down and tip the liquid out." },
  { term: "Rinsing", match: /rinse/i,
    text: "Run cold water over it in a strainer for a few seconds. For canned beans this washes off the salty, starchy liquid." },
  { term: "Whisking", match: /whisk/i,
    text: "Beat quickly with a fork or whisk until it's one even color with no streaks." },
  { term: "Tossing", match: /toss/i,
    text: "Mix gently by lifting from the bottom so everything gets coated." },
  { term: "Preheating the oven", match: /oven on|°F/i,
    text: "Turn the oven on first. It takes about 10–15 minutes to heat up, and most ovens beep when they're ready." },
  { term: "Seasoning", match: /season|salt and pepper|pinch of salt/i,
    text: "Add a little salt and pepper, taste, and add more if it's bland. You can always add more but can't take it out." }
];

/* How to tell food is cooked, shown when a recipe uses these ingredients. */
const DONENESS = [
  { ids: ["chicken"], text: "Chicken: done when it's white all the way through with no pink and the juices are clear. Cut the thickest piece open to check (165°F / 74°C on a thermometer)." },
  { ids: ["ground-beef", "ground-turkey"], text: "Ground meat: done when no pink is left anywhere, usually 7–10 minutes. Break it into small crumbles so it cooks evenly." },
  { ids: ["sausage"], text: "Sausage: browned outside and no pink in the middle." },
  { ids: ["shrimp"], text: "Shrimp: pink all over and curled into a loose C. A tight O means overcooked." },
  { ids: ["salmon"], text: "Salmon: turns from shiny and see-through to solid pale pink, and flakes apart with a fork." },
  { ids: ["eggs"], text: "Eggs: set (no clear, runny white). Scrambled eggs are done when there's no liquid left but they still look soft." },
  { ids: ["pasta"], text: "Pasta: taste a piece a minute before the box time. It should be soft with a tiny bit of bite." },
  { ids: ["rice", "quinoa"], text: "Rice or quinoa: all the water is soaked up and the grains are tender. Leave the lid on for 5 minutes after." },
  { ids: ["potato", "sweet-potato"], text: "Potatoes: a fork slides in with no resistance." },
  { ids: ["tofu"], text: "Tofu: golden and slightly crispy on the outside (it's safe to eat even before that)." },
  { ids: ["lentils"], text: "Lentils: soft all the way through when you squish one against the side of the pot." }
];

/* ------------------------------------------------------------------
   "What can I substitute?" ideas for a missing ingredient.
   "use" is an ingredient id (so the app can say "you have this!"),
   "text" is a free-form idea. "how" explains how to use it.
------------------------------------------------------------------- */
const SUBSTITUTES = {
  "sour-cream": [{ use: "yogurt", how: "Same amount. Just as tangy." }, { use: "cream-cheese", how: "Stir in a splash of milk to loosen it." }],
  "yogurt": [{ use: "sour-cream", how: "Same amount." }],
  "heavy-cream": [{ use: "cream-cheese", how: "3 spoonfuls melted with a splash of pasta water or milk." }, { use: "milk", how: "Use milk plus a spoonful of butter. A little thinner, still good." }],
  "milk": [{ use: "yogurt", how: "Thin it with a little water." }, { text: "Water + a little extra butter", how: "Works in a pinch for mac & cheese or pancakes." }],
  "butter": [{ text: "Cooking oil", how: "Use a little less than the butter amount." }],
  "mayo": [{ use: "yogurt", how: "Greek yogurt plus a pinch of salt." }, { use: "sour-cream", how: "Same amount." }],
  "eggs": [{ use: "mayo", how: "For coating chicken: brush on a thin layer of mayo instead of egg." }],
  "breadcrumbs": [{ use: "crackers", how: "Crush them in a bag with a rolling pin or mug." }, { use: "tortilla-chips", how: "Crushed chips make a crunchy coating." }],
  "crackers": [{ use: "bread", how: "Toast it and cut into squares." }, { use: "pita", how: "Cut into triangles and toast." }, { use: "tortilla-chips", how: "Same idea, extra crunch." }],
  "pita": [{ use: "tortillas", how: "Warm it and wrap instead." }, { use: "bread", how: "Make it a sandwich." }],
  "tortillas": [{ use: "pita", how: "Fold it like a taco." }, { use: "bread", how: "Make it a sandwich or toast." }],
  "bread": [{ use: "bagel", how: "Slice and toast." }, { use: "tortillas", how: "Wrap it up instead." }, { use: "pita", how: "Warm and use the same way." }],
  "bagel": [{ use: "bread", how: "Thick toast works." }],
  "pasta": [{ use: "ramen", how: "Toss the flavor packet; use the noodles." }, { use: "rice", how: "Serve the sauce over rice." }, { use: "couscous", how: "Cooks in 5 minutes." }],
  "rice": [{ use: "quinoa", how: "Cook following the package." }, { use: "couscous", how: "Ready in 5 minutes." }, { use: "pasta", how: "Small shapes work best." }],
  "quinoa": [{ use: "rice", how: "Same amount." }, { use: "couscous", how: "Faster to cook." }],
  "couscous": [{ use: "quinoa", how: "Takes about 15 minutes." }, { use: "rice", how: "Takes about 20 minutes." }],
  "ramen": [{ use: "pasta", how: "Thin spaghetti is closest." }],
  "pasta-sauce": [{ use: "canned-tomatoes", how: "Simmer 10 minutes with garlic, salt and Italian seasoning." }, { use: "salsa", how: "Surprisingly good on pasta." }],
  "canned-tomatoes": [{ use: "pasta-sauce", how: "Same amount." }, { use: "salsa", how: "Adds a little kick." }],
  "salsa": [{ use: "canned-tomatoes", how: "Add salt and a squeeze of lime." }, { use: "tomato", how: "Chop with a little onion, salt and lime." }],
  "lemon": [{ use: "vinegar", how: "Use a small splash; it's stronger." }],
  "vinegar": [{ use: "lemon", how: "Squeeze of lemon or lime." }],
  "honey": [{ use: "maple-syrup", how: "Same amount." }, { use: "sugar", how: "A spoonful dissolved in a little water." }, { use: "jam", how: "Adds fruity sweetness." }],
  "maple-syrup": [{ use: "honey", how: "Same amount." }, { use: "jam", how: "Warm it so it drizzles." }],
  "sugar": [{ use: "honey", how: "Use a bit less." }, { use: "maple-syrup", how: "Use a bit less." }],
  "soy-sauce": [{ text: "Extra salt", how: "Plus a squeeze of lemon. Not the same, but it'll do." }],
  "hot-sauce": [{ use: "red-pepper-flakes", how: "A pinch at a time." }, { use: "chili-powder", how: "A small shake." }, { use: "salsa", how: "Milder kick." }],
  "bbq-sauce": [{ use: "ketchup", how: "Mix with a little honey and mustard." }],
  "ketchup": [{ use: "bbq-sauce", how: "Same amount, smokier." }, { use: "canned-tomatoes", how: "Simmer with a pinch of sugar until thick." }],
  "mustard": [{ use: "mayo", how: "Creamier, less tangy." }],
  "pesto": [{ use: "parmesan", how: "Toss pasta with oil, garlic, parmesan and basil if you have it." }],
  "ranch": [{ use: "sour-cream", how: "Mix with garlic powder, salt and pepper." }, { use: "yogurt", how: "Mix with garlic powder, salt and pepper." }],
  "parmesan": [{ use: "cheese", how: "Any shredded cheese works." }, { use: "feta", how: "Crumbled, salty and tangy." }],
  "feta": [{ use: "parmesan", how: "Use a little less." }, { use: "cheese", how: "Milder, still good." }],
  "mozzarella": [{ use: "cheese", how: "Any melty cheese." }],
  "cheese": [{ use: "mozzarella", how: "Same amount." }, { use: "parmesan", how: "Use less; it's strong." }],
  "cream-cheese": [{ use: "sour-cream", how: "Same amount." }, { use: "yogurt", how: "Thick Greek yogurt is best." }],
  "hummus": [{ use: "avocado", how: "Mash with lemon and salt." }, { use: "yogurt", how: "Add garlic powder and lemon for a dip." }],
  "avocado": [{ use: "hummus", how: "Spread on toast instead." }, { use: "cream-cheese", how: "Creamy on toast." }],
  "broth": [{ text: "Water + salt", how: "Add a spoonful of soy sauce or butter for flavor." }],
  "coconut-milk": [{ use: "heavy-cream", how: "Same amount." }, { use: "yogurt", how: "Stir in at the end on low heat so it doesn't split." }],
  "curry-powder": [{ use: "cumin", how: "Mix with a little chili powder and paprika." }],
  "chili-powder": [{ use: "cumin", how: "Mix with paprika." }, { use: "red-pepper-flakes", how: "A pinch for heat." }],
  "cumin": [{ use: "chili-powder", how: "Same amount." }, { use: "paprika", how: "Same amount." }],
  "garlic": [{ use: "garlic-powder", how: "About ¼ teaspoon per clove." }],
  "onion": [{ use: "green-onion", how: "Use 3–4 stalks." }, { text: "Skip it", how: "The dish will still work." }],
  "green-onion": [{ use: "onion", how: "A little finely chopped onion." }],
  "spinach": [{ use: "kale", how: "Remove the stems and chop small." }, { use: "frozen-veg", how: "A handful works." }],
  "kale": [{ use: "spinach", how: "Cooks faster." }],
  "lettuce": [{ use: "spinach", how: "Same amount." }, { use: "cabbage", how: "Slice thinly." }],
  "cabbage": [{ use: "lettuce", how: "Shred it." }],
  "cucumber": [{ use: "bell-pepper", how: "Same crunch." }, { use: "celery", how: "Slice thinly." }],
  "tomato": [{ use: "bell-pepper", how: "Adds color and crunch." }],
  "bell-pepper": [{ use: "zucchini", how: "Same size pieces." }, { use: "frozen-veg", how: "A handful." }],
  "broccoli": [{ use: "frozen-veg", how: "Same amount." }, { use: "green-beans", how: "Same cooking time." }],
  "zucchini": [{ use: "bell-pepper", how: "Same size pieces." }, { use: "mushrooms", how: "Slice them." }],
  "mushrooms": [{ use: "zucchini", how: "Same size pieces." }],
  "frozen-veg": [{ use: "peas", how: "Same amount." }, { use: "corn", how: "Same amount." }, { use: "broccoli", how: "Chop small." }],
  "carrot": [{ use: "celery", how: "Same amount." }, { use: "frozen-veg", how: "A handful." }],
  "celery": [{ use: "carrot", how: "Same amount." }],
  "potato": [{ use: "sweet-potato", how: "Same size pieces." }],
  "sweet-potato": [{ use: "potato", how: "Same size pieces." }],
  "chicken": [{ use: "tofu", how: "Press, cube and brown it first." }, { use: "shrimp", how: "Cooks in about 4 minutes." }],
  "ground-beef": [{ use: "ground-turkey", how: "Same amount." }, { use: "sausage", how: "Remove the casing and crumble it." }],
  "ground-turkey": [{ use: "ground-beef", how: "Same amount." }],
  "sausage": [{ use: "ground-beef", how: "Add paprika and Italian seasoning." }],
  "shrimp": [{ use: "chicken", how: "Small pieces, cook until no pink." }],
  "salmon": [{ use: "chicken", how: "Cook until no pink inside." }],
  "tofu": [{ use: "chickpeas", how: "Drain, rinse and pan-fry until golden." }],
  "black-beans": [{ use: "chickpeas", how: "Same amount." }, { use: "lentils", how: "Canned lentils work well." }],
  "chickpeas": [{ use: "black-beans", how: "Same amount." }],
  "lentils": [{ use: "black-beans", how: "Use canned; cook just 10 minutes." }, { use: "chickpeas", how: "Same amount." }],
  "tuna": [{ use: "chicken", how: "Cooked and shredded." }, { use: "chickpeas", how: "Mash with a fork." }],
  "nuggets": [{ use: "chicken", how: "Make the crispy chicken tenders instead." }],
  "deli-ham": [{ use: "bacon", how: "Cook it first." }],
  "tortilla-chips": [{ use: "crackers", how: "Same idea." }],
  "banana": [{ use: "berries", how: "Same amount." }, { use: "apple", how: "Sliced thin." }],
  "berries": [{ use: "banana", how: "Sliced." }, { use: "jam", how: "A spoonful." }],
  "apple": [{ use: "banana", how: "Sliced." }],
  "baking-powder": [{ text: "Skip it", how: "Pancakes come out flat, like crêpes. Still delicious." }],
  "peanut-butter": [{ text: "Any nut butter", how: "Same amount." }]
};
