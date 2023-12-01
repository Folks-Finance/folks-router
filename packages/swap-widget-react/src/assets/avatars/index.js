function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => {
      images.push(r(item));
    });
    return images;
  }
  
  const avatars = importAll(require.context("./", false, /\.(png|jpe?g|svg)$/));
  
  export default avatars;
  