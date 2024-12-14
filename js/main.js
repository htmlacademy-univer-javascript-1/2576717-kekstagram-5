const DESCRIPTIONS = [
  'Мое утро',
  'Мой прекрасный день',
  'За чашечкой кофе',
  'А кто не любит котяток?',
  'Цитатки ВК',
  'Анекдот дня, ахахах',
  'Мой вечер',
  'А чем занимаететсь вы?',
  'Я на отдыхе',
  'С друзьями',
  'Атмосферно',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Васютка',
  'Анютка',
  'Катя',
  'Ольга',
  'Валера',
  'Даня',
  'Дима',
  'Андрюша',
  'Никитос',
  'Маришка',
  'Лена',
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createUniqueIDGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => {
  const randomAvatarID = getRandomInteger(1, 6);
  return {
    id: getRandomInteger(1, 10000),
    avatar: `img/avatar-${randomAvatarID}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoDescription = (() => {
  const generatePhotoID = createUniqueIDGenerator(1, 25);
  const randomUrlID = createUniqueIDGenerator(1, 25);

  return () => {
    const randomPhotoID = generatePhotoID();
    return {
      id: randomPhotoID,
      url: `photos/${randomUrlID}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
    };
  };
});

const generatePhotos = () => Array.from({ length: 25 }, createPhotoDescription);
