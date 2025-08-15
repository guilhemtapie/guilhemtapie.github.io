  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const coursesToggle = document.getElementById('coursesToggle');
  const eventsToggle = document.getElementById('eventsToggle');
  const calculatorsToggle = document.getElementById('calculatorsToggle'); // New line
  const coursesMenu = document.getElementById('coursesMenu');
  const eventsMenu = document.getElementById('eventsMenu');
  const calculatorsMenu = document.getElementById('calculatorsMenu'); // New line

  // Toggle sidebar open/close
  menuToggle.addEventListener('click', (e) => {
    sidebar.classList.toggle('open');
    e.stopPropagation(); // prevent click from bubbling up
  });

  // Close sidebar when clicking outside of it
  document.addEventListener('click', (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);

    if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  });

  // Close sidebar on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  });

  // Expand/collapse submenu
  coursesToggle.addEventListener('click', () => {
    coursesToggle.classList.toggle('active');
    coursesMenu.style.display = coursesMenu.style.display === 'block' ? 'none' : 'block';
  });

  eventsToggle.addEventListener('click', () => {
    eventsToggle.classList.toggle('active');
    eventsMenu.style.display = eventsMenu.style.display === 'block' ? 'none' : 'block';
  });
  
  calculatorsToggle.addEventListener('click', () => { // New function
    calculatorsToggle.classList.toggle('active');
    calculatorsMenu.style.display = calculatorsMenu.style.display === 'block' ? 'none' : 'block';
  });