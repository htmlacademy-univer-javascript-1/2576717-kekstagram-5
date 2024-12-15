import {DESCRIPTIONS, MESSAGE, NAMES} from './data.js';

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

export {generatePhotos};
