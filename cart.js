fetch('data.json')
  .then(res => res.json())
  .then(data => {
    let cart = JSON.parse(localStorage.getItem('gioHang') || '[]');
    let itemsHTML = '', total = 0;
    cart.forEach(item => {
      const sp = data.find(x => x.id === item.id);
      const price = sp.gia * item.sl;
      total += price;
      itemsHTML += `
        <div class="col-md-4">
          <div class="card mb-3">
            <img src="${sp.hinh}" class="card-img-top">
            <div class="card-body">
              <h5>${sp.ten}</h5>
              <p>Số lượng: ${item.sl}</p>
              <p>Thành tiền: ${price.toLocaleString()}đ</p>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById('cart-items').innerHTML = itemsHTML;
    document.getElementById('cart-total').innerText = 'Tổng tiền: ' + total.toLocaleString() + 'đ';
  });
