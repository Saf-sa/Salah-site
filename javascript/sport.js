// Ce fichier est inclus dans le fichier sport.html

window.addEventListener('DOMContentLoaded', () => {
  const columnElements = document.querySelectorAll('.column');
  const images = generateRandomImages(18, 1, 54); // Génère un tableau de nombres aléatoires pour les images

  // Met à jour les sources des images dans les colonnes avec les images aléatoires
  columnElements.forEach((column, index) => {
    const image = column.querySelector('img');
    const imageNumber = images[index];
    const imagePath = `./photo/sports/${padImageNumber(imageNumber)}.jpg`;
    image.src = imagePath;
  });
});

// Fonction pour générer un tableau de nombres aléatoires dans une plage donnée
function generateRandomImages(count, min, max) {
  const randomNumbers = _.sampleSize(_.range(min, max + 1), count);
  return randomNumbers;
}

// Fonction pour ajouter des zéros devant le nombre de l'image
function padImageNumber(number) {
  return number.toString().padStart(3, '0');
}
