const devKey = "5|hkxnKvZ3K2rfFi6aCPHQYvNAdfLktXMNbsuNeV2c";
const prodKey = "5|KvGF92iI5L6bpLG8x5hRHy35mZGtsFBTnrmdcipR";
let mpesaForm = document.querySelector("#mpesaForm");
const headers = {"Authorization": `Bearer ${devKey}`};
const baseRoute= "http://we-cursos.pesquisamz.com/api";
const testRoute= "http://127.0.0.1:8000/api";
let payRoute="/a/v1/mpesa-payment";


$(".read-more").readMore({
    previewHeight: 300,
    fadeColor1: "rgba(255,255,255,0)",
    fadeColor2: "rgba(255,255,255,1)",
  });

mpesaPay =(route,amount)=>{
    let form = new FormData();

    if(!validationAction(mpesaForm.elements['nome'],notNullable)) return;
    if(!validationAction(mpesaForm.elements['email'],validateEmail)) return;
    if(!validationAction(mpesaForm.elements['mpesa'],makeMpesaNumbers)) return;
    form.append('name',mpesaForm.elements['nome'].value);
    form.append('phone','258'+mpesaForm.elements['mpesa'].value);
    form.append('email',mpesaForm.elements['email'].value);
    form.append('amount',amount);
    startModal("Confirme o pagamento no seu MPesa...");
    formDatapostAjax((serverData,status)=>{
        if(status=='error') {
            notyf.error("Não foi possível realizar o pagamento");
            killModal();
            return;
        }
        if(serverData.status){
            killModal();
            console.log(redirectAfterPayment())
            location.href = location.origin+"/"+redirectAfterPayment();
        }else{
            killModal();
            notyf.error(serverData.msg);
        }
    },form,testRoute+payRoute+route,headers);
}

function startModal(txt,anim = 'wanderingCubes'){
    $('body').loadingModal({
        position: 'auto',
        text: txt,
        color: '#fff',
        opacity: '0.75',
        backgroundColor: 'rgb(0,0,0)',
        animation: anim
    });
}

function queryBill(bill){
    startModal("Aguarde a confirmação","fadingCircle");
    nonPostAjax((serverData,status)=>{
        if(status=='error') {
            notyf.error("Erro ao obter a resposta");
            killModal();
            return;
        }
        if(serverData.data.hasOwnProperty('bill')){
            killModal();
            console.log(redirectAfterPayment())
            location.href = location.origin+"/"+redirectAfterPayment();
        }else{
            killModal();
            notyf.error("Código inválido");
        }
    }, 'get',testRoute+"/payments/"+bill,headers)
}

function killModal(){
    $('body').loadingModal('destroy');
}

function redirectAfterPayment(){
    let url=null;
    if(window.location.href==location.origin+'/pagar-guia.html') url = 'guia-download-page';
    if(window.location.href==location.origin+'/pagar-bolos-de-familia.html') url = 'bolos-de-familia-confirmacao';
    if(window.location.href==location.origin+'/bolos-de-andar.html') url = 'bolos-de-andar-confirmacao';
    return url+".html";
}