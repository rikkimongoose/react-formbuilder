const regexTag = /<[^>]*>/g;

const removeTags = (str) => str.replace(regexTag, "");

export default removeTags;