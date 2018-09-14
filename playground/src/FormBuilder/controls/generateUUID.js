const alreadyGenerated = [];

const generateUUID = (props) => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  const result = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  return (alreadyGenerated.includes(result)) ? generateUUID(props) : result;
}

export default generateUUID;