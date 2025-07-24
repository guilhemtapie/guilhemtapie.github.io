function initializeFiltering() {
	const filterRadios = document.querySelectorAll('input[name="proofFilter"]');
    const allRows = document.querySelectorAll('tbody tr[data-proof]');
    const statsDiv = document.getElementById('stats');
    
    function updateStats(visibleCount, totalCount) {
      const filter = document.querySelector('input[name="proofFilter"]:checked').value;
      let filterText = '';
      
      switch(filter) {
        case 'all-record':
          filterText = 'all records';
          break;
        case 'verified-record':
          filterText = 'verified records only';
          break;
        case 'photo':
          filterText = 'photo proof only';
          break;
        case 'video':
          filterText = 'video proof only';
          break;
        case 'livestream':
          filterText = 'livestream proof only';
          break;
      }
      
      statsDiv.textContent = `Showing ${visibleCount} of ${totalCount} records (${filterText})`;
    }
    
    function filterRecords() {
      const selectedFilter = document.querySelector('input[name="proofFilter"]:checked').value;
      let visibleCount = 0;
      
      allRows.forEach(row => {
        const proofType = row.dataset.proof;
        let shouldShow = false;
        
        switch(selectedFilter) {
          case 'all-record':
            shouldShow = true;
            break;
          case 'verified-record':
            shouldShow = proofType === 'video' || proofType === 'livestream' || proofType === 'photo';
            break;
          case 'photo':
            shouldShow = proofType === 'photo';
            break;
          case 'video':
            shouldShow = proofType === 'video';
            break;
          case 'livestream':
            shouldShow = proofType === 'livestream';
            break;
        }
        
        if (shouldShow) {
          row.classList.remove('hidden');
          visibleCount++;
        } else {
          row.classList.add('hidden');
        }
      });
      
      updateStats(visibleCount, allRows.length);
    }
    
    filterRadios.forEach(radio => {
      radio.addEventListener('change', filterRecords);
    });
    filterRecords();
}
document.addEventListener('DOMContentLoaded', initializeFiltering);
