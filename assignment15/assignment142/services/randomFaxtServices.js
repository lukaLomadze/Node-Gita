export const fetchRandomFact = () => {
  const facts = [
  "Python was named after Monty Python, not the snake.",
  "Java was originally called Oak.",
  "C evolved from a language called B.",
  "'Hello, World!' came from Brian Kernighan’s B tutorial.",
  "Assembly is the closest readable form to machine code.",
  "JavaScript was created in 10 days by Brendan Eich.",
  "C++ was first called 'C with Classes'.",
  "PHP originally meant 'Personal Home Page'.",
  "The first video game (Spacewar!) was in Assembly.",
  "HTML is a markup, not a programming language.",
  "LISP (1958) is the second-oldest language still used.",
  "Swift replaced Objective-C at Apple in 2014.",
  "Go (Golang) compiles extremely fast.",
  "Rust is famous for memory safety and popularity.",
  "Brainfuck uses only eight commands, by design."
];


  const randomIndex = Math.floor(Math.random() * facts.length);
  return facts[randomIndex];
};
