function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '18rem';
    
    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = cardData.imageUrl;
    image.alt = 'Card image cap';
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = cardData.text;
    
    cardBody.appendChild(cardText);
    card.appendChild(image);
    card.appendChild(cardBody);
    
    return card;
  }
  
  const cardsData = [
    {
      imageUrl: '../Admin/spaces.jpg',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
    },
    {
      imageUrl: '../Admin/spaces.jpg',
      text: 'Another example card with different content.'
    },
    {
        imageUrl: '../Admin/spaces.jpg',
        text: 'Another example card with different content.'
      },
      {
        imageUrl: '../Admin/spaces.jpg',
        text: 'Another example card with different content.'
      },
      {
        imageUrl: '../Admin/spaces.jpg',
        text: 'Another example card with different content.'
      },
 
  ];

  function renderCards() {
    const cardContainer = document.getElementById('cardContainer');
    
    cardsData.forEach(cardData => {
      const card = createCard(cardData);
      cardContainer.appendChild(card);
    });
  }
  
  renderCards();
  