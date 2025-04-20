// Primitives

let age: number = 24;

age = 12;

let useName: string;

useName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// Arrays, Objects

let hobbies: string[];

hobbies = ['스포츠', '요리'];

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: 'Max',
  age: 32
};

// person = {
//   isEmployee: true
// };

let people: Person[];

// 타입 추론

let course: string | number = '리엑트 강의';

course = 12341;

// 함수 & 타입

const add = (a: number, b: number) => {
  return a + b;
};

const printOutput = (value: any) => {
  console.log(value);
};

// 제네릭

const insertAtBeginning = <T>(array: T[], value: T) => {
  const newArray = [value, ...array];
  return newArray;
};

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

// updatedArray[0].split('');
