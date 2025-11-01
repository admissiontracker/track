fetch('data/universities.json')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById('uniTable');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    function renderTable(filteredData) {
      table.innerHTML = '';
      filteredData.forEach(u => {
        const badgeColor = u.category === 'Engr' ? 'bg-blue-100 text-blue-700' :
          u.category === 'Med' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
        table.innerHTML += `
          <tr class='hover:bg-gray-50 transition'>
            <td class='py-3 px-4 border-b'><a href='${u.page}' class='text-blue-600 hover:underline'>${u.name}</a></td>
            <td class='py-3 px-4 border-b'><span class='px-2 py-1 rounded text-sm ${badgeColor}'>${u.category}</span></td>
            <td class='py-3 px-4 border-b'>${u.apply_start}</td>
            <td class='py-3 px-4 border-b'>${u.apply_end}</td>
            <td class='py-3 px-4 border-b'>${u.exam_date}</td>
            <td class='py-3 px-4 border-b'>${u.fee}</td>
            <td class='py-3 px-4 border-b'>${u.gpa}</td>
          </tr>`;
      });
    }

    function applyFilters() {
      let filtered = [...data];
      const q = searchInput.value.toLowerCase();
      if (q) {
        filtered = filtered.filter(u =>
          u.name.toLowerCase().includes(q) || u.category.toLowerCase().includes(q)
        );
      }
      const sort = sortSelect.value;
      if (sort) {
        filtered.sort((a, b) => new Date(a[sort]) - new Date(b[sort]));
      }
      renderTable(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    renderTable(data);
  });