export interface TableContent {
  z: string;
  items: Array<Item[]>;
}

export interface Item {
  [key: string]: number | string | null;
}

export const tableContent: TableContent[] = [
  {
    z: 'Kowal',
    items: [
      [
        {
          health: 'healthy',
          firstName: 'Miłosz',
          job: 'Kowal',
          result: 1992,
        },
        {
          health: 'healthy',
          firstName: 'Mariusz',
          job: 'Kowal',
          result: 1992,
        },
        {
          health: 'healthy',
          firstName: 'Manal',
          job: 'Kowal',
          result: null,
        },
        {
          health: 'healthy',
          firstName: 'Wariat',
          job: 'Kowal',
          result: 1992,
        },
      ],
      [
        {
          health: 'unhealthy',
          firstName: 'Miłosz',
          job: 'Kowal',
          result: null,
        },
        {
          health: 'unhealthy',
          firstName: 'Mariusz',
          job: 'Kowal',
          result: 1992,
        },
        {
          health: 'unhealthy',
          firstName: 'Manal',
          job: 'Kowal',
          result: 1997.3333333333333,
        },
        {
          health: 'unhealthy',
          firstName: 'Wariat',
          job: 'Kowal',
          result: null,
        },
      ],
    ],
  },
  {
    z: 'Niekowal',
    items: [
      [
        {
          health: 'healthy',
          firstName: 'Miłosz',
          job: 'Niekowal',
          result: null,
        },
        {
          health: 'healthy',
          firstName: 'Mariusz',
          job: 'Niekowal',
          result: null,
        },
        {
          health: 'healthy',
          firstName: 'Manal',
          job: 'Niekowal',
          result: null,
        },
        {
          health: 'healthy',
          firstName: 'Wariat',
          job: 'Niekowal',
          result: 1992,
        },
      ],
      [
        {
          health: 'unhealthy',
          firstName: 'Miłosz',
          job: 'Niekowal',
          result: null,
        },
        {
          health: 'unhealthy',
          firstName: 'Mariusz',
          job: 'Niekowal',
          result: null,
        },
        {
          health: 'unhealthy',
          firstName: 'Manal',
          job: 'Niekowal',
          result: null,
        },
        {
          health: 'unhealthy',
          firstName: 'Wariat',
          job: 'Niekowal',
          result: null,
        },
      ],
    ],
  },
];
