const files = [
    'document1.txt', 'presentation1.pdf', 'song1.mp3', 'installer1.exe', 'archive1.rar',
    'report1.docx', 'image1.jpg', 'graphic1.png', 'animation1.gif', 'compressed1.zip',
    'document2.txt', 'presentation2.pdf', 'song2.mp3', 'installer2.exe', 'archive2.rar',
    'report2.docx', 'image2.jpg', 'graphic2.png', 'animation2.gif', 'compressed2.zip',
    null, 'presentation3.pdf', '', 'installer3.exe', 'archive3.rar',
    'report3.docx', 'image3.jpg', 'graphic3.png', 'animation3.gif', 'compressed3.zip',
    'document4.txt', 'presentation4.pdf', 'song4.mp3', 'installer4.exe', 'archive4.rar',
    'report4.docx', 'image4.jpg', 'graphic4.png', 'animation4.gif', 'compressed4.zip',
    'document5.txt', 'presentation5.pdf', 'song5.mp3', 'installer5.exe', 'archive5.rar',
    'report5.docx', 'image5.jpg', 'graphic5.png', 'animation5.gif', 'compressed5.zip',
    'document6.txt', 'presentation6.pdf', 'song6.mp3', 'installer6.exe', 'archive6.rar',
    'report6.docx', 'image6.jpg', null, 'animation6.gif', 'compressed6.zip',
    'document7.txt', 'presentation7.pdf', 'song7.mp3', 'installer7.exe', 'archive7.rar',
    'report7.docx', 'image7.jpg', 'graphic7.png', 'animation7.gif', 'compressed7.zip',
    'document8.txt', 'presentation8.pdf', 'song8.mp3', 'installer8.exe', 'archive8.rar',
    'report8.docx', 'image8.jpg', '', 'animation8.gif', 'compressed8.zip',
    'document9.txt', 'presentation9.pdf', 'song9.mp3', 'installer9.exe', 'archive9.rar',
    'report9.docx', 'image9.jpg', '', 'animation9.gif', 'compressed9.zip',
    'document10.txt', 'presentation10.pdf', 'song10.mp3', 'installer10.exe', 'archive10.rar',
    'report10.docx', 'image10.jpg', 'graphic10.png', 'animation10.gif', 'compressed10.zip',
  ];
  const processedFiles = files.map((file,index)=>{
      const [name,ext]=file.split('.');
      return{
          id:index+1,
          name: name,
          type:ext||'unknown'
      };
  });
  const categorizeFiles = (files)=>{
      return files.reduce((acc,file)=>{
          if (!acc[file.type]){
              acc[file.type]=[];
          }
          acc[file.type].push(file);
          return acc;
      },{});
  };
  const fileCategories = categorizeFiles(processedFiles);
  const foldersContainer = document.getElementById('folders');
  const fileListContainer = document.getElementById('file-list');
  const searchInput = document.getElementById('search');
  const sortButton = document.getElementById('sort');
  
  let currentType = null;
  let sortAscending = true;
  
  Object.keys(fileCategories).forEach(type=>{
      const folder = document.createElement('div');
      folder.classList.add('folder');
      folder.textContent = '${type.toUpperCase()} Files';
      folder.addEventListener('click',()=>displayFiles(type));
      foldersContainer.appendChild(folder);
  });
  
  const displayFiles = (type)=>{
      currentType = type;
      fileListContainer.innerHTML='';
      const files = fileCategories[type];
      const ul = document.createElement('ul');
      files.forEach(file=>{
          const li = document.createElement('li');
          li.textContent = '${file.name}.${file.type}';
          ul.appendChild(li);
      });
      fileListContainer.appendChild(ul);
  };
  const sortFiles = () =>{
      if (!currentType) return;
      const files = fileCategories[currentType].sort((a,b)=>{
          return sortAscending? a.name.localeCompare(b.name):b.name.localeCompare(a.name);
      });
      sortAscending = !sortAscending;
      sortButton.textContent = sortAscending?'Sort Ascending':'Sort Descending';
      displayFiles(currentType);
  };
  searchInput.addEventListener('input',()=>{
      searchFiles(searchInput.value);
  });
  sortButton.addEventListener('click',()=>{
      sortFiles();
  });