function saveBlob(blob, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};


function bootstrapTableFactory(table,toollbar,cols){
  let $table = $('#'+table)

  $(function() {
    $('#'+toollbar).find('select').change(function () {
      $table.bootstrapTable('destroy').bootstrapTable({
        exportDataType: $(this).val(),
        exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
        columns: cols
      })
    }).trigger('change')
  })
}


function nonPostAjax(callback,method,route,header=null) {
  $.ajax({
    type:method,
    headers: header,
    url: route,
    success:function(data,status) {
      callback(data,status);
    },
    error:function(data, status, error) {
      callback(data,status);
    }
  });
}

function postAjax(callback,rawForm,route){
  let mForm = new FormData(rawForm);
  $.ajax({
    type:"post",
    url:location.origin+'/api/'+route,
    data:mForm,
    processData: false,
    contentType: false,
    success:function(data) {
      console.log(data);
      callback(data);
    },
    error:function(data) {
      console.log(data);
      errorSwal('Ocorreu um erro');
    }
  });
}
function formDatapostAjax(callback,formData,route,header=null){
  $.ajax({
    type: "post",
    url: route,
    data: formData,
    headers: header,
    processData: false,
    contentType: false,
    success:function(data,status) {
      callback(data,status);
    },
    error:function(data, status) {
      callback(data,status);
      //errorSwal('Ocorreu um erro na execução da acção');
    }
  });
}

function ajaxResponse(data){
  if(data.status==false) notyf.error(data.msg);
  else {
    notyf.success(data.msg);
    return data.msg;
  }
  return null;
}

function removeModalToggler(node){
  node.removeAttribute("data-bs-toggle");
  node.removeAttribute("data-bs-target");
}
function addModalToggler(node,modalId){
  node.setAttribute("data-bs-toggle","modal");
  node.setAttribute("data-bs-target","#"+modalId);
}

function removeCollapseToggler(node){
  node.removeAttribute("data-bs-collapse");
  node.removeAttribute("data-bs-target");
}

function addCollapseToggler(node,collapseId){
  node.setAttribute("data-bs-toggle","collapse");
  node.setAttribute("data-bs-target","#"+collapseId);
  node.click();
}

function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function switchVisibilityOn(id) {
  element = document.querySelector("#"+id);
  if(element.classList.contains('hide-component')) element.classList.remove('hide-component');
}
function switchVisibilityOff(id) {
  element = document.querySelector("#"+id);
  if(!element.classList.contains('hide-component')) element.classList.add('hide-component');
}
function copy(field) {
    // Get the text field
    var copyText = document.getElementById(field);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    notyf.success("copiado!!!");
}

