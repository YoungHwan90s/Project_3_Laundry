// 모달 알림창
function customAlert(text, confirmCallback) {
  $('#alertText').text(text);
  $('#alertModal').modal('show');
  if (confirmCallback) {
    $('#alertModal .btn-confirm').click(confirmCallback);
  }
}

// 로그아웃
function signOut() {
  localStorage.clear();
  window.location.href = '/';
}

// 사장용 로그인 미들웨어
function getSelf(callback) {
  $.ajax({
    type: 'GET',
    url: 'api/log/owners/me',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    success: function (response) {
      callback(response.owner);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert('로그인이 필요합니다.');
      } else {
        localStorage.clear();
        alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
      }
      window.location.href = '/';
    },
  });
}
