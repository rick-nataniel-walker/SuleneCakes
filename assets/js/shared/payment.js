
let mpesaForm = document.querySelector("#mpesaForm");

$(".read-more").readMore({
    previewHeight: 300,
    fadeColor1: "rgba(255,255,255,0)",
    fadeColor2: "rgba(255,255,255,1)",
  });

mpesaPay = async (route,amount) => {
    let form = new FormData();

    if(!validationAction(mpesaForm.elements['nome'],notNullable)) return;
    if(!validationAction(mpesaForm.elements['email'],validateEmail)) return;
    if(!validationAction(mpesaForm.elements['mpesa'],makeMpesaNumbers)) return;
    form.append('name',mpesaForm.elements['nome'].value);
    form.append('phone','258'+mpesaForm.elements['mpesa'].value);
    form.append('email',mpesaForm.elements['email'].value);
    form.append('amount',amount);
    form.append("payment_type", "mpesa")
    startModal("Confirme o pagamento no seu MPesa...");
    let r = await storeData(`${configs.mpesaUrl}${route}`, form, "formDatapostAjax");
    killModal();
}

function redirectAfterPayment(){
    let url=null;
    if(window.location.href==location.origin+'/pagar-guia.html') url = 'guia-download-page';
    if(window.location.href==location.origin+'/pagar-bolos-de-familia.html') url = 'bolos-de-familia-confirmacao';
    if(window.location.href==location.origin+'/bolos-de-andar.html') url = 'bolos-de-andar-confirmacao';
    return url+".html";
}