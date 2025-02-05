

  function errorSwal(text='Algo não correu bem aqui') {
      Swal.fire({
        background:'#DC5A84',
        titleText: 'Erro!!!!',
        icon: 'error',
        showConfirmButton:false,
        text: text,
        toast:true,
        position:'top-end',
        timer:5000,
        timerProgressBar:true
      }
    );
}


function successSwal(text='Efectuado com sucesso') {
      Swal.fire({
        background:'#0d0d0d',
        icon: 'success',
        text: text,
        toast:true,
        position:'top-end',
        timer:3000,
        showConfirmButton:false,
        timerProgressBar:true
      }
    );
}


function ansycronousDelete(route) {

  Swal.fire({
  title: "Deseja mesmo prosseguir?",
  text: "Esta acção é irreversível",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Prosseguir'
}).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      type: 'GET',
      url : location.origin+"/"+route,
      data: {
        _token: "<?php echo csrf_token() ?>",
      },
      success: function(data){
        console.log(data);
        successSwal();
      },
      error: function(data){
        console.log(data);
        errorSwal();
      }
    });

  }
});
}
