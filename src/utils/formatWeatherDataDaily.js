const formatWeatherDataDaily = (data) => {
  const dataDaily = [];

  const dataEntries = Object.keys(data);

  dataEntries.forEach((key, keyIndex) => {
    for (let i = 0; i < data[key].length; i++) {
      if (keyIndex === 0) {
        dataDaily.push({});
      }
      const dayValue = data[key][i];
      dataDaily[i][key] = dayValue;
    }
  });
  console.log(dataDaily);
};

export default formatWeatherDataDaily;
