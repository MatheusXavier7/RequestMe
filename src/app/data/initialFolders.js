export const collectionsData = [
  {
    id: 'coll-1',
    name: 'About Me',
    expanded: true,
    requests: [
      {
        id: 'req-1',
        name: 'Sobre mim',
        method: 'GET',
        url: '/about'
      }
    ]
  },{
    id: 'coll-2',
    name: 'Projects',
    expanded: true,
    requests: [
     {
        id: 'req-2',
        name: 'Meus projetos',
        method: 'GET',
        url: '/projects'
      }
    ]
  },{
    id: 'coll-3',
    name: 'Contact',
    expanded: true,
    requests: [
      {
        id: 'req-3',
        name: 'Contato / Feedback',
        method: 'POST',
        url: '/contato'
      }
    ]
  },{
    id: 'coll-3',
    name: 'Contact',
    expanded: true,
    requests: [
      {
        id: 'req-4',
        name: 'Currículo (PDF)',
        method: 'GET',
        url: '/assets/cv-xavier.pdf'
      }
    ]
  }
];