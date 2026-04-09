// data/adventures.ts
export const ADVENTURE_DATA = [
  {
    id: 'water',
    title: 'Water',
    icon: 'water-outline',
    subCategories: [
      {
        id: 'rafting',
        title: 'River Rafting',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        rating: '5.0',
      },
      {
        id: 'kayaking',
        title: 'Kayaking',
        image:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        rating: '4.8',
      },
    ],
  },
  {
    id: 'air',
    title: 'Air',
    icon: 'airplane-outline',
    subCategories: [
      {
        id: 'paragliding',
        title: 'Paragliding',
        image:
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        rating: '5.0',
      },
    ],
  },
  {
    id: 'land',
    title: 'Land',
    icon: 'trail-sign-outline',
    subCategories: [],
  },
];
