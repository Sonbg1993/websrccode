const params = new URLSearchParams(location.search);
const keyword = params.get('q')?.toLowerCase() || '';

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const results = data.filter(sp =>
      sp.ten.toLowerCase().includes(keyword) ||
      sp.mo_ta.toLowerCase().includes(keyword)
    );

    const container = document.getElementById('search-results');
    if (results.length === 0) {
      container.innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
      return;
    }

    results.forEach(sp => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${sp.hinh}" class="card-img-top" alt="${sp.ten}">
          <div class="card-body">
            <h5 class="card-title">${sp.ten}</h5>
            <p class="card-text">${sp.mo_ta}</p>
            <p class="text-danger fw-bold">${sp.gia.toLocaleString()}đ</p>
            <a href="detail.html?id=${sp.id}" class="btn btn-sm btn-outline-primary">Xem chi tiết</a>
          </div>
        </div>`;
      container.appendChild(col);
    });
  });
