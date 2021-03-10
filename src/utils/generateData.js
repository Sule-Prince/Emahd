export const randomNames = (noOfNames) => {
  const names = [];
  const randomNames = [
    "Sule",
    "Mathias",
    "Prince",
    "David",
    "James",
    "Bunmi",
    "Samuel",
    "Mark",
    "Bob",
    "Jonathan",
    "Philip",
    "Divine",
    "Bill",
    "Gates",
    "Jane",
    "Eva",
    "Valerie",
    "Kiara",
    "Kate",
    "Chioma",
    "Israel",
  ];

  const length = randomNames.length - 1;

  for (let i = 0; i <= noOfNames; i++) {
    let surname = randomNames[Math.round(Math.random() * length)];
    let firstname = randomNames[Math.round(Math.random() * length)];
    let name = `${surname} ${firstname}`;
    names.push(name);
  }

  return names;
};

export const randomMsgs = (noOfmsgs) => {
  const messages = [];

  const randomMsgs = [
    "I am great.",
    "Inside Chi's nursery.",
    "Why my hair pink?",
    "Feeling blue.",
    "I love my mom.",
    "I don’t really do wigs.",
    "Wait the thought of going back.",
    "Live on instagram!",
    "On my way the the event.",
    "The sweetest, best baby.",
    "Fashion Week is so much fun.",
    "Congressman Schiff omitted and distorted key facts.",
    "I am a good man.",
    "compsent is an incompetent moron.",
    "Unemployment claims are at the lowest level since 1973.",
    "So true Wayne, and Lowest black unemployment in history!",
    "After years of rebuilding OTHER nations.",
    "In the morning during my walk.",
    "Although she had forgotten about his birthday.",
    "When I was five, I survived a car crash.",
    "The meaning of life.",
    "Meanwhile, at the ranch.",
    "She ran so far away.",
    "Walking the dog in high heels, she almost fell down.",
    "I am happy that you are happy.",
    "Jeff saved the world and the United States of America.",
    "Running to the store.",
    "To want something to eat.",
    "Even though you are right most of the time.",
    "The dog ate my homework.",
    "Because you wanted to go.",
    "It was $3.23 for the hamburger.",
  ];

  const length = randomMsgs.length - 1;

  for (let i = 0; i <= noOfmsgs; i++) {
    const msg = randomMsgs[Math.round(Math.random() * length)];
    messages.push(msg);
  }

  return messages;
};
