export default function RandomWaveformSymbol() {
// Generate a random string with a given length
  const getRandomString = (length) => {
    const characters = '|||...||...|'; // Input characters
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  // Generate a new random string every time the component is rendered
  const randomWaveformSymbol = getRandomString(12);

  return (
    <div>
      <p className='text-sm text-white'>{randomWaveformSymbol}</p>
    </div>
  );
}
